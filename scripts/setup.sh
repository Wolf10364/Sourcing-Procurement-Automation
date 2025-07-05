#!/bin/bash

# LogiConnect Platform Setup Script
# This script sets up the development environment for all team members

echo "🚚 LogiConnect Platform Setup"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi

print_status "npm version: $(npm -v)"

# Create necessary directories
echo ""
echo "📁 Creating project directories..."

# Server directories
mkdir -p server/src/{controllers,models,routes,middleware,services,utils,config,websocket}
mkdir -p server/{migrations,seeds,tests}
mkdir -p server/logs

# Client directories
mkdir -p client/src/{components/{common,layout,forms,dashboard},pages,hooks,services,store,utils,types,styles}
mkdir -p client/public

# Mobile directories
mkdir -p mobile/src/{components/{common,screens,navigation},services,hooks,utils,types}

# Shared directories
mkdir -p shared/{types,utils,config}

# Documentation directories
mkdir -p docs/{api,deployment,development,architecture}

# Test directories
mkdir -p tests/{e2e,integration,performance}

# Scripts directories
mkdir -p scripts/{build,deploy,database}

print_status "Project directories created"

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install
print_status "Root dependencies installed"

# Install server dependencies
echo ""
echo "🖥️ Installing server dependencies..."
cd server
npm install
print_status "Server dependencies installed"
cd ..

# Install client dependencies
echo ""
echo "🌐 Installing client dependencies..."
cd client
npm install
print_status "Client dependencies installed"
cd ..

# Install mobile dependencies
echo ""
echo "📱 Installing mobile dependencies..."
cd mobile
npm install
print_status "Mobile dependencies installed"
cd ..

# Create environment files
echo ""
echo "⚙️ Setting up environment files..."

# Copy environment examples
if [ ! -f server/.env ]; then
    cp server/env.example server/.env
    print_warning "Created server/.env - Please update with your configuration"
fi

if [ ! -f client/.env ]; then
    echo "REACT_APP_API_URL=http://localhost:5000" > client/.env
    print_warning "Created client/.env - Please update with your configuration"
fi

if [ ! -f mobile/.env ]; then
    echo "API_URL=http://localhost:5000" > mobile/.env
    print_warning "Created mobile/.env - Please update with your configuration"
fi

# Create basic configuration files
echo ""
echo "📋 Creating configuration files..."

# TypeScript config for client
cat > client/tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
EOF

# TypeScript config for mobile
cat > mobile/tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es6"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
EOF

print_status "Configuration files created"

# Create basic README for each component
echo ""
echo "📚 Creating documentation..."

cat > server/README.md << EOF
# LogiConnect Server

Backend API for the LogiConnect logistics platform.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Environment Variables

Copy \`env.example\` to \`.env\` and update the values.

## API Documentation

Visit \`http://localhost:5000/api-docs\` for Swagger documentation.
EOF

cat > client/README.md << EOF
# LogiConnect Client

Frontend web application for the LogiConnect logistics platform.

## Quick Start

\`\`\`bash
npm install
npm start
\`\`\`

The app will be available at \`http://localhost:3000\`
EOF

cat > mobile/README.md << EOF
# LogiConnect Mobile

React Native mobile application for the LogiConnect logistics platform.

## Quick Start

\`\`\`bash
npm install
npm start
\`\`\`

## Development

- iOS: \`npm run ios\`
- Android: \`npm run android\`
EOF

print_status "Documentation created"

# Create development guide
cat > docs/development/setup.md << EOF
# Development Setup Guide

## Prerequisites

- Node.js 18+
- npm 8+
- Git

## Quick Setup

1. Clone the repository
2. Run \`./scripts/setup.sh\`
3. Update environment files
4. Start development servers

## Development Commands

### Root Level
\`\`\`bash
npm run dev          # Start all services
npm run install:all  # Install all dependencies
\`\`\`

### Server
\`\`\`bash
cd server
npm run dev          # Start server
npm run db:setup     # Setup database
\`\`\`

### Client
\`\`\`bash
cd client
npm start            # Start web app
\`\`\`

### Mobile
\`\`\`bash
cd mobile
npm start            # Start mobile app
\`\`\`

## Team Assignments

See \`TEAM_ASSIGNMENTS.md\` for detailed task distribution.
EOF

print_status "Development guide created"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Update environment files with your configuration"
echo "2. Review TEAM_ASSIGNMENTS.md for your tasks"
echo "3. Start Sprint 1 development"
echo ""
echo "Useful commands:"
echo "- npm run dev (start all services)"
echo "- npm run install:all (reinstall all dependencies)"
echo ""
echo "Happy coding! 🚚" 