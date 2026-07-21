<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/leads-store.php';

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
    $leads = tmg_load_leads();

    // Les plus récents d'abord.
    usort($leads, static function (array $a, array $b): int {
        return strcmp((string) ($b['created_at'] ?? ''), (string) ($a['created_at'] ?? ''));
    });

    tmg_json_response(200, ['leads' => $leads]);
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
$id = isset($payload['id']) ? (string) $payload['id'] : '';
$leads = tmg_load_leads();
$leadIndex = tmg_find_lead_index_by_id($leads, $id);

if ($leadIndex < 0) {
    tmg_json_response(404, ['message' => 'Prospect introuvable.']);
}

if ($action === 'delete') {
    array_splice($leads, $leadIndex, 1);

    if (!tmg_save_leads($leads)) {
        tmg_json_response(500, ['message' => 'Impossible de sauvegarder les prospects.']);
    }

    tmg_json_response(200, ['message' => 'Prospect supprimé.', 'leads' => $leads]);
}

if ($action !== 'update') {
    tmg_json_response(422, ['message' => 'Action invalide.']);
}

if (isset($payload['status'])) {
    $status = (string) $payload['status'];

    if (!in_array($status, TMG_LEAD_STATUSES, true)) {
        tmg_json_response(422, ['message' => 'Statut invalide.']);
    }

    $leads[$leadIndex]['status'] = $status;
}

if (isset($payload['notes'])) {
    $notes = (string) $payload['notes'];

    if (function_exists('mb_substr')) {
        $notes = mb_substr($notes, 0, 4000, 'UTF-8');
    } else {
        $notes = substr($notes, 0, 4000);
    }

    $leads[$leadIndex]['notes'] = $notes;
}

$leads[$leadIndex]['updated_at'] = gmdate('c');

if (!tmg_save_leads($leads)) {
    tmg_json_response(500, ['message' => 'Impossible de sauvegarder les prospects.']);
}

tmg_json_response(200, ['message' => 'Prospect mis à jour.', 'lead' => $leads[$leadIndex]]);
