# 🤖 WORMDOVE Discord Inspiration Bot

A Discord bot that automatically adds inspirations and study log entries to your artist website!

## ✨ Features

- **Add Inspirations**: Use slash commands to add inspirations with categories, tags, images, and links
- **Automatic Website Integration**: All inspirations appear instantly on your website
- **Rich Categories**: Music, Visual, Technique, Concept, and Learning categories
- **Search & Filter**: Website visitors can filter and search through your inspirations
- **Image Support**: Upload images directly through Discord
- **Tag System**: Organize inspirations with custom tags

## 🚀 Quick Setup

### 1. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name (e.g., "WORMDOVE Inspiration Bot")
3. Go to the "Bot" section and click "Add Bot"
4. Copy the bot token
5. Go to the "OAuth2" section, copy the Client ID
6. In OAuth2 > URL Generator:
   - Select `bot` and `applications.commands` scopes
   - Select `Send Messages`, `Use Slash Commands`, and `Attach Files` permissions
   - Copy the generated URL and use it to add the bot to your Discord server

### 2. Environment Setup

1. Navigate to the bot directory:
   ```bash
   cd discord-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file and add your credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here
   GUILD_ID=your_guild_id_here
   ```

### 3. Deploy Commands

Deploy the slash commands to Discord:
```bash
npm run deploy
```

### 4. Start the Bot

```bash
npm start
```

For development (auto-restart on changes):
```bash
npm run dev
```

## 🎯 Bot Commands

### `/add-inspiration`
Add a new inspiration to your study log
- **title** (required): Main title of the inspiration
- **content** (required): Description or notes
- **category** (required): Choose from Music, Visual, Technique, Concept, or Learning
- **link** (optional): URL to the inspiration source
- **image** (optional): Upload an image file
- **tags** (optional): Comma-separated tags

### `/list-inspirations`
View recent inspirations from your study log
- **category** (optional): Filter by specific category
- **count** (optional): Number of inspirations to show (1-10, default: 5)

### `/remove-inspiration`
Remove an inspiration from your study log
- **title** (required): Title of inspiration to remove (partial match works)

### `/inspiration-help`
Display help information for all bot commands

## 📊 Categories

- 🎵 **Music**: Songs, artists, albums, sounds, compositions
- 🎨 **Visual**: Art, videos, designs, aesthetics, visuals
- ⚙️ **Technique**: Production tips, technical knowledge, tutorials
- 💭 **Concept**: Ideas, themes, creative concepts, philosophy
- 📚 **Learning**: Courses, educational content, resources

## 🌐 Website Integration

All inspirations automatically appear in the "Study Log & Inspirations" section on your website with:

- **Real-time Updates**: New inspirations appear instantly
- **Category Filtering**: Visitors can filter by category
- **Search Functionality**: Full-text search through titles, content, and tags
- **Responsive Design**: Looks great on all devices
- **Rich Media**: Images and links are displayed beautifully

## 🛠️ File Structure

```
discord-bot/
├── commands/
│   ├── add-inspiration.js      # Add new inspirations
│   ├── list-inspirations.js    # View recent inspirations
│   ├── remove-inspiration.js   # Remove inspirations
│   └── inspiration-help.js     # Help command
├── bot.js                      # Main bot file
├── deploy-commands.js          # Command deployment script
├── package.json               # Dependencies and scripts
├── .env.example              # Environment template
├── .gitignore               # Git ignore file
└── README.md                # This file
```

## 🔧 Troubleshooting

### Bot won't start
- Check that your `.env` file has the correct token
- Ensure your bot token hasn't expired
- Verify the bot has proper permissions in your Discord server

### Commands not appearing
- Run `npm run deploy` to register commands
- Make sure CLIENT_ID is correct in `.env`
- If using GUILD_ID, ensure it's the correct server ID

### Website not updating
- Check that `assets/inspirations.json` exists and is writable
- Verify the file path in the bot commands is correct
- Refresh your website to see new inspirations

### Permission errors
- Ensure the bot has `Send Messages` and `Use Slash Commands` permissions
- Check that the bot can read/write to the assets directory

## 🎨 Customization

### Adding New Categories
1. Edit the choices in `commands/add-inspiration.js` and `commands/list-inspirations.js`
2. Add the emoji mapping in `js/script.js` (InspirationsManager.categoryEmojis)
3. Add CSS styling for the new category if needed

### Changing Data Storage
Currently uses JSON file storage. To use a database:
1. Install database dependencies (e.g., `mysql2`, `mongodb`)
2. Update the data storage methods in each command file
3. Update the website's data loading in `js/script.js`

## 📝 Example Usage

1. Add a musical inspiration:
   ```
   /add-inspiration title:"Arca - Nonbinary" content:"Love the glitchy textures and emotional intensity" category:Music tags:"experimental, electronic, emotion"
   ```

2. Add a visual inspiration with image:
   ```
   /add-inspiration title:"Cyberpunk Neon Aesthetic" content:"Perfect color palette for my next video" category:Visual image:[attach file]
   ```

3. Add a technique note:
   ```
   /add-inspiration title:"Sidechain Compression" content:"Learned how to create that pumping effect in Ableton Live" category:Technique link:"https://youtube.com/watch?v=example"
   ```

## 🔄 Updates & Maintenance

- The bot automatically creates and updates `assets/inspirations.json`
- Website refreshes inspiration data every time the page loads
- No database required - uses simple JSON file storage
- Bot logs all activities to console for monitoring

## 🆘 Support

If you encounter issues:
1. Check the console logs when running the bot
2. Verify all environment variables are set correctly
3. Ensure the Discord bot has proper permissions
4. Check that the website files are in the correct locations

---

**Created for WORMDOVE - Electronic Music & Audiovisual Art**