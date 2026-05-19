from fastapi import APIRouter
from pydantic import BaseModel
from rag.pipeline import query_rag

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    answer: str
    language: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    answer = query_rag(request.message, request.language)
    return ChatResponse(answer=answer, language=request.language)