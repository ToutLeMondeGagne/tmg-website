<?php
declare(strict_types=1);

require __DIR__ . '/admin-session.php';
require __DIR__ . '/partner-store.php';

$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

$accountId = isset($_GET['id']) ? (string) $_GET['id'] : '';
$fileId = isset($_GET['file']) ? (string) $_GET['file'] : '';

/**
 * Autorisé : l'admin TMG, OU le partenaire connecté propriétaire du fichier.
 * Les deux sessions ont des cookies distincts : on teste d'abord la session
 * partenaire, puis la session admin.
 */
$isAuthorized = false;

tmg_start_partner_session();

if (tmg_is_partner_authenticated()) {
    $sessionPartner = $_SESSION['tmg_partner_account'] ?? null;

    if (is_array($sessionPartner) && ($sessionPartner['id'] ?? '') === $accountId && $accountId !== '') {
        $isAuthorized = true;
    }
}

if (!$isAuthorized) {
    session_write_close();
    session_id('');
    tmg_start_admin_session($config);

    if (tmg_is_admin_authenticated()) {
        $isAuthorized = true;
    }
}

if (!$isAuthorized) {
    http_response_code(401);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['message' => 'Accès non autorisé.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$accounts = tmg_load_partner_accounts();
$accountIndex = tmg_find_partner_index_by_id($accounts, $accountId);

if ($accountIndex < 0) {
    http_response_code(404);
    exit('Compte introuvable.');
}

$targetFile = null;

foreach (($accounts[$accountIndex]['files'] ?? []) as $file) {
    if (($file['id'] ?? '') === $fileId) {
        $targetFile = $file;
        break;
    }
}

$storedName = is_array($targetFile) ? (string) ($targetFile['stored_name'] ?? '') : '';

// Anti-traversée : uniquement un nom de fichier simple.
if ($storedName === '' || basename($storedName) !== $storedName) {
    http_response_code(404);
    exit('Fichier introuvable.');
}

$path = tmg_partner_files_directory($accountId) . '/' . $storedName;

if (!is_file($path)) {
    http_response_code(404);
    exit('Fichier introuvable.');
}

$extension = strtolower(pathinfo($storedName, PATHINFO_EXTENSION));
$mimeTypes = [
    'pdf' => 'application/pdf',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls' => 'application/vnd.ms-excel',
    'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt' => 'application/vnd.ms-powerpoint',
    'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'webp' => 'image/webp',
    'svg' => 'image/svg+xml',
    'zip' => 'application/zip',
    'txt' => 'text/plain',
    'csv' => 'text/csv',
];
$mime = $mimeTypes[$extension] ?? 'application/octet-stream';
$downloadName = (string) ($targetFile['filename'] ?? $storedName);
$downloadName = str_replace(['"', "\r", "\n"], '', $downloadName);

header('Content-Type: ' . $mime);
header('Content-Length: ' . (string) filesize($path));
header('Content-Disposition: attachment; filename="' . $downloadName . '"');
header('Cache-Control: no-store');

readfile($path);
