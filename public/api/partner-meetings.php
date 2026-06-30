<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/meeting-store.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

tmg_start_partner_session();

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (!tmg_is_partner_authenticated()) {
    tmg_json_response(401, ['message' => 'Connexion partenaire requise.']);
}

$partner = $_SESSION['tmg_partner_account'] ?? [];
$partnerId = (string) ($partner['id'] ?? '');
$partnerCompany = (string) ($partner['company'] ?? '');
$partnerEmail = (string) ($partner['email'] ?? '');

function tmg_partner_meeting_payload(array $slots, string $partnerId): array
{
    $availableSlots = [];
    $bookedSlots = [];

    foreach (tmg_sort_meeting_slots($slots) as $slot) {
        if (tmg_is_meeting_slot_available($slot)) {
            $availableSlots[] = tmg_public_meeting_slot($slot);
        }

        if (($slot['booked_by_partner_id'] ?? '') === $partnerId) {
            $bookedSlots[] = tmg_public_meeting_slot($slot);
        }
    }

    return [
        'available_slots' => $availableSlots,
        'booked_slots' => $bookedSlots,
    ];
}

if ($method === 'GET') {
    tmg_json_response(200, tmg_partner_meeting_payload(tmg_load_meeting_slots(), $partnerId));
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
$slots = tmg_load_meeting_slots();
$slotIndex = tmg_find_meeting_slot_index_by_id($slots, $id);

if ($slotIndex < 0) {
    tmg_json_response(404, ['message' => 'Créneau introuvable.']);
}

if ($action === 'book') {
    if (!tmg_is_meeting_slot_available($slots[$slotIndex])) {
        tmg_json_response(409, ['message' => 'Ce créneau n’est plus disponible.']);
    }

    $slots[$slotIndex]['booked_by_partner_id'] = $partnerId;
    $slots[$slotIndex]['booked_by_company'] = $partnerCompany;
    $slots[$slotIndex]['booked_by_email'] = $partnerEmail;
    $slots[$slotIndex]['booked_at'] = gmdate('c');
    $slots[$slotIndex]['updated_at'] = gmdate('c');

    tmg_save_meeting_slots($slots);

    tmg_json_response(200, array_merge(
        ['message' => 'Rencontre réservée.'],
        tmg_partner_meeting_payload($slots, $partnerId)
    ));
}

if ($action === 'cancel') {
    if (($slots[$slotIndex]['booked_by_partner_id'] ?? '') !== $partnerId) {
        tmg_json_response(403, ['message' => 'Vous ne pouvez annuler que vos propres réservations.']);
    }

    $slots[$slotIndex]['booked_by_partner_id'] = '';
    $slots[$slotIndex]['booked_by_company'] = '';
    $slots[$slotIndex]['booked_by_email'] = '';
    $slots[$slotIndex]['booked_at'] = '';
    $slots[$slotIndex]['updated_at'] = gmdate('c');

    tmg_save_meeting_slots($slots);

    tmg_json_response(200, array_merge(
        ['message' => 'Réservation annulée.'],
        tmg_partner_meeting_payload($slots, $partnerId)
    ));
}

tmg_json_response(422, ['message' => 'Action de réservation invalide.']);
