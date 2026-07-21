<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

/**
 * Anti-spam : si le champ piège caché est rempli, on répond OK sans rien faire.
 */
if (!empty($_POST['company_website'])) {
    tmg_json_response(200, ['message' => 'Merci.']);
}

$formType = isset($_POST['form_type']) ? trim((string) $_POST['form_type']) : 'contact';
$formType = $formType === 'internship' ? 'internship' : 'contact';

$name = isset($_POST['name']) ? trim((string) $_POST['name']) : '';
$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    tmg_json_response(422, ['message' => 'Un nom et un courriel valide sont requis.']);
}

/**
 * Destinataire : lu depuis le contenu éditable du site, avec repli sécurisé.
 */
$recipientDefault = 'ensemble@tmgconsultation.org';
$recipientStage = 'stage@tmgconsultation.org';

$contentFile = dirname(__DIR__) . '/content/site-content.json';

if (is_file($contentFile)) {
    $content = json_decode((string) file_get_contents($contentFile), true);

    if (is_array($content)) {
        $globalEmail = $content['global']['contactEmail'] ?? null;

        if (is_string($globalEmail) && filter_var($globalEmail, FILTER_VALIDATE_EMAIL)) {
            $recipientDefault = $globalEmail;
            $recipientStage = $globalEmail;
        }

        $stageEmail = $content['stage']['application']['contactEmail'] ?? null;

        if (is_string($stageEmail) && filter_var($stageEmail, FILTER_VALIDATE_EMAIL)) {
            $recipientStage = $stageEmail;
        }
    }
}

$recipient = $formType === 'internship' ? $recipientStage : $recipientDefault;

/**
 * Libellés des champs par type de formulaire.
 */
$fieldLabels = $formType === 'internship'
    ? [
        'name' => 'Nom complet',
        'email' => 'Courriel',
        'phone' => 'Téléphone',
        'city' => 'Ville',
        'program' => 'École / programme',
        'interest' => 'Centre d’intérêt',
        'motivation' => 'Pourquoi TMG',
        'message' => 'Message',
    ]
    : [
        'name' => 'Nom',
        'email' => 'Courriel',
        'phone' => 'Téléphone',
        'company' => 'Entreprise',
        'annualMarketingBudget' => 'Budget marketing annuel',
        'projectDescription' => 'Description du projet',
    ];

$lines = [];
$recordedFields = [];

foreach ($fieldLabels as $key => $label) {
    $value = isset($_POST[$key]) ? trim((string) $_POST[$key]) : '';

    if ($value !== '') {
        $lines[] = $label . ' : ' . $value;
        $recordedFields[$label] = $value;
    }
}

if (empty($lines)) {
    tmg_json_response(422, ['message' => 'Le formulaire est vide.']);
}

$subject = $formType === 'internship'
    ? 'Nouvelle candidature stage — ' . $name
    : 'Nouvelle demande de contact — ' . $name;

$textBody = implode("\r\n", $lines);
$textBody .= "\r\n\r\n---\r\n";
$textBody .= 'Envoyé depuis le formulaire ' . ($formType === 'internship' ? 'stagiaire' : 'contact') . ' du site TMG.';

/**
 * Pièce jointe (CV) optionnelle.
 */
$attachment = null;

if (isset($_FILES['cv']) && is_array($_FILES['cv']) && ($_FILES['cv']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $file = $_FILES['cv'];

    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        tmg_json_response(422, ['message' => 'Le téléversement du CV a échoué. Réessayez.']);
    }

    if (($file['size'] ?? 0) > 5 * 1024 * 1024) {
        tmg_json_response(422, ['message' => 'Le CV dépasse la taille maximale de 5 Mo.']);
    }

    $allowedExtensions = ['pdf', 'doc', 'docx'];
    $extension = strtolower(pathinfo((string) ($file['name'] ?? ''), PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions, true)) {
        tmg_json_response(422, ['message' => 'Format de CV non autorisé. Utilisez un PDF, DOC ou DOCX.']);
    }

    if (!is_uploaded_file((string) ($file['tmp_name'] ?? ''))) {
        tmg_json_response(422, ['message' => 'Fichier de CV invalide.']);
    }

    $fileContent = file_get_contents((string) $file['tmp_name']);

    if ($fileContent === false) {
        tmg_json_response(500, ['message' => 'Impossible de lire le CV téléversé.']);
    }

    $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', (string) ($file['name'] ?? 'cv.' . $extension));

    $attachment = [
        'filename' => $safeName !== '' ? $safeName : 'cv.' . $extension,
        'mime' => 'application/octet-stream',
        'content' => $fileContent,
    ];
}

/**
 * Enregistrement du prospect dans le mini-CRM, avant l'envoi du courriel :
 * même si l'email échoue, la demande n'est jamais perdue.
 */
require __DIR__ . '/leads-store.php';
tmg_record_lead($formType, $name, $email, $recordedFields, $attachment);

/**
 * Construction de l'email (avec pièce jointe MIME si présente).
 */
$eol = "\r\n";
// L'expéditeur utilise le domaine du site qui envoie (pas celui du destinataire),
// sinon SPF/DMARC rejettent le courriel (ex. destinataire Gmail).
$fromDomain = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$fromDomain = preg_replace('/^www\./', '', $fromDomain) ?: '';
$fromDomain = preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/', $fromDomain) ? $fromDomain : 'tmgconsultation.org';
$fromAddress = 'no-reply@' . $fromDomain;

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$headers = [];
$headers[] = 'From: =?UTF-8?B?' . base64_encode('Site TMG') . '?= <' . $fromAddress . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';

if ($attachment !== null) {
    $boundary = 'tmg-' . bin2hex(random_bytes(12));
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

    $body = '--' . $boundary . $eol;
    $body .= 'Content-Type: text/plain; charset=UTF-8' . $eol;
    $body .= 'Content-Transfer-Encoding: base64' . $eol . $eol;
    $body .= chunk_split(base64_encode($textBody)) . $eol;

    $body .= '--' . $boundary . $eol;
    $body .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['filename'] . '"' . $eol;
    $body .= 'Content-Transfer-Encoding: base64' . $eol;
    $body .= 'Content-Disposition: attachment; filename="' . $attachment['filename'] . '"' . $eol . $eol;
    $body .= chunk_split(base64_encode($attachment['content'])) . $eol;

    $body .= '--' . $boundary . '--' . $eol;
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: base64';
    $body = chunk_split(base64_encode($textBody));
}

$sent = @mail(
    $recipient,
    $encodedSubject,
    $body,
    implode($eol, $headers),
    '-f' . $fromAddress
);

if (!$sent) {
    tmg_json_response(500, [
        'message' => 'L’envoi du courriel a échoué côté serveur. Réessayez plus tard.',
    ]);
}

tmg_json_response(200, [
    'message' => 'Message envoyé.',
]);
