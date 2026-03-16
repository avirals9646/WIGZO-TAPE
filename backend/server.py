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
    subtotal: Optional[float] = None
    discount: float = 0
    coupon_code: Optional[str] = None
    total_amount: float
    status: str  # pending, paid, shipped, delivered, cancelled
    payment_id: Optional[str] = None
    shipping_address: dict
    created_at: str

class OrderCreate(BaseModel):
    items: List[dict]
    total_amount: float
    shipping_address: dict
    coupon_code: Optional[str] = None

class Coupon(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    code: str
    discount_type: str  # percentage or fixed
    discount_value: float
    min_purchase: float = 0
    max_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    used_count: int = 0
    valid_from: str
    valid_until: str
    is_active: bool = True
    created_at: str

class CouponCreate(BaseModel):
    code: str
    discount_type: str
    discount_value: float
    min_purchase: float = 0
    max_discount: Optional[float] = None
    usage_limit: Optional[int] = None
    valid_from: str
    valid_until: str

class CouponValidate(BaseModel):
    code: str
    order_amount: float

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
    discount = 0
    coupon_code = None
    
    # Apply coupon if provided
    if order_data.coupon_code:
        try:
            validate_result = await validate_coupon({
                'code': order_data.coupon_code, 
                'order_amount': order_data.total_amount
            })
            discount = validate_result['discount']
            coupon_code = order_data.coupon_code.upper()
            
            # Increment coupon usage
            await db.coupons.update_one(
                {"code": coupon_code},
                {"$inc": {"used_count": 1}}
            )
        except HTTPException:
            raise
    
    final_amount = order_data.total_amount - discount
    
    order_id = str(uuid.uuid4())
    order_doc = {
        "id": order_id,
        "user_id": user.id,
        "items": order_data.items,
        "subtotal": order_data.total_amount,
        "discount": discount,
        "coupon_code": coupon_code,
        "total_amount": final_amount,
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


# ============ COUPON ROUTES ============

@api_router.post("/coupons/validate")
async def validate_coupon(coupon_data: dict):
    """Validate a coupon code"""
    coupon = await db.coupons.find_one({"code": coupon_data['code'].upper()}, {"_id": 0})
    
    if not coupon:
        raise HTTPException(status_code=404, detail="Invalid coupon code")
    
    if not coupon.get('is_active'):
        raise HTTPException(status_code=400, detail="Coupon is no longer active")
    
    # Check if coupon is within valid date range
    now = datetime.now(timezone.utc)
    valid_from = datetime.fromisoformat(coupon['valid_from'])
    valid_until = datetime.fromisoformat(coupon['valid_until'])
    
    if now < valid_from or now > valid_until:
        raise HTTPException(status_code=400, detail="Coupon has expired or not yet valid")
    
    # Check usage limit
    if coupon.get('usage_limit') and coupon.get('used_count', 0) >= coupon['usage_limit']:
        raise HTTPException(status_code=400, detail="Coupon usage limit reached")
    
    # Check minimum purchase
    if coupon_data['order_amount'] < coupon.get('min_purchase', 0):
        raise HTTPException(
            status_code=400, 
            detail=f"Minimum purchase of ₹{coupon['min_purchase']} required"
        )
    
    # Calculate discount
    if coupon['discount_type'] == 'percentage':
        discount = (coupon_data['order_amount'] * coupon['discount_value']) / 100
        if coupon.get('max_discount'):
            discount = min(discount, coupon['max_discount'])
    else:  # fixed
        discount = coupon['discount_value']
    
    discount = min(discount, coupon_data['order_amount'])  # Can't discount more than total
    
    return {
        "valid": True,
        "discount": discount,
        "final_amount": coupon_data['order_amount'] - discount,
        "coupon_details": {
            "code": coupon['code'],
            "discount_type": coupon['discount_type'],
            "discount_value": coupon['discount_value']
        }
    }

@api_router.get("/coupons/public")
async def get_public_coupons():
    """Get all active public coupons"""
    now = datetime.now(timezone.utc).isoformat()
    coupons = await db.coupons.find({
        "is_active": True,
        "valid_from": {"$lte": now},
        "valid_until": {"$gte": now}
    }, {"_id": 0}).to_list(100)
    return coupons


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, user: User = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": user.id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

# ============ ADMIN ROUTES ============

@api_router.get("/admin/users")
async def get_all_users(admin: User = Depends(get_admin_user)):
    """Get all users with encrypted passwords (admin only)"""
    users = await db.users.find({}, {"_id": 0}).to_list(1000)
    # Return users with password shown as encrypted
    for user in users:
        if 'password' in user:
            user['password'] = '••••••••' + user['password'][-8:]  # Show last 8 chars of hash
    return users

@api_router.delete("/admin/users/{user_id}")
async def delete_user(user_id: str, admin: User = Depends(get_admin_user)):
    """Delete a user (admin only)"""
    # Prevent admin from deleting themselves
    if user_id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")
    
    result = await db.users.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Also delete user's cart and orders
    await db.carts.delete_many({"user_id": user_id})
    
    return {"message": "User deleted successfully"}

@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(admin: User = Depends(get_admin_user)):
    """Get all orders from all users (admin only)"""
    orders = await db.orders.find({}, {"_id": 0}).to_list(1000)
    return orders

@api_router.get("/admin/orders/{order_id}", response_model=Order)
async def get_order_detail(order_id: str, admin: User = Depends(get_admin_user)):
    """Get detailed order information (admin only)"""
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@api_router.put("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status: dict, admin: User = Depends(get_admin_user)):
    """Update order status (admin only)"""
    valid_statuses = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"]
    if status.get('status') not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    
    result = await db.orders.update_one({"id": order_id}, {"$set": {"status": status['status']}})

@api_router.get("/admin/coupons")
async def get_all_coupons(admin: User = Depends(get_admin_user)):
    """Get all coupons (admin only)"""
    coupons = await db.coupons.find({}, {"_id": 0}).to_list(1000)
    return coupons

@api_router.post("/admin/coupons")
async def create_coupon(coupon_data: dict, admin: User = Depends(get_admin_user)):
    """Create a new coupon (admin only)"""
    # Check if code already exists
    existing = await db.coupons.find_one({"code": coupon_data['code'].upper()})
    if existing:
        raise HTTPException(status_code=400, detail="Coupon code already exists")
    
    coupon_id = str(uuid.uuid4())
    coupon_doc = {
        "id": coupon_id,
        "code": coupon_data['code'].upper(),
        "discount_type": coupon_data['discount_type'],
        "discount_value": float(coupon_data['discount_value']),
        "min_purchase": float(coupon_data.get('min_purchase', 0)),
        "max_discount": float(coupon_data['max_discount']) if coupon_data.get('max_discount') else None,
        "usage_limit": int(coupon_data['usage_limit']) if coupon_data.get('usage_limit') else None,
        "used_count": 0,
        "valid_from": coupon_data['valid_from'],
        "valid_until": coupon_data['valid_until'],
        "is_active": coupon_data.get('is_active', True),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.coupons.insert_one(coupon_doc)
    return coupon_doc

@api_router.put("/admin/coupons/{coupon_id}")
async def update_coupon(coupon_id: str, coupon_data: dict, admin: User = Depends(get_admin_user)):
    """Update a coupon (admin only)"""
    update_data = {}
    if 'is_active' in coupon_data:
        update_data['is_active'] = coupon_data['is_active']
    if 'usage_limit' in coupon_data:
        update_data['usage_limit'] = int(coupon_data['usage_limit']) if coupon_data['usage_limit'] else None
    if 'valid_until' in coupon_data:
        update_data['valid_until'] = coupon_data['valid_until']
    
    if update_data:
        result = await db.coupons.update_one({"id": coupon_id}, {"$set": update_data})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Coupon not found")
    
    updated_coupon = await db.coupons.find_one({"id": coupon_id}, {"_id": 0})
    return updated_coupon

@api_router.delete("/admin/coupons/{coupon_id}")
async def delete_coupon(coupon_id: str, admin: User = Depends(get_admin_user)):
    """Delete a coupon (admin only)"""
    result = await db.coupons.delete_one({"id": coupon_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Coupon not found")
    return {"message": "Coupon deleted successfully"}

@api_router.post("/admin/coupons/generate")
async def generate_coupon_code(admin: User = Depends(get_admin_user)):
    """Generate a random coupon code (admin only)"""
    import random
    import string
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    # Check if it exists
    while await db.coupons.find_one({"code": code}):
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return {"code": code}


    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated"}

@api_router.put("/admin/orders/{order_id}")
async def update_order(order_id: str, order_update: dict, admin: User = Depends(get_admin_user)):
    """Update order details (admin only)"""
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Allow updating shipping address and status
    update_data = {}
    if 'shipping_address' in order_update:
        update_data['shipping_address'] = order_update['shipping_address']
    if 'status' in order_update:
        update_data['status'] = order_update['status']
    if 'items' in order_update:
        update_data['items'] = order_update['items']
    if 'total_amount' in order_update:
        update_data['total_amount'] = order_update['total_amount']
    
    if update_data:
        await db.orders.update_one({"id": order_id}, {"$set": update_data})
    
    updated_order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    return updated_order

@api_router.get("/admin/stats")
async def get_admin_stats(admin: User = Depends(get_admin_user)):
    """Get dashboard statistics (admin only)"""
    total_users = await db.users.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_products = await db.products.count_documents({})
    
    # Calculate total revenue
    orders = await db.orders.find({"status": {"$in": ["paid", "processing", "shipped", "delivered"]}}).to_list(1000)
    total_revenue = sum(order.get('total_amount', 0) for order in orders)
    
    # Recent orders
    recent_orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).limit(5).to_list(5)
    
    return {
        "total_users": total_users,
        "total_orders": total_orders,
        "total_products": total_products,
        "total_revenue": total_revenue,
        "recent_orders": recent_orders
    }

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