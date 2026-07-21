<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/partner-store.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

tmg_start_partner_session();

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method === 'GET') {
    $partner = $_SESSION['tmg_partner_account'] ?? null;

    // Recharge le compte depuis le stockage : le client voit toujours les
    // jalons, messages et fichiers à jour, pas l'instantané de sa connexion.
    if (tmg_is_partner_authenticated() && is_array($partner) && ($partner['id'] ?? '') !== '') {
        $accounts = tmg_load_partner_accounts();
        $accountIndex = tmg_find_partner_index_by_id($accounts, (string) $partner['id']);

        if ($accountIndex >= 0) {
            $partner = tmg_public_partner_account($accounts[$accountIndex]);
            $_SESSION['tmg_partner_account'] = $partner;
        }
    }

    tmg_json_response(200, [
        'authenticated' => tmg_is_partner_authenticated(),
        'partner' => $partner,
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
    tmg_json_response(422, ['message' => 'Action partenaire invalide.']);
}

$company = isset($payload['company']) ? trim((string) $payload['company']) : '';
$password = isset($payload['password']) ? (string) $payload['password'] : '';

if ($company === '' || $password === '') {
    tmg_json_response(422, ['message' => 'Entrez le nom de l’entreprise et le mot de passe.']);
}

$accounts = tmg_load_partner_accounts();
$account = tmg_find_partner_by_company($accounts, $company);

if (
    $account === null
    || ($account['is_active'] ?? true) !== true
    || !password_verify($password, (string) ($account['password_hash'] ?? ''))
) {
    tmg_json_response(401, ['message' => 'Nom d’entreprise ou mot de passe invalide.']);
}

session_regenerate_id(true);

$accountIndex = tmg_find_partner_index_by_id($accounts, (string) ($account['id'] ?? ''));
$now = gmdate('c');

if ($accountIndex >= 0) {
    $accounts[$accountIndex]['last_login_at'] = $now;
    tmg_save_partner_accounts($accounts);
    $account = $accounts[$accountIndex];
}

$_SESSION['tmg_partner_authenticated'] = true;
$_SESSION['tmg_partner_account'] = tmg_public_partner_account($account);

tmg_json_response(200, [
    'message' => 'Connexion réussie.',
    'authenticated' => true,
    'partner' => $_SESSION['tmg_partner_account'],
]);
