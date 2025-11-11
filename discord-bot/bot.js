const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Create client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds
    ] 
});

// Create commands collection
client.commands = new Collection();

// Load commands
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath, { withFileTypes: true });

for (const item of commandFolders) {
    if (item.isFile() && item.name.endsWith('.js')) {
        const filePath = path.join(foldersPath, item.name);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`✅ Loaded command: ${command.data.name}`);
        } else {
            console.log(`⚠️ The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Event: Bot ready
client.once('ready', () => {
    console.log(`🚀 ${client.user.tag} is online!`);
    console.log(`📊 Serving ${client.guilds.cache.size} guild(s)`);
    
    // Set bot status
    client.user.setActivity('🎵 Creating inspirations', { type: 'LISTENING' });
});

// Event: Interaction create (slash commands)
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`❌ No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
        console.log(`✅ ${interaction.user.tag} used /${interaction.commandName}`);
    } catch (error) {
        console.error(`❌ Error executing command ${interaction.commandName}:`, error);
        
        const errorMessage = {
            content: 'There was an error while executing this command!',
            ephemeral: true
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Event: Error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Load environment variables
require('dotenv').config();

// Check for required environment variables
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ Missing DISCORD_TOKEN environment variable!');
    console.log('📋 Please create a .env file with your Discord bot token.');
    console.log('📋 Copy .env.example to .env and fill in your bot credentials.');
    process.exit(1);
}

// Login to Discord
client.login(process.env.DISCORD_TOKEN);