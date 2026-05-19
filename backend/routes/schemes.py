from fastapi import APIRouter
from pydantic import BaseModel
from rag.pipeline import get_scheme_recommendations

router = APIRouter()

class SchemeRequest(BaseModel):
    crop: str
    land_size: float
    annual_income: int
    category: str
    state: str = "Karnataka"

class SchemeResponse(BaseModel):
    recommendations: str

@router.post("/schemes", response_model=SchemeResponse)
async def schemes(request: SchemeRequest):
    result = get_scheme_recommendations(
        crop=request.crop,
        land_size=request.land_size,
        annual_income=request.annual_income,
        category=request.category,
        state=request.state
    )
    return SchemeResponse(recommendations=result)