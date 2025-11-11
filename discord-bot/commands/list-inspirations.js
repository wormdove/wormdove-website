const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'assets', 'inspirations.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-inspirations')
        .setDescription('View recent inspirations from your study log')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Filter by category (optional)')
                .setRequired(false)
                .addChoices(
                    { name: '🎵 Music', value: 'music' },
                    { name: '🎨 Visual', value: 'visual' },
                    { name: '⚙️ Technique', value: 'technique' },
                    { name: '💭 Concept', value: 'concept' },
                    { name: '📚 Learning', value: 'learning' }
                ))
        .addIntegerOption(option =>
            option.setName('count')
                .setDescription('Number of inspirations to show (1-10, default: 5)')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(10)),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const categoryFilter = interaction.options.getString('category');
            const count = interaction.options.getInteger('count') || 5;

            // Load inspirations
            let inspirations = [];
            try {
                const data = await fs.readFile(DATA_FILE, 'utf8');
                inspirations = JSON.parse(data);
            } catch (error) {
                await interaction.editReply({
                    content: '📝 No inspirations found yet! Use `/add-inspiration` to create your first entry.',
                    ephemeral: true
                });
                return;
            }

            // Filter by category if specified
            if (categoryFilter) {
                inspirations = inspirations.filter(item => item.category === categoryFilter);
            }

            if (inspirations.length === 0) {
                const filterText = categoryFilter ? ` in the "${categoryFilter}" category` : '';
                await interaction.editReply({
                    content: `📝 No inspirations found${filterText}! Use \`/add-inspiration\` to add some entries.`,
                    ephemeral: true
                });
                return;
            }

            // Limit to requested count
            const displayInspirations = inspirations.slice(0, count);

            const categoryEmojis = {
                music: '🎵',
                visual: '🎨', 
                technique: '⚙️',
                concept: '💭',
                learning: '📚'
            };

            const embed = {
                color: 0xFF1493, // Electric pink
                title: `✨ Recent Inspirations${categoryFilter ? ` - ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` : ''}`,
                description: `Showing ${displayInspirations.length} of ${inspirations.length} inspirations`,
                fields: [],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `Total inspirations: ${inspirations.length}`
                }
            };

            displayInspirations.forEach((item, index) => {
                const addedDate = new Date(item.addedAt).toLocaleDateString();
                let fieldValue = item.content;
                
                if (item.link) {
                    fieldValue += `\n🔗 [Link](${item.link})`;
                }
                
                if (item.tags && item.tags.length > 0) {
                    fieldValue += `\n🏷️ ${item.tags.map(tag => `\`${tag}\``).join(', ')}`;
                }

                embed.fields.push({
                    name: `${categoryEmojis[item.category]} ${item.title}`,
                    value: `${fieldValue}\n*Added: ${addedDate}*`,
                    inline: false
                });
            });

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Error listing inspirations:', error);
            await interaction.editReply({
                content: '❌ There was an error retrieving your inspirations. Please try again.',
                ephemeral: true
            });
        }
    },
};