const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inspiration-help')
        .setDescription('Show help information for the inspiration bot'),

    async execute(interaction) {
        const embed = {
            color: 0x00FF41, // Electric green
            title: '✨ WORMDOVE Inspiration Bot Help',
            description: 'This bot helps you maintain a study log and catalog of inspirations that automatically appear on your website!',
            fields: [
                {
                    name: '📝 /add-inspiration',
                    value: 'Add a new inspiration to your study log\n• **title**: Main title of the inspiration\n• **content**: Description or notes\n• **category**: music, visual, technique, concept, or learning\n• **link** (optional): URL to the inspiration\n• **image** (optional): Upload an image\n• **tags** (optional): Comma-separated tags',
                    inline: false
                },
                {
                    name: '📋 /list-inspirations',
                    value: 'View recent inspirations from your study log\n• **category** (optional): Filter by category\n• **count** (optional): Number to show (1-10, default: 5)',
                    inline: false
                },
                {
                    name: '🗑️ /remove-inspiration',
                    value: 'Remove an inspiration from your study log\n• **title**: Title of inspiration to remove (partial match works)',
                    inline: false
                },
                {
                    name: '🎨 Categories',
                    value: '🎵 **Music** - Songs, artists, albums, sounds\n🎨 **Visual** - Art, videos, designs, aesthetics\n⚙️ **Technique** - Production tips, technical knowledge\n💭 **Concept** - Ideas, themes, creative concepts\n📚 **Learning** - Tutorials, courses, educational content',
                    inline: false
                },
                {
                    name: '🌐 Website Integration',
                    value: 'All inspirations automatically appear in the "Study Log & Inspirations" section on your website at wormdove.com with filtering and search capabilities!',
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'WORMDOVE - Electronic Music & Audiovisual Art'
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};