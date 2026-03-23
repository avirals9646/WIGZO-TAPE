@echo off
echo ========================================
echo Wigzo Tape - Local Setup Script
echo ========================================
echo.

REM Check if MongoDB is running
echo [1/5] Checking MongoDB...
sc query MongoDB | find "RUNNING" >nul
if %errorlevel% == 0 (
    echo ✓ MongoDB is running
) else (
    echo ✗ MongoDB is not running
    echo Please start MongoDB with: net start MongoDB
    echo Run Command Prompt as Administrator
    pause
    exit /b 1
)

echo.
echo [2/5] Setting up Backend...
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Create .env if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    (
        echo MONGO_URL=mongodb://localhost:27017
        echo DB_NAME=wigzo_tape_db
        echo CORS_ORIGINS=http://localhost:3000
        echo JWT_SECRET=wigzo-tape-secret-key-2026
    ) > .env
)

echo.
echo [3/5] Seeding Database...
echo Seeding products...
python seed_products.py

echo Seeding coupons...
python seed_coupons.py

echo Resetting users (fixing authentication)...
python reset_users.py

echo.
echo [4/5] Setting up Frontend...
cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing Node dependencies...
    call yarn install
) else (
    echo Node modules already installed
)

REM Create .env if it doesn't exist
if not exist ".env" (
    echo Creating frontend .env file...
    echo REACT_APP_BACKEND_URL=http://localhost:8001 > .env
)

echo.
echo [5/5] Setup Complete!
echo.
echo ========================================
echo           SETUP SUCCESSFUL!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (in backend folder):
echo    venv\Scripts\activate
echo    uvicorn server:app --reload --host 0.0.0.0 --port 8001
echo.
echo 2. Start Frontend (in frontend folder, new terminal):
echo    yarn start
echo.
echo Login Credentials:
echo   Admin: admin@wigzotape.com / admin123
echo   User:  test@wigzotape.com / test123
echo.
echo Access at: http://localhost:3000
echo ========================================
pause
