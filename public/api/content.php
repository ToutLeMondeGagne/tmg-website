<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$contentFile = dirname(__DIR__) . '/content/site-content.json';
$configFile = __DIR__ . '/admin-config.php';

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function get_admin_token(string $configFile): string
{
    $token = getenv('TMG_ADMIN_TOKEN') ?: '';

    if (is_file($configFile)) {
        $config = require $configFile;

        if (is_array($config) && isset($config['token'])) {
            $token = (string) $config['token'];
        }
    }

    return $token;
}

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    if (!is_file($contentFile)) {
        respond(404, ['message' => 'Fichier de contenu introuvable.']);
    }

    readfile($contentFile);
    exit;
}

if ($method !== 'POST') {
    respond(405, ['message' => 'Méthode non autorisée.']);
}

$adminToken = get_admin_token($configFile);

if ($adminToken === '') {
    respond(500, ['message' => 'Token admin non configuré sur le serveur.']);
}

$requestToken = $_SERVER['HTTP_X_TMG_ADMIN_TOKEN'] ?? '';

if (!hash_equals($adminToken, $requestToken)) {
    respond(401, ['message' => 'Token admin invalide.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload) || !isset($payload['content']) || !is_array($payload['content'])) {
    respond(422, ['message' => 'Payload de contenu invalide.']);
}

$encodedContent = json_encode(
    $payload['content'],
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);

if ($encodedContent === false) {
    respond(422, ['message' => 'Impossible d’encoder le contenu JSON.']);
}

$contentDirectory = dirname($contentFile);

if (!is_dir($contentDirectory) && !mkdir($contentDirectory, 0755, true)) {
    respond(500, ['message' => 'Impossible de créer le dossier de contenu.']);
}

$saved = file_put_contents($contentFile, $encodedContent . PHP_EOL, LOCK_EX);

if ($saved === false) {
    respond(500, ['message' => 'Impossible d’écrire le fichier de contenu.']);
}

respond(200, ['message' => 'Contenu sauvegardé.']);
