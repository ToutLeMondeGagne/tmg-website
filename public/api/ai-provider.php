<?php
declare(strict_types=1);

/**
 * Helper partagé pour l'analyse par IA (analyse de CV, plan d'audit, etc.).
 * Choisit automatiquement le fournisseur : Gemini (gratuit) si configuré,
 * sinon Claude. Expose une seule fonction de génération JSON structurée.
 */

function tmg_load_ai_key(string $file): string
{
    $config = is_file($file) ? require $file : [];
    $key = is_array($config) ? trim((string) ($config['api_key'] ?? '')) : '';

    return str_starts_with($key, 'coller-') ? '' : $key;
}

/**
 * @return array{provider:string, gemini_key:string, anthropic_key:string}
 */
function tmg_ai_provider(): array
{
    $geminiKey = tmg_load_ai_key(__DIR__ . '/gemini-config.php');
    $anthropicKey = tmg_load_ai_key(__DIR__ . '/anthropic-config.php');
    $provider = $geminiKey !== '' ? 'gemini' : ($anthropicKey !== '' ? 'claude' : '');

    return [
        'provider' => $provider,
        'gemini_key' => $geminiKey,
        'anthropic_key' => $anthropicKey,
    ];
}

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

/**
 * Génère une réponse JSON structurée avec le fournisseur actif.
 * Chaque appelant fournit le schéma dans les deux formats (Gemini + Claude)
 * car leurs conventions diffèrent.
 *
 * @param string $pdfBase64  PDF encodé base64, ou '' si aucun.
 * @return array{ok:bool, data:?array, model:string, error:string}
 */
function tmg_ai_generate(
    array $providerInfo,
    string $systemPrompt,
    string $userText,
    string $pdfBase64,
    array $geminiSchema,
    array $claudeSchema,
    int $maxTokens = 4096
): array {
    set_time_limit(180);

    $provider = $providerInfo['provider'] ?? '';

    if ($provider === 'gemini') {
        $models = ['gemini-3-flash-preview', 'gemini-3.1-flash-lite-preview'];
        $parts = [];

        if ($pdfBase64 !== '') {
            $parts[] = ['inline_data' => ['mime_type' => 'application/pdf', 'data' => $pdfBase64]];
        }

        $parts[] = ['text' => $userText];

        $body = [
            'systemInstruction' => ['parts' => [['text' => $systemPrompt]]],
            'contents' => [['role' => 'user', 'parts' => $parts]],
            'generationConfig' => [
                'responseMimeType' => 'application/json',
                'responseSchema' => $geminiSchema,
                'maxOutputTokens' => $maxTokens,
            ],
        ];

        $lastError = 'Aucun modèle Gemini disponible.';

        foreach ($models as $model) {
            [$code, $response, $curlError] = tmg_ai_post(
                'https://generativelanguage.googleapis.com/v1beta/models/' . $model . ':generateContent',
                ['x-goog-api-key: ' . $providerInfo['gemini_key'], 'content-type: application/json'],
                $body,
            );

            if (!is_array($response)) {
                $lastError = 'Connexion à l’API Gemini impossible : ' . ($curlError ?: 'réponse vide');
                continue;
            }

            if ($code !== 200) {
                $lastError = "Erreur API Gemini ($code) : "
                    . (string) ($response['error']['message'] ?? 'Erreur inconnue.');

                if (in_array($code, [404, 429, 500, 503], true)) {
                    continue;
                }

                break;
            }

            $json = (string) ($response['candidates'][0]['content']['parts'][0]['text'] ?? '');
            $data = json_decode($json, true);

            if (is_array($data)) {
                return ['ok' => true, 'data' => $data, 'model' => $model, 'error' => ''];
            }

            $lastError = 'Réponse Gemini illisible.';
        }

        return ['ok' => false, 'data' => null, 'model' => '', 'error' => $lastError];
    }

    // ===== Claude =====
    $content = [];

    if ($pdfBase64 !== '') {
        $content[] = [
            'type' => 'document',
            'source' => ['type' => 'base64', 'media_type' => 'application/pdf', 'data' => $pdfBase64],
        ];
    }

    $content[] = ['type' => 'text', 'text' => $userText];

    $body = [
        'model' => 'claude-opus-4-8',
        'max_tokens' => max($maxTokens, 8192),
        'thinking' => ['type' => 'adaptive'],
        'output_config' => ['format' => ['type' => 'json_schema', 'schema' => $claudeSchema]],
        'system' => $systemPrompt,
        'messages' => [['role' => 'user', 'content' => $content]],
    ];

    [$code, $response, $curlError] = tmg_ai_post(
        'https://api.anthropic.com/v1/messages',
        [
            'x-api-key: ' . $providerInfo['anthropic_key'],
            'anthropic-version: 2023-06-01',
            'content-type: application/json',
        ],
        $body,
    );

    if (!is_array($response)) {
        return ['ok' => false, 'data' => null, 'model' => '', 'error' => 'Connexion à l’API Claude impossible : ' . ($curlError ?: 'réponse vide')];
    }

    if ($code !== 200) {
        return ['ok' => false, 'data' => null, 'model' => '', 'error' => "Erreur API Claude ($code) : " . (string) ($response['error']['message'] ?? 'Erreur inconnue.')];
    }

    if (($response['stop_reason'] ?? '') === 'refusal') {
        return ['ok' => false, 'data' => null, 'model' => '', 'error' => 'L’analyse a été refusée par le modèle.'];
    }

    $json = '';

    foreach ((array) ($response['content'] ?? []) as $block) {
        if (($block['type'] ?? '') === 'text') {
            $json .= (string) ($block['text'] ?? '');
        }
    }

    $data = json_decode($json, true);

    if (!is_array($data)) {
        return ['ok' => false, 'data' => null, 'model' => '', 'error' => 'Réponse Claude illisible.'];
    }

    return ['ok' => true, 'data' => $data, 'model' => (string) ($response['model'] ?? 'claude-opus-4-8'), 'error' => ''];
}
