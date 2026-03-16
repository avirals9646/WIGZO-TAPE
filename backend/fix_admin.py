import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def fix_admin_password():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Generate correct password hash
    password_hash = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    # Update admin user
    result = await db.users.update_one(
        {"email": "admin@wigzotape.com"},
        {"$set": {"password": password_hash}}
    )
    
    if result.modified_count > 0:
        print("✓ Admin password updated successfully!")
        print("Email: admin@wigzotape.com")
        print("Password: admin123")
    else:
        print("Admin user not found or already has correct password")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(fix_admin_password())
