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

if ($method !== 'POST') {
    tmg_json_response(405, ['message' => 'Méthode non autorisée.']);
}

tmg_start_admin_session($config);
tmg_require_admin_auth();

/**
 * Choix du fournisseur d'IA :
 * - gemini-config.php présent avec une clé → Gemini (palier gratuit, pour les tests)
 * - sinon anthropic-config.php → Claude (qualité maximale)
 */
function tmg_load_ai_key(string $file): string
{
    $config = is_file($file) ? require $file : [];
    $key = is_array($config) ? trim((string) ($config['api_key'] ?? '')) : '';

    return str_starts_with($key, 'coller-') ? '' : $key;
}

$geminiKey = tmg_load_ai_key(__DIR__ . '/gemini-config.php');
$anthropicKey = tmg_load_ai_key(__DIR__ . '/anthropic-config.php');
$provider = $geminiKey !== '' ? 'gemini' : ($anthropicKey !== '' ? 'claude' : '');

if ($provider === '') {
    tmg_json_response(503, [
        'message' => 'Aucune clé IA configurée. Créez api/gemini-config.php (gratuit) ou api/anthropic-config.php sur le serveur.',
    ]);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody, true);

if (!is_array($payload)) {
    tmg_json_response(422, ['message' => 'Payload invalide.']);
}

$id = (string) ($payload['id'] ?? '');
$jobDescription = trim((string) ($payload['job_description'] ?? ''));

$leads = tmg_load_leads();
$leadIndex = tmg_find_lead_index_by_id($leads, $id);

if ($leadIndex < 0) {
    tmg_json_response(404, ['message' => 'Candidature introuvable.']);
}

$lead = $leads[$leadIndex];

/**
 * Extraction du texte d'un DOCX (zip contenant word/document.xml).
 */
function tmg_extract_docx_text(string $path): string
{
    if (!class_exists('ZipArchive')) {
        return '';
    }

    $zip = new ZipArchive();

    if ($zip->open($path) !== true) {
        return '';
    }

    $xml = $zip->getFromName('word/document.xml');
    $zip->close();

    if ($xml === false) {
        return '';
    }

    $xml = str_replace(['</w:p>', '<w:br/>', '<w:tab/>'], ["\n", "\n", ' '], $xml);
    $text = strip_tags($xml);
    $text = html_entity_decode($text, ENT_QUOTES | ENT_XML1, 'UTF-8');

    return trim((string) preg_replace('/[ \t]+/', ' ', $text));
}

// ===== Contenu commun aux deux fournisseurs =====
$fieldsText = '';

foreach ((array) ($lead['fields'] ?? []) as $label => $value) {
    $fieldsText .= $label . ' : ' . $value . "\n";
}

// Le poste évalué est celui que le candidat a choisi dans le formulaire
// (« Centre d'intérêt ») ; les précisions admin viennent en complément.
$interest = trim((string) ($lead['fields']['Centre d’intérêt'] ?? ''));
$trackProfiles = [
    'consultation marketing' =>
        'Stage en consultation marketing chez TMG : stratégie marketing pour PME et OBNL, '
        . 'réseaux sociaux, création de contenu, analyse de campagnes, communication client.',
    'consultation en stratégie' =>
        'Stage en consultation en stratégie chez TMG : analyse d’affaires, études de marché, '
        . 'structuration d’offres, recommandations stratégiques pour PME et OBNL.',
    'consultation en développement' =>
        'Stage en consultation en développement web chez TMG : développement de sites web '
        . '(React, JavaScript, HTML/CSS), intégration, rigueur technique, sites pour PME et OBNL.',
];
$interestKey = function_exists('mb_strtolower') ? mb_strtolower($interest, 'UTF-8') : strtolower($interest);
$posteEvalue = $interest !== '' ? $interest : 'Stage général chez TMG (marketing et web)';
$posteText = $trackProfiles[$interestKey]
    ?? ('Stage chez TMG dans le domaine : ' . ($interest !== '' ? $interest : 'marketing et web (généraliste)'));

$promptText = "Poste visé par le candidat (choisi dans le formulaire) :\n" . $posteText . "\n";

if ($jobDescription !== '') {
    $promptText .= "\nExigences supplémentaires précisées par TMG :\n" . $jobDescription . "\n";
}

$promptText .= "\nFormulaire de candidature :\n" . $fieldsText;

$pdfBase64 = '';
$cvNote = '';
$cvFile = (string) ($lead['cv_file'] ?? '');
$cvPath = $cvFile !== '' && basename($cvFile) === $cvFile
    ? tmg_leads_cv_directory() . '/' . $cvFile
    : '';
$extension = strtolower(pathinfo($cvFile, PATHINFO_EXTENSION));

if ($cvPath !== '' && is_file($cvPath) && $extension === 'pdf') {
    $pdfBase64 = base64_encode((string) file_get_contents($cvPath));
} elseif ($cvPath !== '' && is_file($cvPath) && $extension === 'docx') {
    $docxText = tmg_extract_docx_text($cvPath);

    if ($docxText !== '') {
        $promptText .= "\nContenu du CV (extrait du fichier Word) :\n" . $docxText . "\n";
    } else {
        $cvNote = 'CV Word illisible automatiquement — analyse basée sur le formulaire seulement.';
    }
} elseif ($cvFile !== '') {
    $cvNote = 'Format de CV non analysable automatiquement (.doc) — analyse basée sur le formulaire seulement.';
} else {
    $cvNote = 'Aucun CV joint — analyse basée sur le formulaire seulement.';
}

if ($cvNote !== '') {
    $promptText .= "\nNote : " . $cvNote . "\n";
}

$systemPrompt = 'Tu es le recruteur du programme de stage de TMG (Tout le Monde Gagne), '
    . 'un cabinet de consultation marketing et web à Montréal qui accueille des stagiaires '
    . 'sur de vrais projets clients. Évalue objectivement la candidature fournie par rapport '
    . 'au poste visé par le candidat, en tenant compte des exigences supplémentaires de TMG '
    . 'si elles sont fournies. Le champ score est un entier de 0 à 100. '
    . 'Sois honnête : un profil hors sujet mérite un score faible. '
    . 'Tiens compte du potentiel d’apprentissage (ce sont des stagiaires, pas des seniors). '
    . 'Maximum 4 forces, 3 lacunes, 3 questions d’entrevue, toutes courtes. '
    . 'Réponds en français.';

/**
 * Exécute une requête POST JSON et retourne [code HTTP, tableau décodé, erreur cURL].
 */
function tmg_ai_post(string $url, array $headers, array $body): array
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 160,
        CURLOPT_CONNECTTIMEOUT => 15,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($body),
    ]);
    $raw = curl_exec($curl);
    $code = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    return [$code, is_string($raw) ? json_decode($raw, true) : null, $error];
}

set_time_limit(180);

// ===== Appel du fournisseur choisi =====
if ($provider === 'gemini') {
    // Les nouveaux comptes Google n'ont du quota gratuit que sur les modèles
    // récents ; on essaie dans l'ordre et on bascule si surcharge/quota.
    $geminiModels = ['gemini-3-flash-preview', 'gemini-3.1-flash-lite-preview'];
    $parts = [];

    if ($pdfBase64 !== '') {
        $parts[] = ['inline_data' => ['mime_type' => 'application/pdf', 'data' => $pdfBase64]];
    }

    $parts[] = ['text' => $promptText];

    $requestBody = [
        'systemInstruction' => ['parts' => [['text' => $systemPrompt]]],
        'contents' => [['role' => 'user', 'parts' => $parts]],
        'generationConfig' => [
            'responseMimeType' => 'application/json',
            'responseSchema' => [
                'type' => 'OBJECT',
                'properties' => [
                    'score' => ['type' => 'INTEGER'],
                    'niveau' => ['type' => 'STRING', 'enum' => ['excellent', 'bon', 'moyen', 'faible']],
                    'resume' => ['type' => 'STRING'],
                    'forces' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
                    'lacunes' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
                    'questions_entrevue' => ['type' => 'ARRAY', 'items' => ['type' => 'STRING']],
                ],
                'required' => ['score', 'niveau', 'resume', 'forces', 'lacunes', 'questions_entrevue'],
            ],
            'maxOutputTokens' => 4096,
        ],
    ];

    $analysisJson = '';
    $usedModel = '';
    $lastError = 'Aucun modèle Gemini disponible.';

    foreach ($geminiModels as $geminiModel) {
        [$httpCode, $apiResponse, $curlError] = tmg_ai_post(
            'https://generativelanguage.googleapis.com/v1beta/models/' . $geminiModel . ':generateContent',
            ['x-goog-api-key: ' . $geminiKey, 'content-type: application/json'],
            $requestBody,
        );

        if (!is_array($apiResponse)) {
            $lastError = 'Connexion à l’API Gemini impossible : ' . ($curlError ?: 'réponse vide');
            continue;
        }

        if ($httpCode !== 200) {
            $lastError = "Erreur API Gemini ($httpCode) : "
                . (string) ($apiResponse['error']['message'] ?? 'Erreur inconnue.');

            // Modèle indisponible, surchargé ou quota atteint : on essaie le suivant.
            if (in_array($httpCode, [404, 429, 500, 503], true)) {
                continue;
            }

            break;
        }

        $analysisJson = (string) ($apiResponse['candidates'][0]['content']['parts'][0]['text'] ?? '');
        $usedModel = $geminiModel;
        break;
    }

    if ($analysisJson === '') {
        tmg_json_response(502, ['message' => $lastError]);
    }
} else {
    $contentBlocks = [];

    if ($pdfBase64 !== '') {
        $contentBlocks[] = [
            'type' => 'document',
            'source' => ['type' => 'base64', 'media_type' => 'application/pdf', 'data' => $pdfBase64],
        ];
    }

    $contentBlocks[] = ['type' => 'text', 'text' => $promptText];

    $requestBody = [
        'model' => 'claude-opus-4-8',
        'max_tokens' => 8192,
        'thinking' => ['type' => 'adaptive'],
        'output_config' => [
            'format' => [
                'type' => 'json_schema',
                'schema' => [
                    'type' => 'object',
                    'additionalProperties' => false,
                    'required' => ['score', 'niveau', 'resume', 'forces', 'lacunes', 'questions_entrevue'],
                    'properties' => [
                        'score' => ['type' => 'integer'],
                        'niveau' => ['type' => 'string', 'enum' => ['excellent', 'bon', 'moyen', 'faible']],
                        'resume' => ['type' => 'string'],
                        'forces' => ['type' => 'array', 'items' => ['type' => 'string']],
                        'lacunes' => ['type' => 'array', 'items' => ['type' => 'string']],
                        'questions_entrevue' => ['type' => 'array', 'items' => ['type' => 'string']],
                    ],
                ],
            ],
        ],
        'system' => $systemPrompt,
        'messages' => [['role' => 'user', 'content' => $contentBlocks]],
    ];

    [$httpCode, $apiResponse, $curlError] = tmg_ai_post(
        'https://api.anthropic.com/v1/messages',
        [
            'x-api-key: ' . $anthropicKey,
            'anthropic-version: 2023-06-01',
            'content-type: application/json',
        ],
        $requestBody,
    );

    if (!is_array($apiResponse)) {
        tmg_json_response(502, ['message' => 'Connexion à l’API Claude impossible : ' . ($curlError ?: 'réponse vide')]);
    }

    if ($httpCode !== 200) {
        $apiMessage = (string) ($apiResponse['error']['message'] ?? 'Erreur inconnue.');
        tmg_json_response(502, ['message' => "Erreur API Claude ($httpCode) : " . $apiMessage]);
    }

    if (($apiResponse['stop_reason'] ?? '') === 'refusal') {
        tmg_json_response(502, ['message' => 'L’analyse a été refusée par le modèle. Réessayez.']);
    }

    $analysisJson = '';

    foreach ((array) ($apiResponse['content'] ?? []) as $block) {
        if (($block['type'] ?? '') === 'text') {
            $analysisJson .= (string) ($block['text'] ?? '');
        }
    }

    $usedModel = (string) ($apiResponse['model'] ?? 'claude-opus-4-8');
}

$analysis = json_decode($analysisJson, true);

if (!is_array($analysis) || !isset($analysis['score'])) {
    tmg_json_response(502, ['message' => 'Analyse illisible retournée par le modèle.']);
}

$analysis['score'] = max(0, min(100, (int) $analysis['score']));
$analysis['poste_evalue'] = $posteEvalue;
$analysis['job_description'] = $jobDescription;
$analysis['cv_note'] = $cvNote;
$analysis['analyzed_at'] = gmdate('c');
$analysis['model'] = $usedModel;

// Recharge le stockage avant d'écrire (l'appel API a pu durer longtemps).
$leads = tmg_load_leads();
$leadIndex = tmg_find_lead_index_by_id($leads, $id);

if ($leadIndex < 0) {
    tmg_json_response(404, ['message' => 'Candidature introuvable après analyse.']);
}

$leads[$leadIndex]['analysis'] = $analysis;
$leads[$leadIndex]['updated_at'] = gmdate('c');

if (!tmg_save_leads($leads)) {
    tmg_json_response(500, ['message' => 'Impossible de sauvegarder l’analyse.']);
}

tmg_json_response(200, [
    'message' => 'Analyse terminée.',
    'lead' => $leads[$leadIndex],
]);
