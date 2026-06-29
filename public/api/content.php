<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$contentFile = dirname(__DIR__) . '/content/site-content.json';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    if (!is_file($contentFile)) {
        tmg_json_response(404, ['message' => 'Fichier de contenu introuvable.']);
    }

    readfile($contentFile);
    exit;
}

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload) || !isset($payload['content']) || !is_array($payload['content'])) {
    tmg_json_response(422, ['message' => 'Payload de contenu invalide.']);
}

$encodedContent = json_encode(
    $payload['content'],
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);

if ($encodedContent === false) {
    tmg_json_response(422, ['message' => 'Impossible d’encoder le contenu JSON.']);
}

$contentDirectory = dirname($contentFile);

if (!is_dir($contentDirectory) && !mkdir($contentDirectory, 0755, true)) {
    tmg_json_response(500, ['message' => 'Impossible de créer le dossier de contenu.']);
}

$saved = file_put_contents($contentFile, $encodedContent . PHP_EOL, LOCK_EX);

if ($saved === false) {
    tmg_json_response(500, ['message' => 'Impossible d’écrire le fichier de contenu.']);
}

tmg_json_response(200, ['message' => 'Contenu sauvegardé.']);
