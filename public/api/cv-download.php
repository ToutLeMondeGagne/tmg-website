<?php
declare(strict_types=1);

require __DIR__ . '/admin-session.php';
require __DIR__ . '/leads-store.php';

$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

tmg_start_admin_session($config);

if (!tmg_is_admin_authenticated()) {
    http_response_code(401);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['message' => 'Connexion admin requise.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$id = isset($_GET['id']) ? (string) $_GET['id'] : '';
$leads = tmg_load_leads();
$leadIndex = tmg_find_lead_index_by_id($leads, $id);

if ($leadIndex < 0) {
    http_response_code(404);
    exit('Candidature introuvable.');
}

$cvFile = (string) ($leads[$leadIndex]['cv_file'] ?? '');

// Anti-traversée : le nom stocké doit être un simple nom de fichier.
if ($cvFile === '' || basename($cvFile) !== $cvFile) {
    http_response_code(404);
    exit('Aucun CV pour cette candidature.');
}

$path = tmg_leads_cv_directory() . '/' . $cvFile;

if (!is_file($path)) {
    http_response_code(404);
    exit('Fichier CV introuvable.');
}

$extension = strtolower(pathinfo($cvFile, PATHINFO_EXTENSION));
$mimeTypes = [
    'pdf' => 'application/pdf',
    'doc' => 'application/msword',
    'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
$mime = $mimeTypes[$extension] ?? 'application/octet-stream';

// Nom de téléchargement lisible : sans le préfixe interne "lead-xxxx-".
$downloadName = preg_replace('/^lead-[0-9a-f]+-/', '', $cvFile) ?: $cvFile;

header('Content-Type: ' . $mime);
header('Content-Length: ' . (string) filesize($path));
header('Content-Disposition: attachment; filename="' . $downloadName . '"');
header('Cache-Control: no-store');

readfile($path);
