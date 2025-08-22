#!/bin/bash

echo "🔐 Setting up environment variables for Web3 Message Signer & Verifier"
echo "=================================================================="

# Check if .env files already exist
if [ -f "frontend/.env" ]; then
    echo "⚠️  frontend/.env already exists. Skipping..."
else
    echo "📝 Creating frontend/.env from template..."
    cp frontend/env.example frontend/.env
    echo "✅ frontend/.env created"
    echo "   Please edit frontend/.env and add your Dynamic.xyz environment ID"
fi

if [ -f "backend/.env" ]; then
    echo "⚠️  backend/.env already exists. Skipping..."
else
    echo "📝 Creating backend/.env from template..."
    cp backend/env.example backend/.env
    echo "✅ backend/.env created"
    echo "   Please edit backend/.env if you need to change default settings"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Edit frontend/.env and add your Dynamic.xyz environment ID"
echo "2. Get your environment ID from: https://app.dynamic.xyz/"
echo "3. Run 'yarn dev' to start the application"
echo ""
echo "📚 See INSTRUCTIONS.md for detailed setup instructions" 