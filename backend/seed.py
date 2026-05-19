from utils.db import get_db
import datetime

listings = [
    {"title": "Mahindra 475 Tractor", "category": "equipment",
     "price": 800, "unit": "per day", "description": "Well maintained 47HP tractor with cultivator. Available Oct-Jan.",
     "farmer_name": "Rajesh Kumar", "location": "Dharwad", "contact": "9845012345", "image_url": ""},
    {"title": "Paddy Seeds — Jyothi Variety", "category": "seeds",
     "price": 45, "unit": "per kg", "description": "Certified Jyothi paddy seeds. High yield, disease resistant. 50kg bags available.",
     "farmer_name": "Venkatesh Naik", "location": "Shivamogga", "contact": "9741023456", "image_url": ""},
    {"title": "1 Acre Agricultural Land for Rent", "category": "land",
     "price": 8000, "unit": "per season", "description": "Fertile red soil, bore well facility, road access. Near Hubli.",
     "farmer_name": "Siddappa Patil", "location": "Hubli", "contact": "9632145678", "image_url": ""},
    {"title": "Power Sprayer", "category": "equipment",
     "price": 200, "unit": "per day", "description": "Battery-powered knapsack sprayer, 16 litre capacity.",
     "farmer_name": "Manjunath B", "location": "Hassan", "contact": "9980134567", "image_url": ""},
    {"title": "Organic Vermicompost", "category": "fertilizer",
     "price": 8, "unit": "per kg", "description": "Pure vermicompost, ready to use. Minimum 100kg order. Free delivery within 20km.",
     "farmer_name": "Kavitha Devi", "location": "Mysuru", "contact": "8971023456", "image_url": ""},
    {"title": "Drip Irrigation Set (1 acre)", "category": "equipment",
     "price": 500, "unit": "per season", "description": "Complete drip irrigation setup for 1 acre. Includes main line, sub-main, drippers.",
     "farmer_name": "Ibrahim Khan", "location": "Vijayapura", "contact": "9448912345", "image_url": ""},
    {"title": "Neem Cake — 50kg Bags", "category": "fertilizer",
     "price": 12, "unit": "per kg", "description": "Cold-pressed neem cake. Excellent soil conditioner and natural pesticide.",
     "farmer_name": "Suresh Gowda", "location": "Mandya", "contact": "9845678901", "image_url": ""},
    {"title": "Harvesting Labour — 10 Workers", "category": "labour",
     "price": 400, "unit": "per person per day", "description": "Experienced paddy harvesting team. Available November-December.",
     "farmer_name": "Lakshmi Bai", "location": "Raichur", "contact": "9741234567", "image_url": ""},
]

if __name__ == "__main__":
    db = get_db()
    db.listings.delete_many({})
    for l in listings:
        l["created_at"] = datetime.datetime.utcnow()
    db.listings.insert_many(listings)
    print(f"Seeded {len(listings)} listings successfully")