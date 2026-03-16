# Wigzo Tape - Complete Ecommerce Platform

![Wigzo Tape Logo](https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg)

A modern, full-featured ecommerce platform for selling premium wig tape products. Built with React, FastAPI, and MongoDB with comprehensive admin controls, coupon system, blog platform, and customer engagement features.

## ✨ Complete Feature List

### 🎯 Core Ecommerce Features
- **User Authentication**: JWT-based secure login and registration
- **Product Catalog**: Browse 15+ wig tape varieties with detailed information
- **Shopping Cart**: Real-time cart updates with add/remove/update functionality
- **Checkout System**: Integrated Razorpay payment (dummy mode + real integration ready)
- **Order Management**: Track order history with detailed status updates
- **Responsive Design**: Mobile-first, bold modern design with teal (#17847c) and black theme

### 💰 Advanced Coupon System
- **Coupon Creation**: Admin can create percentage or fixed-amount coupons
- **Smart Validation**: Min purchase requirements, max discount caps, usage limits
- **Apply at Checkout**: Real-time discount calculation with coupon codes
- **Auto-generated Codes**: Random coupon code generator for admins
- **Usage Tracking**: Monitor coupon usage with detailed statistics
- **Pre-loaded Coupon**: FIRSTTIME (20% off, unlimited usage, 1-year validity)

### 🎨 Marketing & Engagement
- **Flash Banner**: Prominent top banner with FIRSTTIME 20% discount coupon (closeable, animated)
- **New User Popup**: Welcome popup offering 10% OFF for first-time visitors (shows once)
- **Auto-rotating Carousel**: Homepage hero with 3 professional slides (4-second intervals)
- **Email Notifications**: 
  - Welcome email on login
  - Order confirmation with full details
  - Contact form auto-replies
  - Admin response emails

### 📝 Blog & Content Platform
- **Public Blog Listing**: Anyone can read articles
- **User-Generated Content**: Logged-in users can write and publish articles
- **Blog Management**: Admin can delete any blog post
- **Author Attribution**: Each blog shows author name and publish date
- **Clean Layout**: Beautiful card-based design with hover effects

### 📞 Customer Support System
- **Contact Form**: Complete form with Name, Email, Phone, Address, Feedback
- **Admin Dashboard**: View all contact submissions with status tracking
- **Reply System**: Admin can reply directly to customer inquiries
- **Email Integration**: Automatic confirmation and reply emails sent to customers
- **Status Tracking**: Pending/Replied status for each submission

### 🎛️ Comprehensive Admin Panel (6 Tabs)

#### 1. Products Management
- Add, edit, and delete products
- Image upload functionality (base64 encoding)
- Manage inventory and stock levels
- Product features and descriptions
- Category management

#### 2. Orders Management
- View all customer orders with full details
- Update order status (pending → paid → processing → shipped → delivered → cancelled)
- View customer shipping information
- Track order items and pricing
- Coupon discount visibility

#### 3. Users Management
- View complete user database
- See encrypted password hashes (security display)
- Delete users (with automatic cart/order cleanup)
- Distinguish admin vs regular users
- Track user creation dates

#### 4. Coupons Management
- Create new coupons with detailed settings
- Generate random coupon codes
- Set discount type (percentage/fixed)
- Configure min purchase and max discount
- Set usage limits and validity periods
- Activate/deactivate coupons
- Track usage statistics

#### 5. Blogs Management
- View all published blogs
- Delete inappropriate or outdated content
- Monitor user-generated content
- See author and publication dates

#### 6. Contact Forms Management
- View all customer inquiries
- Reply to submissions with custom messages
- Track status (pending/replied)
- Delete old submissions
- Full customer details (name, email, phone, address)

### 📊 Dashboard Statistics
- Total users count
- Total orders count
- Total products in catalog
- Total revenue calculation
- Recent orders summary

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM v6
- Tailwind CSS
- Shadcn/UI Components (with custom configuration)
- Axios for API calls
- Lucide React for icons
- Embla Carousel with Autoplay
- Sonner for toast notifications

### Backend
- FastAPI (Python)
- Motor (Async MongoDB driver)
- PyJWT for authentication
- Bcrypt for password hashing
- Python Multipart for file uploads
- Razorpay SDK
- Email service (SMTP ready)

### Database
- MongoDB with async operations

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your Windows machine:

- **Python 3.11+**: [Download Python](https://www.python.org/downloads/)
- **Node.js 18+**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **Git**: [Download Git](https://git-scm.com/download/win)
- **Yarn**: Install after Node.js with `npm install -g yarn`

## 🚀 Installation (Windows)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-name>
```

### Step 2: Setup MongoDB

1. Install MongoDB Community Server
2. Start MongoDB service:
   ```bash
   # Open Command Prompt as Administrator
   net start MongoDB
   ```
3. MongoDB will run on default port `27017`

### Step 3: Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # For Command Prompt
   venv\Scripts\activate.bat
   
   # For PowerShell
   venv\Scripts\Activate.ps1
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create `.env` file in the backend folder:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=wigzo_tape_db
   CORS_ORIGINS=http://localhost:3000
   JWT_SECRET=your-secret-key-change-in-production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=noreply@wigzotape.com
   ```

6. Seed the database with initial data:
   ```bash
   # Seed products
   python seed_products.py
   
   # Seed coupons
   python seed_coupons.py
   ```

7. Start the backend server:
   ```bash
   uvicorn server:app --reload --host 0.0.0.0 --port 8001
   ```

Backend will run on `http://localhost:8001`

### Step 4: Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create `.env` file in the frontend folder:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```

4. Start the frontend development server:
   ```bash
   yarn start
   ```

Frontend will run on `http://localhost:3000`

### Step 5: Access the Application

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001/docs (Interactive API documentation)

## 👤 Default Credentials

### Admin Account
- **Email**: admin@wigzotape.com
- **Password**: admin123

Use these credentials to access:
- Admin panel at `/admin`
- Full product, order, user, coupon, blog, and contact management

### Pre-loaded Coupon
- **Code**: FIRSTTIME
- **Discount**: 20% off
- **Usage**: Unlimited
- **Validity**: 1 year from seeding

## 📱 Application Pages & Routes

### Public Pages
- `/` - Homepage with carousel and featured products
- `/products` - Complete product catalog
- `/products/:id` - Individual product details
- `/blogs` - Blog listing page (all articles)
- `/blogs/:id` - Individual blog article
- `/about` - About us page with company story
- `/contact` - Contact form page

### Authenticated Pages
- `/login` - User login/registration
- `/cart` - Shopping cart (requires login)
- `/checkout` - Checkout with coupon application (requires login)
- `/dashboard` - User dashboard with order history (requires login)
- `/blogs/create` - Write new blog article (requires login)

### Admin Pages
- `/admin` - Admin panel with 6 management tabs (requires admin role)

## 🎯 Usage Guide

### Customer Flow
1. **Browse Products**: View homepage carousel and featured products
2. **See Promotions**: Notice banner with FIRSTTIME 20% discount
3. **Welcome Popup**: First-time visitors see 10% off popup
4. **Register/Login**: Create account to start shopping
5. **Add to Cart**: Select products and add to cart
6. **Apply Coupon**: Use FIRSTTIME code at checkout for 20% discount
7. **Complete Order**: Fill shipping details and complete payment
8. **Email Confirmation**: Receive order confirmation via email
9. **Write Blog**: Share your experience on the blog page
10. **Contact Support**: Submit inquiries via contact form
11. **Track Orders**: View order history and status in dashboard

### Admin Flow
1. **Login**: Use admin credentials
2. **Dashboard Stats**: View key metrics at a glance
3. **Manage Products**: 
   - Add new wig tape products with images
   - Edit product details and stock
   - Delete discontinued products
4. **Manage Orders**:
   - View all customer orders
   - Update order status (paid → processing → shipped → delivered)
   - Track customer details
5. **Manage Users**:
   - View all registered users
   - See encrypted passwords (for security verification)
   - Delete spam or inactive accounts
6. **Manage Coupons**:
   - Create seasonal promotions
   - Generate random coupon codes
   - Set discount rules and limits
   - Monitor usage statistics
   - Activate/deactivate coupons
7. **Manage Blogs**:
   - Review user-submitted articles
   - Delete inappropriate content
8. **Manage Contact Forms**:
   - View customer inquiries
   - Reply to questions (auto-sends email)
   - Track resolution status

## 📂 Project Structure

```
├── backend/
│   ├── server.py              # Main FastAPI application with all routes
│   ├── seed_products.py       # Database seeding script for products
│   ├── seed_coupons.py        # Database seeding script for coupons
│   ├── fix_admin.py           # Admin password fix utility
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (create manually)
│   └── .env.example           # Environment variables template
│
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.js      # Navigation header
│   │   │   ├── Footer.js      # Footer with logo
│   │   │   ├── Banner.js      # Promotional banner
│   │   │   ├── NewUserPopup.js # Welcome popup
│   │   │   ├── HomeCarousel.js # Homepage carousel
│   │   │   ├── ProductCard.js  # Product display card
│   │   │   └── ui/            # Shadcn UI components
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js        # Homepage with carousel
│   │   │   ├── Products.js    # Product listing
│   │   │   ├── ProductDetail.js # Product details
│   │   │   ├── Cart.js        # Shopping cart
│   │   │   ├── Checkout.js    # Checkout with coupons
│   │   │   ├── Dashboard.js   # User dashboard
│   │   │   ├── Login.js       # Authentication
│   │   │   ├── Admin.js       # Admin panel (6 tabs)
│   │   │   ├── About.js       # About page
│   │   │   ├── Blogs.js       # Blog listing
│   │   │   ├── CreateBlog.js  # Write blog
│   │   │   ├── BlogDetail.js  # Blog article view
│   │   │   └── Contact.js     # Contact form
│   │   ├── App.js             # Main app with routing
│   │   ├── api.js             # Axios configuration
│   │   ├── AuthContext.js     # Authentication state
│   │   ├── CartContext.js     # Cart state management
│   │   ├── App.css            # Component styles
│   │   └── index.css          # Global styles with design tokens
│   ├── package.json           # Node dependencies
│   └── .env                   # Environment variables (create manually)
│
└── README.md                  # This file
```

## 🔧 Configuration

### Backend Environment Variables

Edit `backend/.env`:
```env
MONGO_URL=mongodb://localhost:27017          # MongoDB connection
DB_NAME=wigzo_tape_db                        # Database name
JWT_SECRET=your-secret-key                   # JWT signing key
CORS_ORIGINS=http://localhost:3000          # Allowed origins
SMTP_HOST=smtp.gmail.com                     # Email server
SMTP_PORT=587                                # SMTP port
SMTP_USER=your-email@gmail.com              # Email username
SMTP_PASSWORD=your-app-password              # Email password
SMTP_FROM=noreply@wigzotape.com             # From address
```

### Frontend Environment Variables

Edit `frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:8001  # Backend API URL
```

### Email Configuration (Optional)

To enable real email notifications:

1. For Gmail:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use app password in SMTP_PASSWORD

2. For other providers:
   - Update SMTP_HOST and SMTP_PORT
   - Provide credentials in SMTP_USER and SMTP_PASSWORD

**Note**: Without SMTP configuration, emails will be logged to the backend console.

## 🎨 Design System

### Brand Colors
- **Primary**: Teal `#17847c` - Used for CTAs, links, accents
- **Secondary**: Black `#000000` - Used for text, borders, headers
- **Background**: White `#FFFFFF` - Clean, professional
- **Accent**: Light Teal `#F0FDFD` - Highlights and info boxes

### Typography
- **Headings**: Oswald (bold, uppercase, tracking-wider)
- **Body**: Manrope (400-700 weights)
- **Style**: Bold modern minimalist

### Design Features
- Sharp edges (`rounded-none` on most elements)
- Uppercase headings for impact
- Hover transitions (300ms ease)
- Micro-animations on interactions
- Grain texture overlays
- Glass-morphism effects

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (sends welcome email)
- `POST /api/auth/login` - Login user (sends welcome email)
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)
- `POST /api/products/upload-image` - Upload product image (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create order (with coupon support, sends email)
- `GET /api/orders` - Get user orders
- `GET /api/orders/{id}` - Get order details
- `POST /api/orders/{id}/payment` - Process payment

### Coupons
- `POST /api/coupons/validate` - Validate coupon code
- `GET /api/coupons/public` - Get active coupons
- `GET /api/admin/coupons` - List all coupons (admin)
- `POST /api/admin/coupons` - Create coupon (admin)
- `PUT /api/admin/coupons/{id}` - Update coupon (admin)
- `DELETE /api/admin/coupons/{id}` - Delete coupon (admin)
- `POST /api/admin/coupons/generate` - Generate random code (admin)

### Blogs
- `GET /api/blogs` - List all blogs (public)
- `GET /api/blogs/{id}` - Get blog details (public)
- `POST /api/blogs/create` - Create blog (authenticated)
- `DELETE /api/admin/blogs/{id}` - Delete blog (admin)

### Contact Forms
- `POST /api/contact/submit` - Submit contact form (sends confirmation email)
- `GET /api/admin/contact-forms` - List all submissions (admin)
- `POST /api/admin/contact-forms/{id}/reply` - Reply to form (admin, sends email)
- `DELETE /api/admin/contact-forms/{id}` - Delete submission (admin)

### Admin
- `GET /api/admin/users` - List all users (admin)
- `DELETE /api/admin/users/{id}` - Delete user (admin)
- `GET /api/admin/orders` - List all orders (admin)
- `PUT /api/admin/orders/{id}/status` - Update order status (admin)
- `PUT /api/admin/orders/{id}` - Update order details (admin)
- `GET /api/admin/stats` - Get dashboard statistics (admin)

Full interactive API documentation: http://localhost:8001/docs

## 💳 Payment Integration

### Current Setup (Dummy Mode)
- Razorpay SDK installed
- Dummy payment flow for testing
- Order creation and tracking functional
- Payment confirmation via browser alert

### Production Setup
To enable real Razorpay payments:

1. Get API keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Add to `backend/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```
3. Update `frontend/src/pages/Checkout.js`:
   - Replace dummy payment with Razorpay integration
   - Use Razorpay checkout modal
   - Verify payment signatures

## 📧 Email System

### Current Status
- Email service configured and ready
- Currently logs to backend console
- All email triggers functional:
  - User login/registration
  - Order confirmation
  - Contact form confirmation
  - Admin replies

### Email Templates Included
1. **Welcome Email**: Sent on login
2. **Order Confirmation**: Includes items, pricing, discount, shipping details
3. **Contact Confirmation**: Acknowledges receipt of inquiry
4. **Admin Reply**: Sends admin response to customer

### Enable Real Emails
Add SMTP credentials to `backend/.env` and uncomment email sending code in `server.py`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running: `net start MongoDB`
- Check MongoDB is running on port 27017
- Verify MONGO_URL in backend/.env

### Backend Not Starting
- Ensure Python virtual environment is activated
- Install all dependencies: `pip install -r requirements.txt`
- Check port 8001 is not in use
- Review backend logs for errors

### Frontend Not Starting
- Delete `node_modules` and reinstall: `yarn install`
- Clear cache: `yarn cache clean`
- Check port 3000 is not in use
- Ensure REACT_APP_BACKEND_URL is correct

### CORS Errors
- Ensure CORS_ORIGINS in backend/.env includes frontend URL
- Restart backend server after changing .env
- Check browser console for specific CORS messages

### Coupon Not Applying
- Check coupon is active in admin panel
- Verify validity dates
- Ensure minimum purchase requirement is met
- Check usage limit hasn't been reached

### Email Not Sending
- Verify SMTP credentials in backend/.env
- Check backend console logs for email content
- Enable less secure apps (for Gmail)
- Use app-specific password (for Gmail with 2FA)

### Images Not Uploading
- Check file size (large files may take time)
- Ensure file is valid image format (JPG, PNG, WEBP)
- Review backend logs for upload errors
- Verify admin is logged in

## 🚀 Deployment

### Backend Deployment
1. Choose a hosting service (Heroku, Railway, Render, AWS, etc.)
2. Update MONGO_URL to production MongoDB (MongoDB Atlas recommended)
3. Set all environment variables in hosting platform
4. Use production-grade WSGI server (Gunicorn):
   ```bash
   gunicorn server:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
   ```
5. Enable HTTPS
6. Configure SMTP for real emails

### Frontend Deployment
1. Build production bundle:
   ```bash
   yarn build
   ```
2. Deploy to Vercel, Netlify, or similar services
3. Update REACT_APP_BACKEND_URL to production API URL
4. Configure custom domain (optional)
5. Enable CDN for faster loading

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Whitelist IP addresses or allow from anywhere (0.0.0.0/0)
4. Create database user
5. Get connection string and update MONGO_URL

## 🎯 Testing Guide

### Manual Testing Checklist

**Homepage & Marketing**:
- [ ] Banner displays with FIRSTTIME coupon code
- [ ] Banner close button works
- [ ] New user popup appears (first visit only)
- [ ] Carousel auto-rotates every 4 seconds
- [ ] Carousel navigation arrows work
- [ ] Featured products load correctly

**Authentication**:
- [ ] User registration works
- [ ] User login works
- [ ] Email notification logged/sent on login
- [ ] Protected routes redirect to login
- [ ] Logout clears session

**Products**:
- [ ] Product listing page loads all products
- [ ] Product detail page shows correct information
- [ ] Add to cart button works
- [ ] Cart badge updates in header

**Shopping Cart**:
- [ ] Cart displays added items
- [ ] Quantity update works
- [ ] Item removal works
- [ ] Total calculation is correct

**Checkout & Coupons**:
- [ ] Coupon input field visible
- [ ] FIRSTTIME coupon applies 20% discount
- [ ] Invalid coupon shows error
- [ ] Expired coupon shows error
- [ ] Min purchase requirement enforced
- [ ] Final total calculates correctly
- [ ] Order confirmation email logged/sent

**Blogs**:
- [ ] Blog listing page loads
- [ ] "Write Article" button visible when logged in
- [ ] Blog creation works
- [ ] Blog detail page displays correctly
- [ ] Admin can delete blogs

**Contact Form**:
- [ ] Contact form submits successfully
- [ ] Confirmation email logged/sent
- [ ] Form fields validate correctly
- [ ] Success message displays

**Admin Panel**:
- [ ] Dashboard stats display correctly
- [ ] Products tab: CRUD operations work
- [ ] Orders tab: Status updates work
- [ ] Users tab: User list displays, delete works
- [ ] Coupons tab: Create, activate, deactivate, delete work
- [ ] Blogs tab: Blog list displays, delete works
- [ ] Contacts tab: Submissions display, reply works

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using Emergent AI

## 🤝 Support

For issues or questions:
- Check the troubleshooting section above
- Review API documentation at `/docs`
- Contact support: support@wigzotape.com

## 🎉 Features Summary

This Wigzo Tape ecommerce platform includes:

✅ Complete product catalog with admin management
✅ Shopping cart and checkout with Razorpay
✅ Advanced coupon system with admin controls
✅ User authentication and order tracking
✅ Marketing features (banner, popup, carousel)
✅ Blog platform for user engagement
✅ Contact form with admin reply system
✅ Email notifications (3 types)
✅ Comprehensive admin panel (6 management tabs)
✅ Responsive design optimized for all devices
✅ Production-ready with dummy payment mode
✅ Full CRUD operations for all entities
✅ Real-time updates and notifications

---

**Ready to start selling premium wig tape! 🎊**
