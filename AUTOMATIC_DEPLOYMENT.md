# 🚀 AUTOMATIC FIREBASE DEPLOYMENT SETUP

This guide will set up automatic Firebase deployment whenever you add inspirations via Discord!

## 🎯 How It Works

```
Discord Bot → Updates JSON → Auto-commits to GitHub → GitHub Actions → Firebase Hosting
```

**Result**: Add an inspiration via Discord and it appears on your live website within 2-3 minutes! ✨

## 📋 Prerequisites

- GitHub account and repository for your website
- Firebase project with hosting enabled
- Firebase CLI installed locally

## 🔧 Setup Steps

### Step 1: Initialize Git Repository (if not already done)

```bash
# In your website directory
cd "/Users/beckschacht/Desktop/WD WEBSITE"

# Initialize git (if not already a git repo)
git init

# Add all files
git add .

# Create initial commit
git commit -m "🎵 Initial WORMDOVE website with inspirations system"
```

### Step 2: Connect to GitHub

1. **Create a new repository** on GitHub (e.g., `wormdove-website`)
2. **Connect your local repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wormdove-website.git
   git push -u origin main
   ```

### Step 3: Get Firebase Token

```bash
# Login to Firebase (if not already)
firebase login

# Generate deployment token
firebase login:ci
```

**Copy the token** that appears - you'll need it for GitHub secrets!

### Step 4: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   **FIREBASE_TOKEN**
   - Value: The token from Step 3
   
   **FIREBASE_PROJECT_ID** 
   - Value: Your Firebase project ID (from Firebase console)

### Step 5: Test the Setup

1. **Start your Discord bot** (if not already running):
   ```bash
   cd discord-bot
   npm start
   ```

2. **Add an inspiration via Discord**:
   ```
   /add-inspiration title:"Auto-Deploy Test" content:"Testing the automatic deployment system!" category:Learning tags:"automation, test"
   ```

3. **Watch the magic happen**:
   - Bot commits changes to GitHub
   - GitHub Actions triggers deployment
   - Your live website updates automatically!

## 🎛️ Configuration Options

### Option 1: Auto-Commit Enabled (Default)
- Every Discord inspiration → Auto-commits → Auto-deploys
- Fastest updates, fully automated

### Option 2: Manual Commits (If you prefer control)
- Disable auto-commit by setting environment variable:
  ```bash
  # In discord-bot/.env
  AUTO_COMMIT_DISABLED=true
  ```
- Manually commit when ready:
  ```bash
  git add assets/inspirations.json
  git commit -m "✨ Update inspirations"
  git push origin main
  ```

### Option 3: Scheduled Deployments
Add this to `.github/workflows/deploy-on-inspiration.yml`:
```yaml
on:
  schedule:
    - cron: '0 */6 * * *'  # Deploy every 6 hours
```

## 🔍 Monitoring Deployments

### GitHub Actions Dashboard
- Go to your repository → **Actions** tab
- See deployment status and logs
- Green ✅ = successful deployment
- Red ❌ = check logs for issues

### Firebase Hosting Console
- Go to Firebase Console → Hosting
- See deployment history and status
- View live website performance

### Discord Bot Logs
Watch your bot terminal for:
```
🚀 Auto-committed inspiration to GitHub for deployment!
✅ wormdove used /add-inspiration
```

## 🛠️ Troubleshooting

### Common Issues

**Git not initialized**
```bash
cd "/Users/beckschacht/Desktop/WD WEBSITE"
git init
git remote add origin YOUR_REPO_URL
```

**Push permission denied**
- Ensure you have write access to the repository
- Check if you need to authenticate with GitHub

**Firebase deployment fails**
- Verify FIREBASE_TOKEN secret is correct
- Check FIREBASE_PROJECT_ID matches your project
- Ensure firebase.json is in repository root

**Auto-commit not working**
- Check Discord bot has file system permissions
- Verify git is installed and configured
- Look for error messages in bot console

### Manual Deploy (Backup method)
If automation fails, you can always deploy manually:
```bash
firebase deploy
```

## 🎨 Customization

### Commit Message Format
Edit the commit message in `discord-bot/commands/add-inspiration.js`:
```javascript
const commitMessage = `🎵 New WORMDOVE inspiration: ${inspiration.title}`;
```

### Deployment Branches
Change deployment branch in `.github/workflows/deploy-on-inspiration.yml`:
```yaml
branches: [ main, develop, production ]
```

### Notification Webhooks
Add Discord webhook notifications to GitHub Actions:
```yaml
- name: Notify Discord
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
```

## ✨ Results

Once set up, your workflow becomes:

1. **💭 Get inspired** by something amazing
2. **📱 Add via Discord**: `/add-inspiration title:"Amazing Track" content:"This sound design is incredible!" category:Music`
3. **⚡ Automatic magic**: Bot commits → GitHub deploys → Live website updates
4. **🌐 Share with the world**: Your inspiration appears on wormdove.com instantly!

Your creative process is now seamlessly connected to your live website! 🎵✨

---

**Need help?** Check the troubleshooting section or the bot console logs for any issues!