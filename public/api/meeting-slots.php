<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/meeting-store.php';

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
    $slots = array_map(
        static fn (array $slot): array => tmg_public_meeting_slot($slot, true),
        tmg_sort_meeting_slots(tmg_load_meeting_slots())
    );

    tmg_json_response(200, ['slots' => $slots]);
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
$slots = tmg_load_meeting_slots();

if ($action === 'create') {
    $slotPayload = tmg_validate_meeting_slot_payload($payload);
    $now = gmdate('c');
    $slot = array_merge(
        [
            'id' => tmg_create_meeting_id(),
        ],
        $slotPayload,
        [
            'is_active' => true,
            'created_at' => $now,
            'updated_at' => $now,
            'booked_by_partner_id' => '',
            'booked_by_company' => '',
            'booked_by_email' => '',
            'booked_at' => '',
        ]
    );

    $slots[] = $slot;
    $slots = tmg_sort_meeting_slots($slots);
    tmg_save_meeting_slots($slots);

    tmg_json_response(200, [
        'message' => 'Disponibilité ajoutée.',
        'slot' => tmg_public_meeting_slot($slot, true),
        'slots' => array_map(
            static fn (array $currentSlot): array => tmg_public_meeting_slot($currentSlot, true),
            $slots
        ),
    ]);
}

$id = isset($payload['id']) ? (string) $payload['id'] : '';
$slotIndex = tmg_find_meeting_slot_index_by_id($slots, $id);

if ($slotIndex < 0) {
    tmg_json_response(404, ['message' => 'Créneau introuvable.']);
}

if ($action === 'delete') {
    array_splice($slots, $slotIndex, 1);
    tmg_save_meeting_slots($slots);

    tmg_json_response(200, [
        'message' => 'Disponibilité supprimée.',
        'slots' => array_map(
            static fn (array $slot): array => tmg_public_meeting_slot($slot, true),
            tmg_sort_meeting_slots($slots)
        ),
    ]);
}

if ($action === 'release') {
    $slots[$slotIndex]['booked_by_partner_id'] = '';
    $slots[$slotIndex]['booked_by_company'] = '';
    $slots[$slotIndex]['booked_by_email'] = '';
    $slots[$slotIndex]['booked_at'] = '';
    $slots[$slotIndex]['updated_at'] = gmdate('c');

    tmg_save_meeting_slots($slots);

    tmg_json_response(200, [
        'message' => 'Réservation libérée.',
        'slots' => array_map(
            static fn (array $slot): array => tmg_public_meeting_slot($slot, true),
            tmg_sort_meeting_slots($slots)
        ),
    ]);
}

tmg_json_response(422, ['message' => 'Action de rencontre invalide.']);
