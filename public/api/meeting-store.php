<?php
declare(strict_types=1);

require_once __DIR__ . '/partner-store.php';

function tmg_meeting_store_file(): string
{
    return tmg_partner_private_directory() . '/meeting-slots.json';
}

function tmg_create_meeting_id(): string
{
    return 'meeting-' . bin2hex(random_bytes(6));
}

function tmg_load_meeting_slots(): array
{
    $file = tmg_meeting_store_file();

    if (!is_file($file)) {
        return [];
    }

    $rawContent = file_get_contents($file);

    if ($rawContent === false || trim($rawContent) === '') {
        return [];
    }

    $slots = json_decode($rawContent, true);

    return is_array($slots) ? array_values($slots) : [];
}

function tmg_save_meeting_slots(array $slots): void
{
    $directory = tmg_partner_private_directory();

    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        tmg_json_response(500, ['message' => 'Impossible de créer le dossier privé des rencontres.']);
    }

    $encodedSlots = json_encode(
        array_values($slots),
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($encodedSlots === false) {
        tmg_json_response(422, ['message' => 'Impossible d’encoder les créneaux.']);
    }

    $saved = file_put_contents(tmg_meeting_store_file(), $encodedSlots . PHP_EOL, LOCK_EX);

    if ($saved === false) {
        tmg_json_response(500, ['message' => 'Impossible d’écrire le fichier des rencontres.']);
    }
}

function tmg_find_meeting_slot_index_by_id(array $slots, string $id): int
{
    foreach ($slots as $index => $slot) {
        if (($slot['id'] ?? '') === $id) {
            return $index;
        }
    }

    return -1;
}

function tmg_public_meeting_slot(array $slot, bool $includeBooking = false): array
{
    $publicSlot = [
        'id' => $slot['id'] ?? '',
        'date' => $slot['date'] ?? '',
        'start_time' => $slot['start_time'] ?? '',
        'duration_minutes' => (int) ($slot['duration_minutes'] ?? 30),
        'timezone' => $slot['timezone'] ?? 'America/Toronto',
        'title' => $slot['title'] ?? 'Rencontre TMG',
        'location' => $slot['location'] ?? '',
        'note' => $slot['note'] ?? '',
        'is_active' => ($slot['is_active'] ?? true) === true,
        'is_booked' => !empty($slot['booked_by_partner_id']),
        'created_at' => $slot['created_at'] ?? '',
        'updated_at' => $slot['updated_at'] ?? '',
        'booked_at' => $slot['booked_at'] ?? '',
    ];

    if ($includeBooking) {
        $publicSlot['booked_by_partner_id'] = $slot['booked_by_partner_id'] ?? '';
        $publicSlot['booked_by_company'] = $slot['booked_by_company'] ?? '';
        $publicSlot['booked_by_email'] = $slot['booked_by_email'] ?? '';
    }

    return $publicSlot;
}

function tmg_meeting_slot_start(array $slot): ?DateTimeImmutable
{
    $date = trim((string) ($slot['date'] ?? ''));
    $time = trim((string) ($slot['start_time'] ?? ''));
    $timezone = trim((string) ($slot['timezone'] ?? 'America/Toronto'));

    if ($date === '' || $time === '') {
        return null;
    }

    try {
        return new DateTimeImmutable($date . ' ' . $time, new DateTimeZone($timezone));
    } catch (Throwable) {
        return null;
    }
}

function tmg_is_future_meeting_slot(array $slot): bool
{
    $slotStart = tmg_meeting_slot_start($slot);

    if ($slotStart === null) {
        return false;
    }

    $now = new DateTimeImmutable('now', $slotStart->getTimezone());

    return $slotStart > $now;
}

function tmg_is_meeting_slot_available(array $slot): bool
{
    return ($slot['is_active'] ?? true) === true
        && empty($slot['booked_by_partner_id'])
        && tmg_is_future_meeting_slot($slot);
}

function tmg_sort_meeting_slots(array $slots): array
{
    usort($slots, static function (array $first, array $second): int {
        $firstStart = tmg_meeting_slot_start($first);
        $secondStart = tmg_meeting_slot_start($second);

        if ($firstStart === null && $secondStart === null) {
            return 0;
        }

        if ($firstStart === null) {
            return 1;
        }

        if ($secondStart === null) {
            return -1;
        }

        return $firstStart <=> $secondStart;
    });

    return $slots;
}

function tmg_validate_meeting_slot_payload(array $payload): array
{
    $date = trim((string) ($payload['date'] ?? ''));
    $startTime = trim((string) ($payload['start_time'] ?? ''));
    $duration = (int) ($payload['duration_minutes'] ?? 30);
    $timezone = trim((string) ($payload['timezone'] ?? 'America/Toronto'));

    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        tmg_json_response(422, ['message' => 'Date de rencontre invalide.']);
    }

    if (!preg_match('/^\d{2}:\d{2}$/', $startTime)) {
        tmg_json_response(422, ['message' => 'Heure de rencontre invalide.']);
    }

    if ($duration < 15 || $duration > 240) {
        tmg_json_response(422, ['message' => 'La durée doit être entre 15 et 240 minutes.']);
    }

    try {
        new DateTimeZone($timezone);
    } catch (Throwable) {
        tmg_json_response(422, ['message' => 'Fuseau horaire invalide.']);
    }

    return [
        'date' => $date,
        'start_time' => $startTime,
        'duration_minutes' => $duration,
        'timezone' => $timezone,
        'title' => trim((string) ($payload['title'] ?? 'Rencontre TMG')),
        'location' => trim((string) ($payload['location'] ?? '')),
        'note' => trim((string) ($payload['note'] ?? '')),
    ];
}
