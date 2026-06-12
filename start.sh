#!/bin/bash

# CashFrog Quick Start Script 🐸💰

echo "🐸 CashFrog - Quick Start Script"
echo "=================================="
echo ""

# Check if .env exists and has ANTHROPIC_API_KEY
if [ -f .env ]; then
    if grep -q "ANTHROPIC_API_KEY=\"\"" .env; then
        echo "⚠️  WARNING: ANTHROPIC_API_KEY is empty in .env"
        echo "   The AI credit scoring will use fallback algorithm"
        echo "   To enable Claude AI, edit .env and add your API key"
        echo ""
    else
        echo "✅ .env file found with API key"
        echo ""
    fi
else
    echo "❌ ERROR: .env file not found"
    echo "   Please create it from .env.example"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if Prisma Client is generated
if [ ! -d "node_modules/@prisma/client" ]; then
    echo "🗄️  Generating Prisma Client..."
    npm run db:generate
    echo ""
fi

# Check if database exists
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️  Creating database..."
    npm run db:migrate
    echo ""
else
    echo "✅ Database found (prisma/dev.db)"
    echo ""
fi

echo "🚀 Starting development server..."
echo "   Opening http://localhost:3000"
echo ""
echo "   Press Ctrl+C to stop"
echo ""

# Start dev server and open browser
npm run dev &
sleep 3
open http://localhost:3000 2>/dev/null || echo "   Please open http://localhost:3000 in your browser"

# Wait for Ctrl+C
wait
