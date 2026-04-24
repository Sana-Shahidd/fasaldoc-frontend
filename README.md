# FasalDoc — فصل ڈاک

> AI-powered plant disease detection for Pakistani farmers

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fasaldoc--frontend.vercel.app-brightgreen?style=flat-square)](https://fasaldoc-frontend.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=flat-square)](https://fasaldoc-backend.onrender.com/health)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

FasalDoc lets Pakistani farmers photograph a diseased crop leaf and instantly receive an AI diagnosis, treatment guide, nearby agri-shop locations, and online medicine links — all in their own language.

---

## Live Demo

**[https://fasaldoc-frontend.vercel.app](https://fasaldoc-frontend.vercel.app)**

---

## Features

- **Crop Disease Detection** — Upload or photograph a leaf; TFLite model identifies the disease from 38 classes with 96.1% accuracy
- **Treatment Guide** — Symptoms, organic remedies, chemical treatments (name, dosage, frequency), and prevention tips
- **Read Aloud** — Full treatment guide is spoken aloud using Web Speech API, designed for low-literacy farmers
- **Nearby Shops** — GPS-based search for agri-shops stocking the prescribed medicines (Google Places + OpenStreetMap fallback)
- **Online Stores** — Live product search across Daraz, Kissan Store, AgriStore.pk, and BigHaat
- **4 Languages** — English, Urdu (اردو), Punjabi (پنجابی), Sindhi (سنڌي) with full RTL support
- **Scan History** — Previous diagnoses saved per device
- **AI Chatbot** — Crop question assistant with voice input
- **Grad-CAM Heatmap** — Visual overlay showing which leaf region triggered the diagnosis
- **PWA** — Installable on Android and iPhone, works offline

---

## Screenshots

| Home | Diagnosis | Treatment |
|------|-----------|-----------|
| Scan your crop leaf | AI result with confidence | Full treatment guide with read-aloud |

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2 | UI framework |
| Vite | 5.1 | Build tool |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Framer Motion | 11.0 | Animations |
| React Router | 6.22 | SPA routing |
| Zustand | 4.5 | State management |
| i18next | 23.10 | 4-language i18n |
| Axios | 1.6 | API client |
| Vite PWA | 0.19 | Service worker & offline |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| FastAPI | 0.103 | REST API |
| TensorFlow Lite | 2.14 | Plant disease inference |
| Pillow + OpenCV | 10.0 / 4.8 | Image preprocessing & Grad-CAM |
| SQLite | 3 | Scan history |
| httpx + BeautifulSoup | — | E-commerce product scraping |
| slowapi | 0.1.9 | Rate limiting |
| Docker | — | Production container |

---

## ML Model

- **Architecture**: MobileNetV2 (transfer learning)
- **Dataset**: PlantVillage — 54,305 images, 38 disease classes
- **Accuracy**: 96.1% on test set
- **Inference**: TFLite (8.8 MB) for fast mobile-friendly predictions
- **Grad-CAM**: Full Keras model (H5) for heatmap visualization

### Supported Diseases (38 classes)
Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato — covering fungal, bacterial, viral, and pest diseases plus healthy class.

---

## Project Structure

```
fasaldoc-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Camera/gallery capture + upload
│   │   ├── Results.tsx       # Diagnosis result + Grad-CAM
│   │   ├── Treatment.tsx     # Symptoms, treatments, read-aloud
│   │   ├── Shops.tsx         # Physical + online shops
│   │   ├── History.tsx       # Scan history
│   │   ├── Settings.tsx      # Language selector
│   │   ├── Community.tsx     # Farmer forum
│   │   └── Videos.tsx        # Educational videos
│   ├── components/           # BottomNav, SideNav, ChatBot, etc.
│   ├── hooks/
│   │   ├── useSpeech.ts      # Web Speech API (TTS)
│   │   └── useSpeechRecognition.ts
│   ├── i18n/locales/         # en.json, ur.json, pa.json, sd.json
│   ├── api/client.ts         # All backend API calls
│   └── store/store.ts        # Zustand global state
├── vercel.json               # SPA routing fallback
├── vite.config.ts            # PWA manifest + workbox config
└── tailwind.config.js        # Forest green custom theme
```

---

## Running Locally

### Prerequisites
- Node.js 18+
- Python 3.10+

### Frontend
```bash
git clone https://github.com/Sana-Shahidd/fasaldoc-frontend.git
cd fasaldoc-frontend
npm install
```

Create `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
# Opens at http://localhost:5173
```

### Backend
```bash
git clone https://github.com/Sana-Shahidd/fasaldoc-backend.git
cd fasaldoc-backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn main:app --reload
# API at http://localhost:8000
# Docs at http://localhost:8000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check — model loaded status |
| POST | `/predict` | Disease detection from leaf image |
| POST | `/predict/gradcam` | Grad-CAM heatmap generation |
| GET | `/shops` | Nearby agri-shops by GPS coordinates |
| GET | `/history` | User scan history |
| GET | `/products/search` | E-commerce product search |

Full docs: [https://fasaldoc-backend.onrender.com/docs](https://fasaldoc-backend.onrender.com/docs)

---

## Deployment

| Layer | Platform | URL |
|-------|----------|-----|
| Frontend | Vercel | https://fasaldoc-frontend.vercel.app |
| Backend | Render (Docker) | https://fasaldoc-backend.onrender.com |
| Source | GitHub | https://github.com/Sana-Shahidd/fasaldoc-frontend |

Auto-deploy is enabled — every `git push` to `main` triggers a new Vercel deployment.

---

## Languages Supported

| Language | Script | Direction |
|----------|--------|-----------|
| English | Latin | LTR |
| Urdu (اردو) | Nastaliq | RTL |
| Punjabi (پنجابی) | Shahmukhi | RTL |
| Sindhi (سنڌي) | Arabic | RTL |

---

## Accuracy Disclaimer

FasalDoc achieves 96.1% accuracy on lab-standard PlantVillage images. Real-field accuracy depends on lighting, camera angle, and image clarity. Always consult a local agronomist for severe or unconfirmed outbreaks.

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## License

MIT © 2025 Sana Shahidd
