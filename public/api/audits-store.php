<?php
declare(strict_types=1);

require_once __DIR__ . '/admin-session.php';

function tmg_audits_file(): string
{
    return dirname(__DIR__, 2) . '/private-data/audits.json';
}

function tmg_load_audits(): array
{
    $file = tmg_audits_file();

    if (!is_file($file)) {
        return [];
    }

    $raw = file_get_contents($file);

    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $audits = json_decode($raw, true);

    return is_array($audits) ? array_values($audits) : [];
}

function tmg_save_audits(array $audits): void
{
    $directory = dirname(tmg_audits_file());

    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        tmg_json_response(500, ['message' => 'Impossible de créer le dossier des audits.']);
    }

    $encoded = json_encode(
        array_values($audits),
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($encoded === false || file_put_contents(tmg_audits_file(), $encoded . PHP_EOL, LOCK_EX) === false) {
        tmg_json_response(500, ['message' => 'Impossible de sauvegarder les audits.']);
    }
}

function tmg_find_audit_index(array $audits, string $id): int
{
    foreach ($audits as $index => $audit) {
        if (($audit['id'] ?? '') === $id) {
            return $index;
        }
    }

    return -1;
}
