<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

require __DIR__ . '/admin-session.php';
require __DIR__ . '/audits-store.php';
require __DIR__ . '/ai-provider.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$configFile = __DIR__ . '/admin-config.php';
$config = tmg_load_admin_config($configFile);

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

$providerInfo = tmg_ai_provider();

if ($providerInfo['provider'] === '') {
    tmg_json_response(503, [
        'message' => 'Aucune clé IA configurée. Créez api/gemini-config.php (gratuit) ou api/anthropic-config.php sur le serveur.',
    ]);
}

$payload = json_decode((string) file_get_contents('php://input'), true);

if (!is_array($payload)) {
    tmg_json_response(422, ['message' => 'Payload invalide.']);
}

$id = (string) ($payload['id'] ?? '');
$audits = tmg_load_audits();
$auditIndex = tmg_find_audit_index($audits, $id);

if ($auditIndex < 0) {
    tmg_json_response(404, ['message' => 'Audit introuvable.']);
}

$audit = $audits[$auditIndex];

// ===== Construction du contexte envoyé à l'IA =====
$scored = array_filter(
    (array) ($audit['sections'] ?? []),
    static fn ($s) => is_array($s) && (int) ($s['score'] ?? 0) > 0
);
$globalScore = count($scored) > 0
    ? round(array_sum(array_map(static fn ($s) => (int) $s['score'], $scored)) / count($scored), 1)
    : null;

$auditText = "Client : " . (string) ($audit['company'] ?? '') . "\n";

if (($audit['website'] ?? '') !== '') {
    $auditText .= "Site web : " . (string) $audit['website'] . "\n";
}

if ($globalScore !== null) {
    $auditText .= "Note globale : " . $globalScore . " / 5\n";
}

if (($audit['summary'] ?? '') !== '') {
    $auditText .= "Sommaire : " . (string) $audit['summary'] . "\n";
}

$auditText .= "\nRésultats de l'audit par section :\n";

foreach ((array) ($audit['sections'] ?? []) as $section) {
    if (!is_array($section)) {
        continue;
    }

    $title = trim((string) ($section['title'] ?? ''));

    if ($title === '') {
        continue;
    }

    $auditText .= "\n## " . $title;
    $auditText .= ' (' . (int) ($section['score'] ?? 0) . "/5)\n";

    if (($section['findings'] ?? '') !== '') {
        $auditText .= "Constats : " . (string) $section['findings'] . "\n";
    }

    if (($section['recommendations'] ?? '') !== '') {
        $auditText .= "Recommandations : " . (string) $section['recommendations'] . "\n";
    }
}

$systemPrompt = 'Tu es un stratège marketing et web senior chez TMG (Tout le Monde Gagne), '
    . 'un cabinet de consultation à Montréal qui accompagne des PME et OBNL. À partir des '
    . 'résultats d’un audit marketing, tu produis un PLAN D’ATTAQUE concret et priorisé pour '
    . 'réussir le mandat client. Concentre-toi sur les sections aux notes les plus faibles '
    . '(ce sont les plus urgentes), mais garde une vision d’ensemble. '
    . 'Les priorités doivent être classées de la plus importante à la moins importante, avec '
    . 'un impact (élevé/moyen/faible) et un effort (faible/moyen/élevé) réalistes. '
    . 'Les gains rapides sont des actions à fort impact et faible effort réalisables en 1-2 semaines. '
    . 'La feuille de route découpe le mandat en 3 à 4 phases chronologiques. '
    . 'Les indicateurs sont des mesures de succès concrètes. Sois pragmatique, actionnable et '
    . 'orienté résultats. Réponds en français.';

$userText = "Voici les résultats de l'audit marketing à transformer en plan d'attaque :\n\n" . $auditText;

// ===== Schémas (Gemini et Claude) =====
$geminiSchema = [
    'type' => 'OBJECT',
    'properties' => [
        'synthese' => ['type' => 'STRING'],
        'priorites' => [
            'type' => 'ARRAY',
            'items' => [
                'type' => 'OBJECT',
                'properties' => [
                    'titre' => ['type' => 'STRING'],
                    'raison' => ['type' => 'STRING'],
                    'impact' => ['type' => 'STRING', 'enum' => ['élevé', 'moyen', 'faible']],
                    'effort' => ['type' => 'STRING', 'enum' => ['faible', 'moyen', 'élevé']],
                    'actions' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
                ],
                'required' => ['titre', 'raison', 'impact', 'effort', 'actions'],
            ],
        ],
        'gains_rapides' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
        'feuille_de_route' => [
            'type' => 'ARRAY',
            'items' => [
                'type' => 'OBJECT',
                'properties' => [
                    'phase' => ['type' => 'STRING'],
                    'duree' => ['type' => 'STRING'],
                    'objectif' => ['type' => 'STRING'],
                ],
                'required' => ['phase', 'duree', 'objectif'],
            ],
        ],
        'indicateurs' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
    ],
    'required' => ['synthese', 'priorites', 'gains_rapides', 'feuille_de_route', 'indicateurs'],
];

$claudeSchema = [
    'type' => 'object',
    'additionalProperties' => false,
    'required' => ['synthese', 'priorites', 'gains_rapides', 'feuille_de_route', 'indicateurs'],
    'properties' => [
        'synthese' => ['type' => 'string'],
        'priorites' => [
            'type' => 'array',
            'items' => [
                'type' => 'object',
                'additionalProperties' => false,
                'required' => ['titre', 'raison', 'impact', 'effort', 'actions'],
                'properties' => [
                    'titre' => ['type' => 'string'],
                    'raison' => ['type' => 'string'],
                    'impact' => ['type' => 'string', 'enum' => ['élevé', 'moyen', 'faible']],
                    'effort' => ['type' => 'string', 'enum' => ['faible', 'moyen', 'élevé']],
                    'actions' => ['type' => 'array', 'items' => ['type' => 'string']],
                ],
            ],
        ],
        'gains_rapides' => ['type' => 'array', 'items' => ['type' => 'string']],
        'feuille_de_route' => [
            'type' => 'array',
            'items' => [
                'type' => 'object',
                'additionalProperties' => false,
                'required' => ['phase', 'duree', 'objectif'],
                'properties' => [
                    'phase' => ['type' => 'string'],
                    'duree' => ['type' => 'string'],
                    'objectif' => ['type' => 'string'],
                ],
            ],
        ],
        'indicateurs' => ['type' => 'array', 'items' => ['type' => 'string']],
    ],
];

$result = tmg_ai_generate($providerInfo, $systemPrompt, $userText, '', $geminiSchema, $claudeSchema, 6144);

if (!$result['ok'] || !is_array($result['data'])) {
    tmg_json_response(502, ['message' => $result['error'] ?: 'Génération du plan impossible.']);
}

$plan = $result['data'];
$plan['generated_at'] = gmdate('c');
$plan['model'] = $result['model'];

// Recharge avant écriture (l'appel IA a pu durer).
$audits = tmg_load_audits();
$auditIndex = tmg_find_audit_index($audits, $id);

if ($auditIndex < 0) {
    tmg_json_response(404, ['message' => 'Audit introuvable après génération.']);
}

$audits[$auditIndex]['action_plan'] = $plan;
$audits[$auditIndex]['updated_at'] = gmdate('c');
tmg_save_audits($audits);

tmg_json_response(200, [
    'message' => 'Plan d’attaque généré.',
    'audit' => $audits[$auditIndex],
]);
