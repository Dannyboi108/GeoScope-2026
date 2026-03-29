# GeoScope 🛰

A MapBox tile viewer with AI-powered building detection. Fetch satellite or street-level map tiles for any coordinate on Earth, then run a Roboflow semantic segmentation model to detect and outline buildings — results open in a dedicated result page with stats and a download option.

---

## Project Structure

```
geoscope/
├── assets/
│   ├── authHandlers.js     # Authentication logic (Supabase)
│   ├── bootstrap.js        # App initialisation & startup sequence
│   ├── config.js           # Global config — API keys, constants
│   ├── supabaseClient.js   # Supabase client instance
│   ├── uiInteractions.js   # Event listeners & user interaction handlers
│   └── uiRenderer.js       # DOM rendering & canvas drawing utilities
├── captures/               # Auto-created — saved map snapshots (JPEG)
├── .env                    # Environment variables (never commit this)
├── index.html              # Main frontend — map viewer + controls
├── start.html              # Landing / login page
├── server.mjs              # Express backend — captures images & calls Roboflow
├── package.json            # Node dependencies
└── README.md
```

---

## How We Built It

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database / Auth:** Supabase
- **AI / ML:** Roboflow, Machine Learning
- **Chatbot LLM:** Ollama
- **Voice Output:** ElevenLabs TTS

---

## Implementation Highlights

- Functional web interface
- Coordinate-based building lookup
- Chatbot support in text
- Voice response through TTS
- Scalable backend structure
