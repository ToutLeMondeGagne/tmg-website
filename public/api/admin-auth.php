<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

tmg_start_admin_session($config);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    tmg_json_response(200, [
        'authenticated' => tmg_is_admin_authenticated(),
        'username' => $_SESSION['tmg_admin_username'] ?? null,
    ]);
}

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload)) {
    tmg_json_response(422, ['message' => 'Payload invalide.']);
}

$action = isset($payload['action']) ? (string) $payload['action'] : '';

if ($action === 'logout') {
    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $cookieParams = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $cookieParams['path'],
            $cookieParams['domain'],
            (bool) $cookieParams['secure'],
            (bool) $cookieParams['httponly']
        );
    }

    session_destroy();
    tmg_json_response(200, ['message' => 'Déconnexion effectuée.']);
}

if ($action !== 'login') {
    tmg_json_response(422, ['message' => 'Action admin invalide.']);
}

$configuredUsername = tmg_admin_username($config);
$configuredPasswordHash = tmg_admin_password_hash($config);

if ($configuredUsername === '' || $configuredPasswordHash === '') {
    tmg_json_response(500, ['message' => 'Compte admin non configuré sur le serveur.']);
}

$username = isset($payload['username']) ? trim((string) $payload['username']) : '';
$password = isset($payload['password']) ? (string) $payload['password'] : '';

if (
    !hash_equals($configuredUsername, $username)
    || !password_verify($password, $configuredPasswordHash)
) {
    tmg_json_response(401, ['message' => 'Identifiant ou mot de passe invalide.']);
}

session_regenerate_id(true);

$_SESSION['tmg_admin_authenticated'] = true;
$_SESSION['tmg_admin_username'] = $configuredUsername;

tmg_json_response(200, [
    'message' => 'Connexion réussie.',
    'authenticated' => true,
    'username' => $configuredUsername,
]);
