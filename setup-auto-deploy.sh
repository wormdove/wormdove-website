#!/bin/bash

# 🚀 WORMDOVE Auto-Deploy Setup Script
# This script helps you quickly set up automatic Firebase deployment

echo "🎵 WORMDOVE Auto-Deploy Setup"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -f "firebase.json" ]; then
    echo "❌ Please run this script from your WORMDOVE website directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📂 Initializing git repository..."
    git init
    git add .
    git commit -m "🎵 Initial WORMDOVE website with inspirations system"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check for GitHub remote
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 GitHub Setup Required:"
    echo "1. Create a new repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "3. Run: git push -u origin main"
    echo ""
    read -p "Have you created a GitHub repository and want to continue? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Please set up GitHub first, then run this script again."
        exit 1
    fi
else
    echo "✅ GitHub remote configured"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo ""
    echo "🔥 Installing Firebase CLI..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI installed"
else
    echo "✅ Firebase CLI already installed"
fi

# Check if logged into Firebase
if ! firebase projects:list > /dev/null 2>&1; then
    echo ""
    echo "🔐 Firebase login required..."
    firebase login
fi

# Generate CI token
echo ""
echo "🔑 Generating Firebase deployment token..."
echo "Copy this token for GitHub Secrets setup:"
echo ""
firebase login:ci

echo ""
echo "🎯 Next Steps:"
echo "1. Copy the Firebase token above"
echo "2. Go to your GitHub repository → Settings → Secrets → Actions"
echo "3. Add these secrets:"
echo "   - FIREBASE_TOKEN: (paste the token)"
echo "   - FIREBASE_PROJECT_ID: (your Firebase project ID)"
echo "4. Push any changes to trigger auto-deployment!"
echo ""
echo "🎵 Your automatic deployment is ready! Add inspirations via Discord and watch them appear on your live site!"