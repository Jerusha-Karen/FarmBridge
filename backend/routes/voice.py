from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import tempfile
import os

router = APIRouter()

class TranscriptResponse(BaseModel):
    transcript: str
    language: str

@router.post("/voice", response_model=TranscriptResponse)
async def transcribe_voice(
    audio: UploadFile = File(...),
    language: str = "kn"
):
    try:
        import whisper
        model = whisper.load_model("tiny")

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".webm"
        ) as tmp:
            content = await audio.read()
            tmp.write(content)
            tmp_path = tmp.name

        result = model.transcribe(
            tmp_path,
            language=language if language != "kn" else None,
            task="transcribe"
        )
        os.unlink(tmp_path)

        return TranscriptResponse(
            transcript=result["text"].strip(),
            language=language
        )
    except Exception as e:
        return TranscriptResponse(
            transcript="",
            language=language
        )