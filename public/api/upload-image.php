<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

if (!isset($_FILES['file']) || ($_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    tmg_json_response(422, ['message' => 'Aucun fichier reçu ou téléversement en erreur.']);
}

$file = $_FILES['file'];

if (($file['size'] ?? 0) > 15 * 1024 * 1024) {
    tmg_json_response(422, ['message' => 'Le fichier dépasse la taille maximale de 15 Mo.']);
}

$allowedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];
$originalName = (string) ($file['name'] ?? 'image');
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

if (!in_array($extension, $allowedExtensions, true)) {
    tmg_json_response(422, ['message' => 'Type de fichier non autorisé.']);
}

if (!is_uploaded_file((string) ($file['tmp_name'] ?? ''))) {
    tmg_json_response(422, ['message' => 'Fichier invalide.']);
}

$folderParam = isset($_POST['folder']) ? (string) $_POST['folder'] : 'misc';
$folder = preg_replace('/[^a-z0-9-]/', '', strtolower($folderParam));
$folder = $folder !== '' ? $folder : 'misc';

$directory = dirname(__DIR__) . '/uploads/' . $folder;

if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
    tmg_json_response(500, ['message' => 'Impossible de créer le dossier de téléversement.']);
}

$storedName = 'img-' . bin2hex(random_bytes(6)) . '.' . $extension;

if (!move_uploaded_file((string) $file['tmp_name'], $directory . '/' . $storedName)) {
    tmg_json_response(500, ['message' => 'Impossible d’enregistrer le fichier.']);
}

tmg_json_response(200, [
    'message' => 'Image téléversée.',
    'url' => '/uploads/' . $folder . '/' . $storedName,
]);
