<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/partner-store.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

$accountId = isset($_POST['id']) ? (string) $_POST['id'] : '';
$accounts = tmg_load_partner_accounts();
$accountIndex = tmg_find_partner_index_by_id($accounts, $accountId);

if ($accountIndex < 0) {
    tmg_json_response(404, ['message' => 'Compte partenaire introuvable.']);
}

if (!isset($_FILES['file']) || ($_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    tmg_json_response(422, ['message' => 'Aucun fichier reçu ou téléversement en erreur.']);
}

$file = $_FILES['file'];

if (($file['size'] ?? 0) > 25 * 1024 * 1024) {
    tmg_json_response(422, ['message' => 'Le fichier dépasse la taille maximale de 25 Mo.']);
}

$allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'zip', 'txt', 'csv'];
$originalName = (string) ($file['name'] ?? 'document');
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

if (!in_array($extension, $allowedExtensions, true)) {
    tmg_json_response(422, ['message' => 'Type de fichier non autorisé.']);
}

if (!is_uploaded_file((string) ($file['tmp_name'] ?? ''))) {
    tmg_json_response(422, ['message' => 'Fichier invalide.']);
}

$directory = tmg_partner_files_directory($accountId);

if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
    tmg_json_response(500, ['message' => 'Impossible de créer le dossier de fichiers.']);
}

$fileId = 'file-' . bin2hex(random_bytes(5));
$safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', $originalName);
$safeName = $safeName !== '' ? $safeName : ('document.' . $extension);
$storedName = $fileId . '-' . $safeName;

if (!move_uploaded_file((string) $file['tmp_name'], $directory . '/' . $storedName)) {
    tmg_json_response(500, ['message' => 'Impossible d’enregistrer le fichier.']);
}

$files = is_array($accounts[$accountIndex]['files'] ?? null) ? $accounts[$accountIndex]['files'] : [];
$files[] = [
    'id' => $fileId,
    'filename' => $originalName,
    'stored_name' => $storedName,
    'size' => (int) ($file['size'] ?? 0),
    'uploaded_at' => gmdate('c'),
];
$accounts[$accountIndex]['files'] = $files;
$accounts[$accountIndex]['updated_at'] = gmdate('c');
tmg_save_partner_accounts($accounts);

tmg_json_response(200, [
    'message' => 'Fichier ajouté à l’espace client.',
    'account' => tmg_public_partner_account($accounts[$accountIndex]),
    'accounts' => array_map('tmg_public_partner_account', $accounts),
]);
