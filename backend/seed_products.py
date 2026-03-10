import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_products():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if products already exist
    count = await db.products.count_documents({})
    if count > 0:
        print(f"Database already has {count} products. Skipping seed.")
        return
    
    products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Ultra Hold Wig Tape - 36 Pieces",
            "description": "Professional-grade double-sided tape for secure wig application. Waterproof and sweat-resistant formula provides up to 4-6 weeks of hold. Perfect for daily wear and active lifestyles.",
            "price": 599.00,
            "image_url": "https://images.unsplash.com/photo-1522839206838-1cfecf32cc72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 100,
            "features": [
                "Medical-grade adhesive",
                "4-6 weeks hold",
                "Waterproof & sweat-resistant",
                "36 pre-cut pieces"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Sensitive Skin Wig Tape - 24 Pieces",
            "description": "Hypoallergenic tape specially formulated for sensitive skin. Gentle yet secure hold for 2-3 weeks. Dermatologist tested and recommended for first-time wig users.",
            "price": 499.00,
            "image_url": "https://images.unsplash.com/photo-1612538498488-226257115cc4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 100,
            "features": [
                "Hypoallergenic formula",
                "2-3 weeks hold",
                "Dermatologist tested",
                "24 pre-cut pieces"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Professional Tape Roll - 3 Yards",
            "description": "Continuous roll of professional-grade wig tape for custom cutting. Ideal for salons and professional stylists. Premium adhesive with maximum flexibility.",
            "price": 899.00,
            "image_url": "https://images.unsplash.com/photo-1522839206838-1cfecf32cc72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 50,
            "features": [
                "3 yards continuous roll",
                "Professional grade",
                "Custom cutting",
                "Salon quality"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Extra Strong Hold Tape - 48 Pieces",
            "description": "Maximum strength adhesive for extended wear. Perfect for athletes and high-activity individuals. Provides secure hold for up to 6-8 weeks in all conditions.",
            "price": 799.00,
            "image_url": "https://images.unsplash.com/photo-1612538498488-226257115cc4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 80,
            "features": [
                "Maximum strength",
                "6-8 weeks hold",
                "Ideal for sports",
                "48 pre-cut pieces"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Mini Tape Strips - 72 Pieces",
            "description": "Small precision strips for frontal lace and detailed work. Perfect for natural hairline application. Easy to apply and remove.",
            "price": 449.00,
            "image_url": "https://images.unsplash.com/photo-1522839206838-1cfecf32cc72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 120,
            "features": [
                "Mini precision strips",
                "Perfect for lace frontals",
                "Natural hairline",
                "72 pieces"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Starter Kit - 12 Pieces + Remover",
            "description": "Perfect starter kit for beginners. Includes 12 tape pieces and gentle adhesive remover. Complete instructions included for easy application.",
            "price": 399.00,
            "image_url": "https://images.unsplash.com/photo-1612538498488-226257115cc4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHw0fHxkb3VibGUlMjBzaWRlZCUyMHRhcGUlMjByb2xsJTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc3MzExNDU2N3ww&ixlib=rb-4.1.0&q=85",
            "category": "wig-tape",
            "stock": 150,
            "features": [
                "Beginner friendly",
                "Includes remover",
                "Instructions included",
                "12 tape pieces"
            ],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Also create an admin user
    admin_user = {
        "id": str(uuid.uuid4()),
        "email": "admin@wigzotape.com",
        "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIl.Hlb.mK",  # password: admin123
        "name": "Admin",
        "is_admin": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.products.insert_many(products)
    
    # Check if admin exists
    existing_admin = await db.users.find_one({"email": "admin@wigzotape.com"})
    if not existing_admin:
        await db.users.insert_one(admin_user)
        print("Admin user created: admin@wigzotape.com / admin123")
    
    print(f"Successfully seeded {len(products)} products!")
    print("Admin login: admin@wigzotape.com / admin123")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_products())
