# 🎨 Inspirations System Setup Guide

This guide walks you through setting up the complete Discord bot + website integration for your inspirations catalog.

## 🌟 Overview

The inspirations system consists of:
- **Discord Bot**: Adds inspirations via slash commands
- **Website Section**: Displays inspirations with filtering and search
- **JSON Storage**: Simple file-based data storage

## 📋 Prerequisites

- Node.js (version 16 or higher)
- A Discord account and server
- Basic familiarity with Discord bot development

## 🚀 Step-by-Step Setup

### Step 1: Create Discord Application

1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it (e.g., "WORMDOVE Inspiration Bot")
4. Save the **Application ID** (you'll need this later)

### Step 2: Create Bot User

1. In your application, go to "Bot" section
2. Click "Add Bot"
3. Under "Token", click "Copy" to get your bot token
4. Save this token securely (you'll need it later)

### Step 3: Set Bot Permissions

1. Go to "OAuth2" → "URL Generator"
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select bot permissions:
   - ✅ Send Messages
   - ✅ Use Slash Commands
   - ✅ Attach Files
   - ✅ Read Message History
4. Copy the generated URL

### Step 4: Invite Bot to Your Server

1. Paste the URL from Step 3 into your browser
2. Select your Discord server
3. Confirm the permissions
4. Complete the captcha

### Step 5: Get Guild ID (Optional but recommended)

1. In Discord, go to User Settings → Advanced
2. Enable "Developer Mode"
3. Right-click your server name → Copy ID
4. Save this Guild ID

### Step 6: Install Bot Dependencies

```bash
# Navigate to the bot directory
cd discord-bot

# Install dependencies
npm install
```

### Step 7: Configure Environment

```bash
# Copy the environment template
cp .env.example .env
```

Edit the `.env` file:
```env
DISCORD_TOKEN=your_bot_token_from_step_2
CLIENT_ID=your_application_id_from_step_1
GUILD_ID=your_guild_id_from_step_5
```

### Step 8: Deploy Commands

```bash
# Deploy slash commands to Discord
npm run deploy
```

You should see:
```
✅ Loaded command for deployment: add-inspiration
✅ Loaded command for deployment: list-inspirations
✅ Loaded command for deployment: remove-inspiration
✅ Loaded command for deployment: inspiration-help
🚀 Started refreshing 4 application (/) commands.
✅ Successfully reloaded 4 guild application (/) commands.
```

### Step 9: Start the Bot

```bash
# Start the bot
npm start
```

You should see:
```
✅ Loaded command: add-inspiration
✅ Loaded command: list-inspirations
✅ Loaded command: remove-inspiration
✅ Loaded command: inspiration-help
🚀 WORMDOVE Inspiration Bot#1234 is online!
📊 Serving 1 guild(s)
```

### Step 10: Test the Bot

In your Discord server, try:
```
/inspiration-help
```

You should see a help embed with all available commands.

## 🎯 Using the Bot

### Adding Your First Inspiration

```
/add-inspiration title:"First Test" content:"Testing the bot setup" category:Learning tags:"test, setup"
```

### Viewing Inspirations

```
/list-inspirations count:5
```

### Checking the Website

1. Start your local website server:
   ```bash
   # In the main website directory
   python3 -m http.server 8000
   ```

2. Visit `http://localhost:8000`
3. Navigate to the "Inspirations" section
4. You should see your test inspiration!

## 🛠️ Troubleshooting

### Bot Commands Not Appearing

**Problem**: Slash commands don't show up in Discord

**Solutions**:
1. Make sure you ran `npm run deploy`
2. Check that CLIENT_ID in `.env` is correct
3. Try removing and re-adding the bot to your server
4. If using global deployment (no GUILD_ID), commands can take up to 1 hour to appear

### Bot Won't Start

**Problem**: Bot crashes or won't connect

**Solutions**:
1. Verify DISCORD_TOKEN in `.env` is correct and complete
2. Check that your bot token hasn't been regenerated
3. Ensure you have Node.js 16+ installed
4. Try regenerating the bot token in Discord Developer Portal

### Website Not Updating

**Problem**: New inspirations don't appear on website

**Solutions**:
1. Check that `assets/inspirations.json` exists and is writable
2. Verify the file path in bot commands is correct
3. Hard refresh the website (Ctrl+F5 or Cmd+Shift+R)
4. Check browser console for JavaScript errors

### Permission Errors

**Problem**: Bot can't save inspirations or respond to commands

**Solutions**:
1. Ensure bot has proper permissions in your Discord server
2. Check file system permissions for the assets directory
3. Verify the bot role is above other roles that might restrict it

## 🔄 Development Tips

### Running in Development Mode

```bash
# Auto-restart on file changes
npm run dev
```

### Viewing Bot Logs

The bot logs all activities to the console. Watch for:
- ✅ Command executions
- ❌ Errors or warnings
- 📊 Statistics and status updates

### Testing Changes

1. Make code changes
2. Restart the bot (`Ctrl+C` then `npm start`)
3. If you modified command structure, run `npm run deploy`
4. Test commands in Discord

## 📊 Monitoring

### Bot Health

Check these indicators:
- ✅ Bot shows as online in Discord
- ✅ Commands respond quickly
- ✅ Inspirations save successfully
- ✅ Website updates with new content

### Data Backup

Your inspirations are stored in `assets/inspirations.json`. Consider:
- Regular backups of this file
- Version control (git) for tracking changes
- Cloud storage for additional security

## 🎨 Customization

### Adding New Categories

1. Edit command files in `discord-bot/commands/`
2. Update category choices in slash command definitions
3. Add emoji mappings in `js/script.js`
4. Update CSS if needed for new category styling

### Changing Appearance

- **Website Colors**: Edit CSS custom properties in `css/styles.css`
- **Bot Embeds**: Modify embed colors in command files
- **Category Emojis**: Update emoji mappings in both bot and website code

### Advanced Features

Consider adding:
- Database storage instead of JSON
- Image upload to cloud storage
- Export functionality
- Analytics and statistics
- Integration with other platforms

---

🎵 **Ready to catalog your creative journey!** 🎨