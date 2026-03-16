import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_coupons():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if FIRSTTIME coupon already exists
    existing = await db.coupons.find_one({"code": "FIRSTTIME"})
    if existing:
        print("FIRSTTIME coupon already exists")
        client.close()
        return
    
    # Create FIRSTTIME coupon
    coupon = {
        "id": str(uuid.uuid4()),
        "code": "FIRSTTIME",
        "discount_type": "percentage",
        "discount_value": 20.0,
        "min_purchase": 0,
        "max_discount": None,
        "usage_limit": None,  # Unlimited
        "used_count": 0,
        "valid_from": datetime.now(timezone.utc).isoformat(),
        "valid_until": (datetime.now(timezone.utc) + timedelta(days=365)).isoformat(),
        "is_active": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.coupons.insert_one(coupon)
    print("✓ FIRSTTIME coupon created successfully!")
    print("  Code: FIRSTTIME")
    print("  Discount: 20%")
    print("  Valid for: 1 year")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_coupons())
