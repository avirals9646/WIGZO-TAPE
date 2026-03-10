from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import base64
from io import BytesIO

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

security = HTTPBearer()

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    name: str
    is_admin: bool = False
    created_at: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    description: str
    price: float
    image_url: str
    category: str = "wig-tape"
    stock: int = 100
    features: List[str] = []
    created_at: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    category: str = "wig-tape"
    stock: int = 100
    features: List[str] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    features: Optional[List[str]] = None

class CartItem(BaseModel):
    product_id: str
    quantity: int

class Cart(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    items: List[CartItem]
    updated_at: str

class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    items: List[dict]
    total_amount: float
    status: str  # pending, paid, shipped, delivered, cancelled
    payment_id: Optional[str] = None
    shipping_address: dict
    created_at: str

class OrderCreate(BaseModel):
    items: List[dict]
    total_amount: float
    shipping_address: dict

# ============ AUTH HELPERS ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str, is_admin: bool = False) -> str:
    payload = {
        'user_id': user_id,
        'is_admin': is_admin,
        'exp': datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = decode_token(credentials.credentials)
    user = await db.users.find_one({"id": payload['user_id']}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

async def get_admin_user(user: User = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ============ AUTH ROUTES ============

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "name": user_data.name,
        "is_admin": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    token = create_token(user_id, False)
    return {"token": token, "user": {"id": user_id, "email": user_data.email, "name": user_data.name, "is_admin": False}}

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(user['id'], user.get('is_admin', False))
    return {
        "token": token,
        "user": {
            "id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "is_admin": user.get('is_admin', False)
        }
    }

@api_router.get("/auth/me", response_model=User)
async def get_me(user: User = Depends(get_current_user)):
    return user

# ============ PRODUCT ROUTES ============

@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find({}, {"_id": 0}).to_list(1000)
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, admin: User = Depends(get_admin_user)):
    product_id = str(uuid.uuid4())
    product_doc = {
        "id": product_id,
        **product_data.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.products.insert_one(product_doc)
    return Product(**product_doc)

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductUpdate, admin: User = Depends(get_admin_user)):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in product_data.model_dump().items() if v is not None}
    if update_data:
        await db.products.update_one({"id": product_id}, {"$set": update_data})
    
    updated_product = await db.products.find_one({"id": product_id}, {"_id": 0})
    return Product(**updated_product)

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: User = Depends(get_admin_user)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted"}

@api_router.post("/products/upload-image")
async def upload_image(file: UploadFile = File(...), admin: User = Depends(get_admin_user)):
    # Read file and convert to base64 data URL
    contents = await file.read()
    base64_encoded = base64.b64encode(contents).decode('utf-8')
    data_url = f"data:{file.content_type};base64,{base64_encoded}"
    return {"image_url": data_url}

# ============ CART ROUTES ============

@api_router.get("/cart")
async def get_cart(user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user.id}, {"_id": 0})
    if not cart:
        cart = {
            "id": str(uuid.uuid4()),
            "user_id": user.id,
            "items": [],
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.carts.insert_one(cart)
    return cart

@api_router.post("/cart/add")
async def add_to_cart(item: CartItem, user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user.id}, {"_id": 0})
    if not cart:
        cart = {
            "id": str(uuid.uuid4()),
            "user_id": user.id,
            "items": [],
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.carts.insert_one(cart)
    
    # Check if product exists
    product = await db.products.find_one({"id": item.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Update or add item
    items = cart.get('items', [])
    found = False
    for cart_item in items:
        if cart_item['product_id'] == item.product_id:
            cart_item['quantity'] += item.quantity
            found = True
            break
    
    if not found:
        items.append({"product_id": item.product_id, "quantity": item.quantity})
    
    await db.carts.update_one(
        {"user_id": user.id},
        {"$set": {"items": items, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"message": "Item added to cart"}

@api_router.put("/cart/update")
async def update_cart_item(item: CartItem, user: User = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": user.id}, {"_id": 0})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get('items', [])
    for cart_item in items:
        if cart_item['product_id'] == item.product_id:
            if item.quantity <= 0:
                items.remove(cart_item)
            else:
                cart_item['quantity'] = item.quantity
            break
    
    await db.carts.update_one(
        {"user_id": user.id},
        {"$set": {"items": items, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"message": "Cart updated"}

@api_router.delete("/cart/clear")
async def clear_cart(user: User = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": user.id},
        {"$set": {"items": [], "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    return {"message": "Cart cleared"}

# ============ ORDER ROUTES ============

@api_router.post("/orders/create", response_model=Order)
async def create_order(order_data: OrderCreate, user: User = Depends(get_current_user)):
    order_id = str(uuid.uuid4())
    order_doc = {
        "id": order_id,
        "user_id": user.id,
        "items": order_data.items,
        "total_amount": order_data.total_amount,
        "status": "pending",
        "payment_id": None,
        "shipping_address": order_data.shipping_address,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.orders.insert_one(order_doc)
    
    # Clear cart after order
    await db.carts.update_one({"user_id": user.id}, {"$set": {"items": []}})
    
    return Order(**order_doc)

@api_router.post("/orders/{order_id}/payment")
async def process_payment(order_id: str, payment_data: dict, user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": user.id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Dummy payment - in real scenario, verify with Razorpay
    payment_id = f"pay_dummy_{uuid.uuid4().hex[:12]}"
    
    await db.orders.update_one(
        {"id": order_id},
        {"$set": {"status": "paid", "payment_id": payment_id}}
    )
    
    return {"message": "Payment successful", "payment_id": payment_id}

@api_router.get("/orders", response_model=List[Order])
async def get_orders(user: User = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": user.id}, {"_id": 0}).to_list(1000)
    return orders

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": user.id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ============ ADMIN ROUTES ============

@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(admin: User = Depends(get_admin_user)):
    orders = await db.orders.find({}, {"_id": 0}).to_list(1000)
    return orders

@api_router.put("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status: dict, admin: User = Depends(get_admin_user)):
    result = await db.orders.update_one({"id": order_id}, {"$set": {"status": status['status']}})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated"}

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()