#!/bin/bash

# Stop on errors
set -e

echo "================================================"
echo "[INFO] Starting TWB (Template Website Builder) Setup"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed. Please install npm first."
    exit 1
fi

echo "[INFO] 1/3: Installing Server Dependencies..."
cd server
npm install

echo "[INFO] 2/3: Configuring Environment Variables..."
if [ ! -f .env ]; then
    echo "Creating default .env file in server directory..."
    echo "MONGO_URI=mongodb://localhost:27017/website-builder" > .env
    echo "PORT=5000" >> .env
    echo "[SUCCESS] .env file created."
else
    echo "[SUCCESS] .env file already exists, skipping."
fi
cd ..

echo "[INFO] 3/3: Installing Client Dependencies..."
cd client
npm install
cd ..

echo "================================================"
echo "[SUCCESS] Setup Complete! You are ready to go."
echo "================================================"
echo ""
echo "[INFO] How to start the application:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   > cd server"
echo "   > npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   > cd client"
echo "   > npm start"
echo "================================================"
