<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/partner-store.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

if ($method === 'GET') {
    $accounts = array_map('tmg_public_partner_account', tmg_load_partner_accounts());

    tmg_json_response(200, ['accounts' => $accounts]);
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
$accounts = tmg_load_partner_accounts();

if ($action === 'delete') {
    $id = isset($payload['id']) ? (string) $payload['id'] : '';
    $accountIndex = tmg_find_partner_index_by_id($accounts, $id);

    if ($accountIndex < 0) {
        tmg_json_response(404, ['message' => 'Compte partenaire introuvable.']);
    }

    array_splice($accounts, $accountIndex, 1);
    tmg_save_partner_accounts($accounts);

    tmg_json_response(200, [
        'message' => 'Compte partenaire supprimé.',
        'accounts' => array_map('tmg_public_partner_account', $accounts),
    ]);
}

if ($action !== 'create') {
    tmg_json_response(422, ['message' => 'Action partenaire invalide.']);
}

$company = isset($payload['company']) ? trim((string) $payload['company']) : '';
$password = isset($payload['password']) ? (string) $payload['password'] : '';

if ($company === '' || $password === '') {
    tmg_json_response(422, ['message' => 'Le nom de l’entreprise et le mot de passe sont requis.']);
}

$passwordLength = function_exists('mb_strlen') ? mb_strlen($password, 'UTF-8') : strlen($password);

if ($passwordLength < 10) {
    tmg_json_response(422, ['message' => 'Le mot de passe doit contenir au moins 10 caractères.']);
}

if (tmg_find_partner_by_company($accounts, $company) !== null) {
    tmg_json_response(409, ['message' => 'Un compte existe déjà pour cette entreprise.']);
}

$now = gmdate('c');
$account = [
    'id' => tmg_create_partner_id($company),
    'company' => $company,
    'contact_name' => trim((string) ($payload['contact_name'] ?? '')),
    'email' => trim((string) ($payload['email'] ?? '')),
    'project_name' => trim((string) ($payload['project_name'] ?? '')),
    'project_status' => trim((string) ($payload['project_status'] ?? '')),
    'portal_message' => trim((string) ($payload['portal_message'] ?? '')),
    'is_active' => true,
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    'created_at' => $now,
    'updated_at' => $now,
    'last_login_at' => '',
];

$accounts[] = $account;
tmg_save_partner_accounts($accounts);

tmg_json_response(200, [
    'message' => 'Compte partenaire créé.',
    'account' => tmg_public_partner_account($account),
    'accounts' => array_map('tmg_public_partner_account', $accounts),
]);
