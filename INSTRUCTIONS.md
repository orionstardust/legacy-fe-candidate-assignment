# 🚀 Web3 Message Signer & Verifier - Setup & Usage Instructions

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Environment Setup](#environment-setup)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## 🎯 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **Yarn package manager** installed
- **Dynamic.xyz account** with an environment ID
- **Git** for version control

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd legacy-fe-candidate-assignment

# 2. Setup environment variables
cp frontend/env.example frontend/.env
cp backend/env.example backend/.env

# 3. Install dependencies
yarn install:all

# 4. Start development servers
yarn dev
```

**Access your application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Environment Setup

### Frontend Environment Variables

1. **Copy the example file:**
   ```bash
   cd frontend
   cp env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Dynamic.xyz Configuration
   VITE_DYNAMIC_ENVIRONMENT_ID=your_actual_dynamic_environment_id_here
   
   # Optional: Enable debug logging
   VITE_DEBUG=false
   ```

3. **Get your Dynamic.xyz Environment ID:**
   - Go to [Dynamic.xyz Dashboard](https://app.dynamic.xyz/)
   - Create a new project or use existing one
   - Copy the Environment ID from your project settings

### Backend Environment Variables

1. **Copy the example file:**
   ```bash
   cd backend
   cp env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Server Configuration
   PORT=5000
   
   # Environment
   NODE_ENV=development
   
   # Optional: Enable detailed logging
   LOG_LEVEL=debug
   ```

## 📦 Installation

### Option 1: Automated Setup (Recommended)

```bash
# Make the setup script executable
chmod +x setup.sh

# Run the automated setup
./setup.sh
```

### Option 2: Manual Installation

```bash
# 1. Install root dependencies
yarn install

# 2. Install frontend dependencies
cd frontend
yarn install
cd ..

# 3. Install backend dependencies
cd backend
yarn install
cd ..
```

## 🏃‍♂️ Running the Application

### Start Both Servers (Recommended)

```bash
# Start both frontend and backend simultaneously
yarn dev
```

### Start Servers Individually

```bash
# Frontend only
yarn dev:frontend

# Backend only
yarn dev:backend
```

### Available Scripts

```bash
# Development
yarn dev                    # Start both servers
yarn dev:frontend          # Start frontend only
yarn dev:backend           # Start backend only

# Building
yarn build                 # Build both frontend and backend
yarn build:frontend        # Build frontend only
yarn build:backend         # Build backend only

# Testing
yarn test                  # Run all tests
yarn test:frontend         # Run frontend tests only
yarn test:backend          # Run backend tests only

# Installation
yarn install:all           # Install all dependencies
```

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
yarn test
```

### Backend Tests

```bash
cd backend
yarn test
```

### Run All Tests

```bash
yarn test
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Configure build settings:**
   - Build Command: `yarn build:frontend`
   - Output Directory: `frontend/dist`
   - Install Command: `yarn install`
4. **Add Environment Variables:**
   - `VITE_DYNAMIC_ENVIRONMENT_ID`: Your Dynamic.xyz environment ID

### Backend Deployment (Render/Railway)

1. **Push to GitHub**
2. **Connect to your platform**
3. **Configure build settings:**
   - Build Command: `yarn build:backend`
   - Start Command: `yarn start`
4. **Add Environment Variables:**
   - `PORT`: 5000 (or your platform's default)
   - `NODE_ENV`: production

## 🔧 Project Structure

```
legacy-fe-candidate-assignment/
├── frontend/                 # React 18 + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── main.tsx         # App entry with Dynamic.xyz
│   │   └── index.css        # Modern CSS with variables
│   ├── package.json         # Frontend dependencies
│   ├── env.example          # Environment variables template
│   └── vite.config.ts       # Vite + proxy to backend
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── services/        # Signature verification logic
│   │   ├── __tests__/       # Comprehensive test suite
│   │   └── index.ts         # Express server
│   ├── package.json         # Backend dependencies
│   ├── env.example          # Backend environment template
│   └── tsconfig.json        # TypeScript config
├── package.json             # Root with yarn scripts
├── setup.sh                 # Automated setup script
├── .gitignore               # Git ignore rules
├── README.md                # Project overview
├── INSTRUCTIONS.md          # This file
└── SETUP_INSTRUCTIONS.md    # Detailed setup guide
```

## 🌐 API Endpoints

### Backend API

- **Health Check**: `GET /health`
- **Signature Verification**: `POST /verify-signature`

### Frontend Features

- **Wallet Connection**: Dynamic.xyz headless integration
- **Message Signing**: Sign custom messages with wallet
- **Message Verification**: Verify signatures via backend
- **Message History**: Local storage with copy functionality

## 🆘 Troubleshooting

### Common Issues

#### 1. "VITE_DYNAMIC_ENVIRONMENT_ID is not set"

**Solution:**
```bash
cd frontend
cp env.example .env
# Edit .env and add your Dynamic.xyz environment ID
```

#### 2. "Cannot find module" errors

**Solution:**
```bash
# Install dependencies in both directories
yarn install:all
```

#### 3. Frontend not connecting to backend

**Solution:**
- Ensure backend is running on port 5000
- Check proxy configuration in `frontend/vite.config.ts`
- Verify CORS settings in backend

#### 4. Wallet connection issues

**Solution:**
- Verify Dynamic.xyz environment ID is correct
- Check browser console for errors
- Ensure you're using a supported browser

#### 5. Port conflicts

**Solution:**
- Change backend port in `backend/.env`
- Update frontend proxy in `frontend/vite.config.ts`

### Getting Help

1. **Check browser console** for error messages
2. **Verify environment variables** are set correctly
3. **Ensure both servers** are running
4. **Check network tab** for API call failures
5. **Review server logs** for backend errors

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔐 Security Notes

- **Never commit `.env` files** to version control
- **Use strong environment IDs** for Dynamic.xyz
- **Validate all inputs** on both frontend and backend
- **Keep dependencies updated** regularly

## 📚 Additional Resources

- **Dynamic.xyz Documentation**: [https://docs.dynamic.xyz/](https://docs.dynamic.xyz/)
- **Ethers.js Documentation**: [https://docs.ethers.org/](https://docs.ethers.org/)
- **React Documentation**: [https://react.dev/](https://react.dev/)
- **Express.js Documentation**: [https://expressjs.com/](https://expressjs.com/)

## 🎉 Success!

Once you've completed the setup:

1. **Frontend** will be running at http://localhost:3000
2. **Backend** will be running at http://localhost:5000
3. **Dynamic.xyz integration** will be working
4. **Message signing and verification** will be functional
5. **Beautiful UI** will be displayed

Your Web3 Message Signer & Verifier is now ready to use! 🚀

---

**Need help?** Check the troubleshooting section above or review the error messages in your console. 