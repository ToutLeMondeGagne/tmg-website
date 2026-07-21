<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/audits-store.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function tmg_clean_audit_payload(array $payload): array
{
    $clip = static function (string $value, int $max): string {
        $value = trim($value);

        return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
    };

    $sections = [];

    foreach ((is_array($payload['sections'] ?? null) ? $payload['sections'] : []) as $section) {
        $title = $clip((string) ($section['title'] ?? ''), 120);

        if ($title === '') {
            continue;
        }

        $score = (int) ($section['score'] ?? 0);
        $sections[] = [
            'title' => $title,
            'score' => max(0, min(5, $score)),
            'findings' => $clip((string) ($section['findings'] ?? ''), 4000),
            'recommendations' => $clip((string) ($section['recommendations'] ?? ''), 4000),
        ];
    }

    return [
        'company' => $clip((string) ($payload['company'] ?? ''), 120),
        'contact_name' => $clip((string) ($payload['contact_name'] ?? ''), 120),
        'website' => $clip((string) ($payload['website'] ?? ''), 200),
        'consultant' => $clip((string) ($payload['consultant'] ?? ''), 120),
        'summary' => $clip((string) ($payload['summary'] ?? ''), 4000),
        'sections' => $sections,
    ];
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

if ($method === 'GET') {
    $audits = tmg_load_audits();

    usort($audits, static function (array $a, array $b): int {
        return strcmp((string) ($b['updated_at'] ?? ''), (string) ($a['updated_at'] ?? ''));
    });

    tmg_json_response(200, ['audits' => $audits]);
}

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload)) {
    tmg_json_response(422, ['message' => 'Payload invalide.']);
}

$action = (string) ($payload['action'] ?? '');
$audits = tmg_load_audits();

if ($action === 'create') {
    $clean = tmg_clean_audit_payload($payload);

    if ($clean['company'] === '') {
        tmg_json_response(422, ['message' => 'Le nom du client est requis.']);
    }

    $now = gmdate('c');
    $audit = array_merge($clean, [
        'id' => 'audit-' . bin2hex(random_bytes(5)),
        'created_at' => $now,
        'updated_at' => $now,
    ]);
    $audits[] = $audit;
    tmg_save_audits($audits);

    tmg_json_response(200, ['message' => 'Audit créé.', 'audit' => $audit, 'audits' => $audits]);
}

$id = (string) ($payload['id'] ?? '');
$auditIndex = -1;

foreach ($audits as $index => $audit) {
    if (($audit['id'] ?? '') === $id) {
        $auditIndex = $index;
        break;
    }
}

if ($auditIndex < 0) {
    tmg_json_response(404, ['message' => 'Audit introuvable.']);
}

if ($action === 'delete') {
    array_splice($audits, $auditIndex, 1);
    tmg_save_audits($audits);

    tmg_json_response(200, ['message' => 'Audit supprimé.', 'audits' => $audits]);
}

if ($action !== 'update') {
    tmg_json_response(422, ['message' => 'Action invalide.']);
}

$clean = tmg_clean_audit_payload($payload);

if ($clean['company'] === '') {
    tmg_json_response(422, ['message' => 'Le nom du client est requis.']);
}

$audits[$auditIndex] = array_merge($audits[$auditIndex], $clean, ['updated_at' => gmdate('c')]);
tmg_save_audits($audits);

tmg_json_response(200, [
    'message' => 'Audit sauvegardé.',
    'audit' => $audits[$auditIndex],
    'audits' => $audits,
]);
