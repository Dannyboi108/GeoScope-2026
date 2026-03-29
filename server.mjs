import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Ollama } from 'ollama';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

// ── ES module compat ─────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Config ───────────────────────────────────────────────
const RF_API_KEY   = 'a94Bq3PLxRhifix6Opq0';   // Roboflow key (hardcoded)
const PORT         = 3000;
const OLLAMA_MODEL = 'llama3.2';
const ollama       = new Ollama({ host: 'http://127.0.0.1:11434' });

const ELEVENLABS_API_KEY = 'sk_2ab6c79159d470d57161deb220660b9f054431a3c3e4e325';
const DEFAULT_VOICE_ID   = 'EXAVITQu4vr4xnSDxMaL';   // your library voice (requires paid plan)

const MODEL_MAP = {
    building: 'geoscope-v2/1',
    hvac: 'hvac-detection-ujree/1'
};
const DEFAULT_MODEL = MODEL_MAP.building;

const BASE_DIR     = __dirname;
const CAPTURES_DIR = path.join(BASE_DIR, 'captures');

// Create captures folder if missing
(async () => {
    try {
        await fs.mkdir(CAPTURES_DIR, { recursive: true });
    } catch (err) {
        console.error('Failed to create captures directory:', err);
    }
})();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ── Health check ─────────────────────────────────────────
app.get('/ping', (req, res) => {
    res.json({ ok: true });
});

// ── SAVE IMAGE (from canvas) ─────────────────────────────
app.post('/save', async (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }
    try {
        const base64Data = image.split(',')[1] || image;
        const buffer = Buffer.from(base64Data, 'base64');
        const timestamp = Date.now();
        const filename = `map_${timestamp}.jpg`;
        const filepath = path.join(CAPTURES_DIR, filename);
        await fs.writeFile(filepath, buffer);
        console.log(`[SAVE] ${filename}`);
        res.json({ saved: `captures/${filename}` });
    } catch (err) {
        console.error('Error saving image:', err);
        res.status(500).json({ error: err.message });
    }
});

// ── DETECT (Roboflow) ────────────────────────────────────
app.post('/detect', async (req, res) => {
    const { path: relPath, type } = req.body;
    let modelId = DEFAULT_MODEL;
    if (type && MODEL_MAP[type]) {
        modelId = MODEL_MAP[type];
    }
    console.log(`[DETECT] type: ${type || 'none'}, model: ${modelId}`);

    if (!relPath) {
        return res.status(400).json({ error: 'No path provided' });
    }
    const filepath = path.join(BASE_DIR, relPath);
    try {
        await fs.access(filepath);
        const imageBuffer = await fs.readFile(filepath);
        const base64Image = imageBuffer.toString('base64');
        const response = await axios({
            method: 'POST',
            url: `https://serverless.roboflow.com/${modelId}`,
            params: { api_key: RF_API_KEY },
            data: base64Image,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 60000
        });
        const result = response.data;
        console.log('[RF]', response.status);
        res.json({
            predictions: result.predictions || [],
            image_width: result.image?.width,
            image_height: result.image?.height,
        });
    } catch (err) {
        console.error('Detection error:', err);
        if (err.response) {
            return res.status(500).json({
                error: `Roboflow error ${err.response.status}`,
                details: err.response.data
            });
        }
        res.status(500).json({ error: err.message });
    }
});

// ── KELLY CHAT (Ollama) ──────────────────────────────────
app.post('/chat', async (req, res) => {
    const { message, context } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }
    const systemPrompt = `You are Kelly, a helpful assistant for the GeoScope map viewer.
Current map context:
- Center: lat ${context.lat}, lon ${context.lon}
- Zoom: ${context.zoom}
- Last detection: ${context.detectionType} (${context.detectionCount} objects, avg confidence ${context.avgConfidence}%)
- Model used: ${context.modelId}

You can help the user navigate to cities, explain the map, and give details about detections.
If the user asks to go to a city or location, respond with exactly: "NAVIGATE:city_name".
If the user asks you to detect buildings or HVACs (e.g., "detect buildings", "run HVAC detection", "find air conditioners"), you MUST respond with exactly the command: "DETECT:building" or "DETECT:hvac". Do NOT add any extra text when using these commands. After the detection runs, you will receive the result and can comment on it.
Keep other responses concise and friendly.`;

    try {
        const response = await ollama.chat({
            model: OLLAMA_MODEL,
            options: { temperature: 0.7, num_predict: 300 },
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ]
        });
        res.json({ reply: response.message.content });
    } catch (err) {
        console.error('Ollama error:', err);
        res.status(500).json({ error: 'AI service unavailable. Is Ollama running? Try: ollama serve' });
    }
});

// ── ELEVENLABS TTS (using official SDK) ───────────────────
const ttsClient = new ElevenLabsClient({ apiKey: ELEVENLABS_API_KEY });

app.post('/tts', async (req, res) => {
    const { text, voice_id = DEFAULT_VOICE_ID } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }
    try {
        const { data, rawResponse } = await ttsClient.textToSpeech.convert(voice_id, {
            text: text,
            model_id: 'eleven_turbo_v2',   // free tier friendly? but still requires paid for library voice
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75
            }
        }).withRawResponse();

        // Log character usage if available (paid plan)
        const charCost = rawResponse.headers.get('x-character-count');
        if (charCost) console.log(`[TTS] Character count: ${charCost}`);

        // Collect chunks into a buffer
        const chunks = [];
        for await (const chunk of data) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(audioBuffer);
    } catch (err) {
        console.error('TTS error:', err.message);
        // If error contains response details, log them
        if (err.response) {
            const errorText = await err.response.text();
            console.error('ElevenLabs error details:', errorText);
        }
        res.status(500).json({ error: 'TTS failed', details: err.message });
    }
});

// ── STATIC FILES ─────────────────────────────────────────
app.use('/captures', express.static(CAPTURES_DIR));
app.use(express.static(BASE_DIR));   // serve index.html from same folder
app.get('/', (req, res) => {
    res.sendFile(path.join(BASE_DIR, 'index.html'));
});

// ── RUN ──────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Ollama model: ${OLLAMA_MODEL}`);
    console.log(`ElevenLabs TTS using voice ID: ${DEFAULT_VOICE_ID}`);
    console.log(`Serving index.html from ${BASE_DIR}`);
});
