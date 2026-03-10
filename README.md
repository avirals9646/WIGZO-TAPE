# Wigzo Tape - Ecommerce Platform

![Wigzo Tape Logo](https://customer-assets.emergentagent.com/job_b4f0fc4c-96da-4399-b28f-8218e03f515b/artifacts/wouuvr44_IMG-20260212-WA0090.jpg)

A modern, full-stack ecommerce platform for selling premium wig tape products. Built with React, FastAPI, and MongoDB.

## ✨ Features

- **User Authentication**: JWT-based secure login and registration
- **Product Management**: Browse, search, and view detailed product information
- **Shopping Cart**: Add, update, and remove items with real-time updates
- **Checkout & Payment**: Integrated with Razorpay payment gateway (dummy mode supported)
- **Order Management**: Track order history and status
- **Admin Panel**: 
  - Add, edit, and delete products
  - Upload product images
  - Manage inventory
  - View all orders
- **Responsive Design**: Mobile-first, bold modern design with teal and black theme
- **SEO Friendly**: Clean URLs and semantic HTML

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- Shadcn/UI Components
- Axios for API calls
- Lucide React for icons

### Backend
- FastAPI (Python)
- Motor (Async MongoDB driver)
- PyJWT for authentication
- Bcrypt for password hashing
- Python Multipart for file uploads

### Database
- MongoDB

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
   ```

6. Seed the database with initial products:
   ```bash
   python seed_products.py
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
- **Backend API**: http://localhost:8001/docs (API documentation)

## 👤 Default Credentials

### Admin Account
- **Email**: admin@wigzotape.com
- **Password**: admin123

Use these credentials to access the admin panel at `/admin`

## 📱 Usage

### Customer Flow
1. **Browse Products**: View all available wig tape products on the homepage or products page
2. **Register/Login**: Create an account or login to existing account
3. **Add to Cart**: Add products to your shopping cart
4. **Checkout**: Fill in shipping information and complete payment
5. **Track Orders**: View order history in the dashboard

### Admin Flow
1. **Login**: Use admin credentials to access admin panel
2. **Manage Products**: 
   - Add new products with images
   - Edit existing products
   - Delete products
   - Update inventory
3. **View Orders**: Monitor all customer orders

## 📂 Project Structure

```
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── seed_products.py       # Database seeding script
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
│
├── frontend/
│   ├── public/                # Static files
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductCard.js
│   │   │   └── ui/           # Shadcn UI components
│   │   ├── pages/            # Page components
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Admin.js
│   │   │   └── About.js
│   │   ├── App.js            # Main app component
│   │   ├── api.js            # Axios configuration
│   │   ├── AuthContext.js    # Authentication context
│   │   ├── CartContext.js    # Cart state management
│   │   └── index.css         # Global styles
│   ├── package.json          # Node dependencies
│   └── .env                  # Environment variables
│
└── README.md
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env`:
- `MONGO_URL`: MongoDB connection string
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGINS`: Allowed origins for CORS

### Frontend Configuration

Edit `frontend/.env`:
- `REACT_APP_BACKEND_URL`: Backend API URL

## 🎨 Design Guidelines

- **Brand Colors**: 
  - Primary: Teal (#17847c)
  - Secondary: Black (#000000)
- **Typography**: 
  - Headings: Oswald (bold, uppercase)
  - Body: Manrope
- **Design Philosophy**: Bold modern minimalist with sharp edges

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user orders
- `POST /api/orders/{id}/payment` - Process payment

Full API documentation: http://localhost:8001/docs

## 💳 Payment Integration

Currently configured with **dummy Razorpay integration** for testing. To enable real payments:

1. Get Razorpay API keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Update backend code with actual Razorpay implementation
3. Replace dummy payment flow in `frontend/src/pages/Checkout.js`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running: `net start MongoDB`
- Check MongoDB is running on port 27017
- Verify MONGO_URL in backend/.env

### Backend Not Starting
- Ensure Python virtual environment is activated
- Install all dependencies: `pip install -r requirements.txt`
- Check port 8001 is not in use

### Frontend Not Starting
- Delete `node_modules` and reinstall: `yarn install`
- Clear cache: `yarn cache clean`
- Check port 3000 is not in use

### CORS Errors
- Ensure CORS_ORIGINS in backend/.env includes frontend URL
- Restart backend server after changing .env

## 🚀 Deployment

### Backend Deployment
- Deploy to services like Heroku, Railway, or Render
- Update MONGO_URL to production MongoDB (MongoDB Atlas)
- Set all environment variables
- Use production-grade WSGI server (Gunicorn)

### Frontend Deployment
- Build production bundle: `yarn build`
- Deploy to Vercel, Netlify, or similar services
- Update REACT_APP_BACKEND_URL to production API URL

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using Emergent AI

## 🤝 Support

For issues or questions:
- Check the troubleshooting section
- Review API documentation at `/docs`
- Contact support

---

**Happy Coding! 🎉**
