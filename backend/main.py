from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.marketplace import router as marketplace_router
from routes.schemes import router as schemes_router
from routes.voice import router as voice_router

app = FastAPI(
    title="FarmBridge AI",
    description="AI-powered agricultural assistance for Karnataka farmers",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # will restrict after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api", tags=["Chat"])
app.include_router(schemes_router, prefix="/api", tags=["Schemes"])
app.include_router(marketplace_router, prefix="/api", tags=["Marketplace"])
app.include_router(voice_router, prefix="/api", tags=["Voice"])

@app.get("/")
async def root():
    return {
        "app": "FarmBridge AI",
        "status": "running",
        "docs": "/docs"
    }