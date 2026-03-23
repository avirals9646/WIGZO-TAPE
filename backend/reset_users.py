import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path
import uuid
from datetime import datetime, timezone
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'wigzo_tape_db')

async def reset_admin():
    """Reset admin user with correct password"""
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print(f"Connecting to MongoDB at: {mongo_url}")
    print(f"Database: {db_name}")
    
    # Delete existing admin user
    result = await db.users.delete_many({"email": "admin@wigzotape.com"})
    print(f"Deleted {result.deleted_count} existing admin users")
    
    # Create new admin user with properly hashed password
    password = "admin123"
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    admin_user = {
        "id": str(uuid.uuid4()),
        "email": "admin@wigzotape.com",
        "password": password_hash,
        "name": "Admin",
        "is_admin": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(admin_user)
    
    print("\n✅ Admin user created successfully!")
    print("=" * 50)
    print("Admin Login Credentials:")
    print("  Email: admin@wigzotape.com")
    print("  Password: admin123")
    print("=" * 50)
    
    # Also create a test regular user
    test_password = "test123"
    test_hash = bcrypt.hashpw(test_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    test_user = {
        "id": str(uuid.uuid4()),
        "email": "test@wigzotape.com",
        "password": test_hash,
        "name": "Test User",
        "is_admin": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    # Delete existing test user if any
    await db.users.delete_many({"email": "test@wigzotape.com"})
    await db.users.insert_one(test_user)
    
    print("\n✅ Test user created successfully!")
    print("=" * 50)
    print("Test User Login Credentials:")
    print("  Email: test@wigzotape.com")
    print("  Password: test123")
    print("=" * 50)
    
    # Verify users
    user_count = await db.users.count_documents({})
    print(f"\nTotal users in database: {user_count}")
    
    client.close()

if __name__ == "__main__":
    print("\n🔧 Resetting Admin and Test Users...\n")
    asyncio.run(reset_admin())
    print("\n✅ Done! You can now login with the credentials above.\n")
