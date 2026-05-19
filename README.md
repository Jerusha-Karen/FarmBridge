
<div align="center">
🌾 FarmBridge AI
Intelligent Farmer Assistance & Resource Platform

Empowering rural farmers through voice-first AI, vernacular language support, and peer-to-peer resource sharing — built for Bharat, not just India.

SDG 2 — Zero Hunger  |  SDG 1 — No Poverty  |  SDG 9 — Industry & Innovation

</div>

📌 The Problem
India has 140 million farming households. Most of them:

Cannot access government schemes they legally qualify for — due to language barriers and bureaucratic complexity
Pay 20–40% extra for equipment and inputs because middlemen control the supply chain
Have no reliable, local-language source of agricultural guidance
Cannot read English — making most agri-tech apps completely inaccessible

KrishiMitra exists to fix all four of these at once.

🧠 What is FarmBridge AI?
FarmBridge AI is a voice-first, AI-powered agricultural assistance platform that lets farmers:

Ask farming questions in their native language (Kannada, Hindi, English) and get accurate, context-aware answers
Discover government schemes they qualify for — explained in plain language with step-by-step application guidance
Buy, sell, and rent agricultural resources directly from nearby farmers — no middlemen, no commissions
Connect with a farming community to share experiences and seek peer guidance

The entire system is designed for users with low digital literacy. If you can speak, you can use FarmBridge AI.

✨ Core Features
🌾 Peer-to-Peer Agricultural Marketplace

List tractors, tools, seeds, land, and labour for rent, sale, or exchange
Location-based discovery — see listings within your district first
Direct farmer-to-farmer contact — zero commission, zero middleman
Reputation scoring based on successful transactions

🏛 Government Scheme Recommender

Answer 4 simple questions about your farm and background
Get a personalised list of central and state schemes you qualify for
Each result includes: eligibility reason, required documents, application link, and deadline
Covers PM-Kisan, Fasal Bima Yojana, Soil Health Card, Karnataka Raitha Siri, and 20+ more

🧑‍🌾 Farmer Community Network

Post questions, share harvest photos, and exchange local knowledge
Threaded discussions organised by crop type and district
Verified farmer badges for trusted community members

📍 Location-Based Resource Discovery

Geolocation-aware listings and community posts
Filter by taluk, district, or radius


🤖 Unique AI Features
🎤 1. Vernacular Voice-First Interaction

A farmer in Dharwad speaks Kannada into their phone. KrishiMitra understands, thinks, and responds — in Kannada.


Speech-to-Text: OpenAI Whisper — handles code-switching between Kannada, Hindi, and English naturally, even with regional accents and background noise
Text-to-Speech: Sarvam AI TTS — India-built, trained on Indic languages, sounds natural in rural dialects (not robotic Google TTS)
Browser fallback: Web Speech API with lang: kn-IN for instant, zero-cost voice input on any modern phone
No other agri-platform demo demonstrates live Kannada voice interaction end-to-end

🔍 2. RAG over Real Agricultural Data

Not a ChatGPT wrapper. This bot knows Karnataka's crop calendar, local pest cycles, and district-specific scheme rules — because that knowledge is embedded in its memory.


Retrieval-Augmented Generation (RAG) using LangChain + ChromaDB
Knowledge base built from: ICAR publications, Krishi Vigyan Kendra guides, Karnataka state agricultural department documents, and scheme PDFs
Covers: crop calendars by district, soil types, pest and disease identification, organic treatments, fertilizer recommendations, water management
Answers are grounded in retrieved documents — not hallucinated — with source attribution
Embeddings generated via Google Gemini's embedding model, stored in ChromaDB vector store

🏛 3. Intelligent Scheme Eligibility Explainer

"You qualify for 3 schemes. Here's exactly why, what documents you need, and how to apply."


Farmer fills a 4-field form: crop type, land size, annual income, social category
RAG pipeline retrieves relevant scheme documents
Gemini generates a personalised eligibility explanation in the farmer's language
Returns ranked results with: scheme name, benefit amount, eligibility reason, required documents, official application URL
Directly addresses SDG 1 (poverty) and SDG 2 (food security) — purpose-built for government partnership pitches

🔇 4. Zero-Literacy UI Design

Designed for semi-literate users. If you can speak, you can use this app.


Every action accessible via voice — no typing required
Visual-first interface: icons, colors, and images convey meaning before text
Responses read aloud automatically — farmers listen, not read
Minimal text on screen; large tap targets for low-precision touch interaction
Works on low-end Android phones with 2G/3G connectivity
Offline-capable PWA — core features work without internet


🏗 System Architecture
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│   React PWA (Web)  │  Voice UI  │  WhatsApp Bot (soon)  │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP / WebSocket
┌────────────────────────────▼────────────────────────────┐
│              FastAPI Backend (Python 3.12)               │
│   /api/chat  │  /api/schemes  │  /api/marketplace        │
│   /api/voice │  /api/listings │  /api/community          │
└──────┬───────────────┬──────────────────┬───────────────┘
       │               │                  │
┌──────▼──────┐ ┌──────▼──────┐  ┌───────▼──────┐
│  RAG Engine │ │  LLM Layer  │  │  Voice Layer │
│  LangChain  │ │  Gemini 2.0 │  │  Whisper STT │
│  ChromaDB   │ │  Flash API  │  │  Sarvam TTS  │
└──────┬──────┘ └──────┬──────┘  └──────────────┘
       │               │
┌──────▼───────────────▼──────────────────────────────────┐
│                      DATA LAYER                          │
│   MongoDB Atlas (listings, users)  │  ChromaDB (vectors) │
│   AWS S3 (images, audio)           │  Redis (cache)       │
└─────────────────────────────────────────────────────────┘

🛠 Tech Stack
LayerTechnologyPurposeFrontendReact 18 + Vite + Tailwind CSSFast, responsive UIBackendFastAPI (Python 3.12)REST API, async, auto-docsAI / LLMGoogle Gemini 2.0 FlashChat, reasoning, multilingualRAGLangChain + ChromaDBKnowledge retrievalSTTOpenAI Whisper (local)Voice-to-text, Indic languagesTTSSarvam AI APINatural Indic language speechDatabaseMongoDB AtlasListings, users, communityDeploymentRender (backend) + Vercel (frontend)Free tier, one-click deployStorageAWS S3Images and audio files

📁 Project Structure
krishimitra/
├── backend/
│   ├── main.py                  # FastAPI app entry point
│   ├── requirements.txt
│   ├── seed.py                  # Seed sample marketplace data
│   ├── .env                     # API keys (not committed)
│   ├── routes/
│   │   ├── chat.py              # POST /api/chat
│   │   ├── marketplace.py       # GET/POST /api/marketplace
│   │   ├── schemes.py           # POST /api/schemes
│   │   └── voice.py             # POST /api/voice (Whisper)
│   ├── rag/
│   │   ├── pipeline.py          # RAG query pipeline
│   │   ├── embeddings.py        # Embedding generation
│   │   └── loader.py            # Document chunking
│   ├── data/
│   │   ├── crops.md             # Karnataka crop knowledge base
│   │   ├── schemes.md           # Government schemes database
│   │   └── soil_pests.md        # Soil and pest management
│   ├── models/
│   │   ├── listing.py           # Marketplace listing schema
│   │   └── farmer.py            # Farmer profile schema
│   └── utils/
│       ├── db.py                # MongoDB connection
│       └── helpers.py           # Shared utilities
│
└── frontend/
    └── src/
        ├── pages/               # Home, Chat, Marketplace, Schemes
        ├── components/
        │   ├── chat/            # ChatWindow, VoiceButton, MessageBubble
        │   ├── marketplace/     # ListingCard, PostListingModal
        │   ├── schemes/         # SchemeForm, SchemeCard
        │   └── common/          # Navbar, Footer, Loader
        ├── hooks/               # useVoice, useChat, useMarketplace
        └── utils/               # api.js, constants.js, languages.js

🚀 Getting Started
Prerequisites

Python 3.11+
Node.js 20+
Git

1. Clone the repository
bashgit clone https://github.com/yourusername/krishimitra.git
cd krishimitra
2. Backend setup
bashcd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
Create backend/.env:
envGEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_atlas_uri
Run the ingest script to build the vector store:
bashpython rag/loader.py
Start the backend:
bashuvicorn main:app --reload
# API docs available at http://localhost:8000/docs
3. Frontend setup
bashcd frontend
npm install
Create frontend/.env:
envVITE_API_URL=http://localhost:8000
Start the frontend:
bashnpm run dev
# App available at http://localhost:5173
4. Seed sample data
bashcd backend
python seed.py

📡 API Documentation
Once the backend is running, visit http://localhost:8000/docs for the full interactive Swagger UI.
MethodEndpointDescriptionPOST/api/chatSend a message, get RAG-powered responsePOST/api/voiceUpload audio, get transcript (Whisper)POST/api/schemesGet personalised scheme recommendationsGET/api/marketplaceGet all listings (with filters)POST/api/marketplaceCreate a new listing
Example — Chat request
jsonPOST /api/chat
{
  "message": "ಟೊಮೆಟೊ ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತಿವೆ",
  "language": "kn"
}
Example — Scheme request
jsonPOST /api/schemes
{
  "crop": "rice",
  "land_size": 2.5,
  "annual_income": 80000,
  "category": "OBC",
  "state": "Karnataka"
}

🌍 SDG Alignment
GoalHow KrishiMitra contributesSDG 2 — Zero HungerBetter crop decisions through AI guidance reduces crop failure; pest detection prevents yield lossSDG 1 — No PovertyDirect scheme access puts money farmers are already entitled to into their hands; P2P marketplace eliminates middleman marginsSDG 9 — Industry & InnovationDemonstrates that cutting-edge AI (RAG, LLMs, voice AI) can be made accessible to the most underserved populations

🗺 Roadmap

 RAG-powered farming chatbot
 Vernacular voice input (Kannada / Hindi / English)
 Government scheme recommender
 P2P agricultural marketplace
 WhatsApp Bot integration (Twilio)
 Crop disease detection from photos (EfficientNet / ONNX)
 Offline PWA mode
 React Native mobile app
 Weather-aware crop advisory
 Integration with eNAM (National Agriculture Market)


🤝 Contributing
Contributions are welcome. Please open an issue first to discuss what you'd like to change.

Fork the repo
Create a feature branch (git checkout -b feature/voice-kannada)
Commit your changes (git commit -m 'Add Kannada TTS support')
Push to branch (git push origin feature/voice-kannada)
Open a Pull Request



#############################
PRODUCTION GRADE ADVANCEMENTS
#############################

🚀 1. Production-Grade AdvancementsTo move from a "hackathon project" to a "production-grade tool," focus on these four pillars:A. Reliability & Accuracy (The "Trust" Layer)Human-in-the-loop (HITL): Since LLMs can hallucinate, create a dashboard for agricultural experts to review and "verify" AI-generated answers. Verified answers can then be cached.Guardrails: Use a library like Nvidia NeMo Guardrails to ensure the bot doesn't give advice on non-farming topics or medical advice.Confidence Scores: If the RAG retrieval score is low, have the AI say, "I'm not 100% sure, let me connect you to a local Krishi Kendra expert."B. Scalability & PerformanceStream Responses: For low-bandwidth 3G/4G areas, use Server-Sent Events (SSE) to stream the AI text and audio so the farmer doesn't wait 10 seconds in silence.Edge Caching: Use Redis to cache common queries (e.g., "PM-Kisan eligibility") to save on API costs and improve speed.WhatsApp Integration: In rural India, WhatsApp is the internet. Building a Twilio or Gupshup integration is mandatory for production.C. Advanced Computer VisionLeaf Disease Analysis: Integrate a model like ResNet-50 or Vision Transformer (ViT). A farmer takes a photo of a leaf $\rightarrow$ the AI identifies the pest/fungus $\rightarrow$ the RAG system suggests an organic or chemical cure.🤝 2. Opening for ContributionsSince you want to keep it open-source, you need to make it "Contributor-Friendly":Documentation: Create a CONTRIBUTING.md. Specifically ask for:Linguists: To help refine prompts for regional dialects (like North vs. South Karnataka Kannada).Agri-Scientists: To verify the Knowledge Base (Markdown files).Issue Tagging: Use GitHub tags like good-first-issue for UI fixes and high-priority for RAG accuracy improvements.Open Dataset: Consider making your cleaned dataset of Indian Government Schemes open-source. This attracts researchers and developers to your repo.📢 3. Promotion & "Experimental" LaunchDon't wait for a "Perfect Version 1.0." Start an "Alpha Pilot" now.Instagram/Social Media StrategyThe Content: Don't post code. Post videos of the Voice UI in action. Show a video of someone speaking in a local dialect and the app responding.Success Stories: Even if you help one farmer get a scheme or sell a tractor, feature that.Educational Snippets: "Did you know you qualify for XYZ scheme?" followed by a link to try the bot.Small-Scale Experimentation (The "Gram Panchayat" Model)Select one village/Taluk: Go to a local FPO (Farmer Producer Organization).The "Champion" Model: Find one tech-savvy young farmer. Train them to use the app. Let them be the "KrishiMitra Agent" for their neighbors.Feedback Loop: Use their feedback to fix the UI. (e.g., "The button is too small for calloused fingers" or "The voice is too fast").


<div align="center">
Built with ❤️ for India's 140 million farming families
"Technology is most powerful when it serves those who need it most."
</div>
