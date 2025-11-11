const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'assets', 'inspirations.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-inspiration')
        .setDescription('Add a new inspiration to your study log')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the inspiration')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('content')
                .setDescription('Description or notes about this inspiration')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category of inspiration')
                .setRequired(true)
                .addChoices(
                    { name: '🎵 Music', value: 'music' },
                    { name: '🎨 Visual', value: 'visual' },
                    { name: '⚙️ Technique', value: 'technique' },
                    { name: '💭 Concept', value: 'concept' },
                    { name: '📚 Learning', value: 'learning' }
                ))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('URL link to the inspiration (optional)')
                .setRequired(false))
        .addAttachmentOption(option =>
            option.setName('image')
                .setDescription('Image related to the inspiration (optional)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('tags')
                .setDescription('Comma-separated tags (optional)')
                .setRequired(false)),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const title = interaction.options.getString('title');
            const content = interaction.options.getString('content');
            const category = interaction.options.getString('category');
            const link = interaction.options.getString('link');
            const image = interaction.options.getAttachment('image');
            const tagsInput = interaction.options.getString('tags');

            // Process tags
            const tags = tagsInput ? 
                tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : 
                [];

            // Create inspiration object
            const inspiration = {
                id: Date.now().toString(),
                title: title,
                content: content,
                category: category,
                link: link || null,
                image: image ? image.url : null,
                tags: tags,
                addedBy: interaction.user.tag,
                addedAt: new Date().toISOString(),
                timestamp: Date.now()
            };

            // Load existing inspirations
            let inspirations = [];
            try {
                const data = await fs.readFile(DATA_FILE, 'utf8');
                inspirations = JSON.parse(data);
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    console.error('Error reading inspirations file:', error);
                }
                // File doesn't exist or is empty, start with empty array
                inspirations = [];
            }

            // Add new inspiration
            inspirations.unshift(inspiration); // Add to beginning for newest first

            // Save to file
            await fs.writeFile(DATA_FILE, JSON.stringify(inspirations, null, 2));

            // Auto-commit to GitHub for deployment (if configured)
            try {
                await this.autoCommitToGitHub(inspiration);
            } catch (error) {
                console.log('ℹ️ GitHub auto-commit not configured or failed:', error.message);
            }

            // Create response embed
            const categoryEmojis = {
                music: '🎵',
                visual: '🎨', 
                technique: '⚙️',
                concept: '💭',
                learning: '📚'
            };

            const embed = {
                color: 0x00FF41, // Electric green
                title: `${categoryEmojis[category]} Inspiration Added!`,
                description: `**${title}**\n${content}`,
                fields: [
                    {
                        name: 'Category',
                        value: category.charAt(0).toUpperCase() + category.slice(1),
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `Added by ${interaction.user.tag}`
                }
            };

            if (link) {
                embed.fields.push({
                    name: 'Link',
                    value: link,
                    inline: true
                });
            }

            if (tags.length > 0) {
                embed.fields.push({
                    name: 'Tags',
                    value: tags.map(tag => `\`${tag}\``).join(', '),
                    inline: false
                });
            }

            if (image) {
                embed.image = {
                    url: image.url
                };
            }

            await interaction.editReply({ 
                content: `✨ Your inspiration has been added to the study log! It will appear on the website shortly.`,
                embeds: [embed] 
            });

        } catch (error) {
            console.error('Error adding inspiration:', error);
            await interaction.editReply({
                content: '❌ There was an error adding your inspiration. Please try again.',
                ephemeral: true
            });
        }
    },

    async autoCommitToGitHub(inspiration) {
        const { exec } = require('child_process');
        const { promisify } = require('util');
        const execAsync = promisify(exec);
        
        // Check if we're in a git repository
        try {
            await execAsync('git status', { cwd: path.join(__dirname, '..', '..') });
        } catch (error) {
            throw new Error('Not a git repository');
        }
        
        const projectRoot = path.join(__dirname, '..', '..');
        
        // Add the inspirations file
        await execAsync('git add assets/inspirations.json', { cwd: projectRoot });
        
        // Create commit message
        const commitMessage = `✨ Add inspiration: ${inspiration.title}

Category: ${inspiration.category}
Added by: ${inspiration.addedBy}
Date: ${new Date(inspiration.addedAt).toLocaleDateString()}

${inspiration.content.substring(0, 100)}${inspiration.content.length > 100 ? '...' : ''}`;

        // Commit the changes
        await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot });
        
        // Push to GitHub (assumes origin main/master)
        try {
            await execAsync('git push origin main', { cwd: projectRoot });
        } catch (error) {
            // Try master if main fails
            await execAsync('git push origin master', { cwd: projectRoot });
        }
        
        console.log('🚀 Auto-committed inspiration to GitHub for deployment!');
    }
};