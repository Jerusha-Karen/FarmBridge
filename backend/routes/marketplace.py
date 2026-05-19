from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.db import get_db
from bson import ObjectId
from typing import Optional
import datetime

router = APIRouter()

class ListingCreate(BaseModel):
    title: str
    category: str
    price: float
    unit: str
    description: str
    farmer_name: str
    location: str
    contact: str
    image_url: Optional[str] = ""

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.get("/marketplace")
async def get_listings(category: Optional[str] = None):
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    listings = list(db.listings.find(query).sort("created_at", -1).limit(20))
    return [serialize(l) for l in listings]

@router.post("/marketplace")
async def create_listing(listing: ListingCreate):
    db = get_db()
    doc = listing.dict()
    doc["created_at"] = datetime.datetime.utcnow()
    result = db.listings.insert_one(doc)
    return {"id": str(result.inserted_id), "message": "Listing created successfully"}