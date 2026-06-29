<?php
declare(strict_types=1);

function tmg_json_response(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function tmg_load_admin_config(string $configFile): array
{
    if (!is_file($configFile)) {
        return [];
    }

    $config = require $configFile;

    return is_array($config) ? $config : [];
}

function tmg_start_admin_session(array $config = []): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $sessionName = isset($config['session_name']) && is_string($config['session_name'])
        ? $config['session_name']
        : 'TMG_ADMIN_SESSION';

    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

    session_name($sessionName);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function tmg_admin_username(array $config): string
{
    $username = getenv('TMG_ADMIN_USERNAME') ?: '';

    if (isset($config['username'])) {
        $username = (string) $config['username'];
    }

    return trim($username);
}

function tmg_admin_password_hash(array $config): string
{
    $passwordHash = getenv('TMG_ADMIN_PASSWORD_HASH') ?: '';

    if (isset($config['password_hash'])) {
        $passwordHash = (string) $config['password_hash'];
    }

    return trim($passwordHash);
}

function tmg_is_admin_authenticated(): bool
{
    return isset($_SESSION['tmg_admin_authenticated'])
        && $_SESSION['tmg_admin_authenticated'] === true;
}

function tmg_require_admin_auth(): void
{
    if (!tmg_is_admin_authenticated()) {
        tmg_json_response(401, ['message' => 'Connexion admin requise.']);
    }
}
