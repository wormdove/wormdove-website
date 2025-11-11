const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'assets', 'inspirations.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-inspiration')
        .setDescription('Remove an inspiration from your study log')
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Title of the inspiration to remove (case-insensitive)')
                .setRequired(true)),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const titleToRemove = interaction.options.getString('title').toLowerCase();

            // Load inspirations
            let inspirations = [];
            try {
                const data = await fs.readFile(DATA_FILE, 'utf8');
                inspirations = JSON.parse(data);
            } catch (error) {
                await interaction.editReply({
                    content: '📝 No inspirations found to remove!',
                    ephemeral: true
                });
                return;
            }

            // Find inspiration to remove
            const originalLength = inspirations.length;
            const inspirationToRemove = inspirations.find(item => 
                item.title.toLowerCase().includes(titleToRemove)
            );

            if (!inspirationToRemove) {
                await interaction.editReply({
                    content: `❌ No inspiration found with title containing: "${titleToRemove}"`,
                    ephemeral: true
                });
                return;
            }

            // Remove the inspiration
            inspirations = inspirations.filter(item => item.id !== inspirationToRemove.id);

            // Save updated file
            await fs.writeFile(DATA_FILE, JSON.stringify(inspirations, null, 2));

            // Auto-commit to GitHub for deployment (if configured)
            try {
                await this.autoCommitToGitHub(inspirationToRemove);
            } catch (error) {
                console.log('ℹ️ GitHub auto-commit not configured or failed:', error.message);
            }

            const categoryEmojis = {
                music: '🎵',
                visual: '🎨', 
                technique: '⚙️',
                concept: '💭',
                learning: '📚'
            };

            const embed = {
                color: 0xFF1493, // Electric pink
                title: `🗑️ Inspiration Removed`,
                description: `Successfully removed: **${inspirationToRemove.title}**`,
                fields: [
                    {
                        name: 'Category',
                        value: `${categoryEmojis[inspirationToRemove.category]} ${inspirationToRemove.category.charAt(0).toUpperCase() + inspirationToRemove.category.slice(1)}`,
                        inline: true
                    },
                    {
                        name: 'Originally Added',
                        value: new Date(inspirationToRemove.addedAt).toLocaleDateString(),
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `Removed by ${interaction.user.tag}`
                }
            };

            await interaction.editReply({ 
                content: `✅ Inspiration removed successfully! ${inspirations.length} inspirations remaining.`,
                embeds: [embed]
            });

        } catch (error) {
            console.error('Error removing inspiration:', error);
            await interaction.editReply({
                content: '❌ There was an error removing the inspiration. Please try again.',
                ephemeral: true
            });
        }
    },

    async autoCommitToGitHub(removedInspiration) {
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
        const commitMessage = `🗑️ Remove inspiration: ${removedInspiration.title}

Category: ${removedInspiration.category}
Originally added: ${new Date(removedInspiration.addedAt).toLocaleDateString()}`;

        // Commit the changes
        await execAsync(`git commit -m "${commitMessage}"`, { cwd: projectRoot });
        
        // Push to GitHub (assumes origin main/master)
        try {
            await execAsync('git push origin main', { cwd: projectRoot });
        } catch (error) {
            // Try master if main fails
            await execAsync('git push origin master', { cwd: projectRoot });
        }
        
        console.log('🚀 Auto-committed inspiration removal to GitHub for deployment!');
    }
};