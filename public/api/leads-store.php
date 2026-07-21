<?php
declare(strict_types=1);

require_once __DIR__ . '/admin-session.php';

// Statuts prospects (formulaire contact) + statuts candidatures (formulaire stage).
const TMG_LEAD_STATUSES = [
    'nouveau', 'contacte', 'rencontre', 'client', 'perdu',
    'recue', 'entrevue', 'acceptee', 'refusee',
];

function tmg_leads_private_directory(): string
{
    // Hors de la racine web : jamais accessible par URL (voir partner-store.php).
    return dirname(__DIR__, 2) . '/private-data';
}

function tmg_leads_store_file(): string
{
    return tmg_leads_private_directory() . '/leads.json';
}

function tmg_load_leads(): array
{
    $file = tmg_leads_store_file();

    if (!is_file($file)) {
        return [];
    }

    $rawContent = file_get_contents($file);

    if ($rawContent === false || trim($rawContent) === '') {
        return [];
    }

    $leads = json_decode($rawContent, true);

    return is_array($leads) ? array_values($leads) : [];
}

function tmg_save_leads(array $leads): bool
{
    $directory = tmg_leads_private_directory();

    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        return false;
    }

    $encodedLeads = json_encode(
        array_values($leads),
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($encodedLeads === false) {
        return false;
    }

    return file_put_contents(tmg_leads_store_file(), $encodedLeads . PHP_EOL, LOCK_EX) !== false;
}

function tmg_leads_cv_directory(): string
{
    return tmg_leads_private_directory() . '/cv';
}

/**
 * Enregistre une soumission de formulaire comme prospect ou candidature,
 * avec sauvegarde du CV sur le serveur le cas échéant.
 * Best-effort : un échec d'écriture ne doit jamais bloquer l'envoi du courriel.
 */
function tmg_record_lead(string $formType, string $name, string $email, array $fields, ?array $attachment = null): void
{
    $now = gmdate('c');
    $id = 'lead-' . bin2hex(random_bytes(6));
    $cvFile = '';

    if ($attachment !== null && isset($attachment['content'])) {
        $cvDirectory = tmg_leads_cv_directory();

        if (is_dir($cvDirectory) || @mkdir($cvDirectory, 0755, true)) {
            $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', (string) ($attachment['filename'] ?? 'cv.pdf'));
            $cvFile = $id . '-' . ($safeName !== '' ? $safeName : 'cv.pdf');

            if (@file_put_contents($cvDirectory . '/' . $cvFile, $attachment['content'], LOCK_EX) === false) {
                $cvFile = '';
            }
        }
    }

    $leads = tmg_load_leads();
    $leads[] = [
        'id' => $id,
        'form_type' => $formType,
        'name' => $name,
        'email' => $email,
        'fields' => $fields,
        'has_cv' => $cvFile !== '',
        'cv_file' => $cvFile,
        'status' => $formType === 'internship' ? 'recue' : 'nouveau',
        'notes' => '',
        'created_at' => $now,
        'updated_at' => $now,
    ];

    @tmg_save_leads($leads);
}

function tmg_find_lead_index_by_id(array $leads, string $id): int
{
    foreach ($leads as $index => $lead) {
        if (($lead['id'] ?? '') === $id) {
            return $index;
        }
    }

    return -1;
}
