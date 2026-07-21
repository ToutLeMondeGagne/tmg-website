<?php
declare(strict_types=1);

require_once __DIR__ . '/admin-session.php';

function tmg_partner_private_directory(): string
{
    // Hors de la racine web (public_html) : les fichiers ne sont jamais
    // accessibles par URL. Sur SiteGround, nginx sert les fichiers statiques
    // sans consulter .htaccess, donc un dossier dans le webroot ne suffit pas.
    return dirname(__DIR__, 2) . '/private-data';
}

function tmg_partner_store_file(): string
{
    return tmg_partner_private_directory() . '/partners.json';
}

function tmg_start_partner_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

    session_name('TMG_PARTNER_SESSION');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function tmg_normalize_company(string $company): string
{
    $company = trim($company);
    $company = preg_replace('/\s+/', ' ', $company) ?: '';

    if (function_exists('mb_strtolower')) {
        return mb_strtolower($company, 'UTF-8');
    }

    return strtolower($company);
}

function tmg_create_partner_id(string $company): string
{
    $asciiCompany = function_exists('iconv')
        ? (iconv('UTF-8', 'ASCII//TRANSLIT', $company) ?: $company)
        : $company;
    $base = preg_replace('/[^a-z0-9]+/', '-', strtolower($asciiCompany));
    $base = trim((string) $base, '-');

    if ($base === '') {
        $base = 'partenaire';
    }

    return $base . '-' . bin2hex(random_bytes(4));
}

function tmg_load_partner_accounts(): array
{
    $file = tmg_partner_store_file();

    if (!is_file($file)) {
        return [];
    }

    $rawContent = file_get_contents($file);

    if ($rawContent === false || trim($rawContent) === '') {
        return [];
    }

    $accounts = json_decode($rawContent, true);

    return is_array($accounts) ? array_values($accounts) : [];
}

function tmg_save_partner_accounts(array $accounts): void
{
    $directory = tmg_partner_private_directory();

    if (!is_dir($directory) && !mkdir($directory, 0755, true)) {
        tmg_json_response(500, ['message' => 'Impossible de créer le dossier privé partenaires.']);
    }

    $encodedAccounts = json_encode(
        array_values($accounts),
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($encodedAccounts === false) {
        tmg_json_response(422, ['message' => 'Impossible d’encoder les partenaires.']);
    }

    $saved = file_put_contents(tmg_partner_store_file(), $encodedAccounts . PHP_EOL, LOCK_EX);

    if ($saved === false) {
        tmg_json_response(500, ['message' => 'Impossible d’écrire le fichier partenaires.']);
    }
}

function tmg_partner_files_directory(string $accountId): string
{
    return tmg_partner_private_directory() . '/partner-files/' . $accountId;
}

function tmg_public_partner_account(array $account): array
{
    return [
        'id' => $account['id'] ?? '',
        'company' => $account['company'] ?? '',
        'contact_name' => $account['contact_name'] ?? '',
        'email' => $account['email'] ?? '',
        'project_name' => $account['project_name'] ?? '',
        'project_status' => $account['project_status'] ?? '',
        'portal_message' => $account['portal_message'] ?? '',
        'milestones' => is_array($account['milestones'] ?? null) ? array_values($account['milestones']) : [],
        'messages' => is_array($account['messages'] ?? null) ? array_values($account['messages']) : [],
        'files' => is_array($account['files'] ?? null) ? array_values($account['files']) : [],
        'is_active' => ($account['is_active'] ?? true) === true,
        'created_at' => $account['created_at'] ?? '',
        'updated_at' => $account['updated_at'] ?? '',
        'last_login_at' => $account['last_login_at'] ?? '',
    ];
}

function tmg_find_partner_by_company(array $accounts, string $company): ?array
{
    $normalizedCompany = tmg_normalize_company($company);

    foreach ($accounts as $account) {
        if (tmg_normalize_company((string) ($account['company'] ?? '')) === $normalizedCompany) {
            return $account;
        }
    }

    return null;
}

function tmg_find_partner_index_by_id(array $accounts, string $id): int
{
    foreach ($accounts as $index => $account) {
        if (($account['id'] ?? '') === $id) {
            return $index;
        }
    }

    return -1;
}

function tmg_is_partner_authenticated(): bool
{
    return isset($_SESSION['tmg_partner_authenticated'])
        && $_SESSION['tmg_partner_authenticated'] === true;
}
