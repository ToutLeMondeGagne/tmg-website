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

// ===== Actions "espace projet" : jalons, messages, fichiers =====
if (in_array($action, ['update-milestones', 'add-message', 'delete-message', 'delete-file'], true)) {
    $id = isset($payload['id']) ? (string) $payload['id'] : '';
    $accountIndex = tmg_find_partner_index_by_id($accounts, $id);

    if ($accountIndex < 0) {
        tmg_json_response(404, ['message' => 'Compte partenaire introuvable.']);
    }

    if ($action === 'update-milestones') {
        $rawMilestones = is_array($payload['milestones'] ?? null) ? $payload['milestones'] : [];
        $milestones = [];

        foreach ($rawMilestones as $milestone) {
            $title = trim((string) ($milestone['title'] ?? ''));
            $state = (string) ($milestone['state'] ?? 'todo');

            if ($title === '') {
                continue;
            }

            $milestones[] = [
                'title' => function_exists('mb_substr') ? mb_substr($title, 0, 120, 'UTF-8') : substr($title, 0, 120),
                'state' => in_array($state, ['done', 'active', 'todo'], true) ? $state : 'todo',
            ];
        }

        $accounts[$accountIndex]['milestones'] = $milestones;
    }

    if ($action === 'add-message') {
        $text = trim((string) ($payload['text'] ?? ''));

        if ($text === '') {
            tmg_json_response(422, ['message' => 'Le message est vide.']);
        }

        $messages = is_array($accounts[$accountIndex]['messages'] ?? null)
            ? $accounts[$accountIndex]['messages']
            : [];
        $messages[] = [
            'id' => 'msg-' . bin2hex(random_bytes(5)),
            'text' => function_exists('mb_substr') ? mb_substr($text, 0, 2000, 'UTF-8') : substr($text, 0, 2000),
            'created_at' => gmdate('c'),
        ];
        $accounts[$accountIndex]['messages'] = $messages;
    }

    if ($action === 'delete-message') {
        $messageId = (string) ($payload['message_id'] ?? '');
        $messages = is_array($accounts[$accountIndex]['messages'] ?? null)
            ? $accounts[$accountIndex]['messages']
            : [];
        $accounts[$accountIndex]['messages'] = array_values(array_filter(
            $messages,
            static fn (array $message): bool => ($message['id'] ?? '') !== $messageId,
        ));
    }

    if ($action === 'delete-file') {
        $fileId = (string) ($payload['file_id'] ?? '');
        $files = is_array($accounts[$accountIndex]['files'] ?? null)
            ? $accounts[$accountIndex]['files']
            : [];

        foreach ($files as $file) {
            if (($file['id'] ?? '') === $fileId) {
                $storedName = (string) ($file['stored_name'] ?? '');

                if ($storedName !== '' && basename($storedName) === $storedName) {
                    @unlink(tmg_partner_files_directory($id) . '/' . $storedName);
                }
            }
        }

        $accounts[$accountIndex]['files'] = array_values(array_filter(
            $files,
            static fn (array $file): bool => ($file['id'] ?? '') !== $fileId,
        ));
    }

    $accounts[$accountIndex]['updated_at'] = gmdate('c');
    tmg_save_partner_accounts($accounts);

    tmg_json_response(200, [
        'message' => 'Espace projet mis à jour.',
        'account' => tmg_public_partner_account($accounts[$accountIndex]),
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
