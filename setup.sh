#!/bin/bash

echo "🚀 Setting up Web3 Message Signer & Verifier Project"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install yarn first: npm install -g yarn"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ Yarn version: $(yarn --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
yarn install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
yarn install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
yarn install
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get your Dynamic.xyz environment ID from https://app.dynamic.xyz/"
echo "2. Update frontend/src/main.tsx with your environment ID"
echo "3. Run 'yarn dev' to start both frontend and backend"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"
echo ""
echo "Happy coding! 🚀" 