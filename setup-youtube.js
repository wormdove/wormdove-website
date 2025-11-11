#!/usr/bin/env node

/**
 * WORMDOVE YouTube Integration Setup Helper
 * Makes it easy to configure YouTube channel integration
 */

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📺 WORMDOVE YouTube Integration Setup\n');

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function setupYouTubeIntegration() {
    console.log('This will help you connect your YouTube channel to your website.\n');
    
    console.log('🔍 First, let\'s get your YouTube Channel ID:');
    console.log('1. Go to your YouTube channel');
    console.log('2. Copy the URL (e.g., https://youtube.com/@wormdove)');
    console.log('3. If it shows @username, that\'s your handle');
    console.log('4. If it shows /channel/UC..., that\'s your channel ID\n');
    
    const channelInput = await askQuestion('Enter your YouTube channel URL or Channel ID: ');
    
    let channelId = '';
    if (channelInput.includes('@')) {
        // Handle format like @wormdove
        channelId = channelInput.replace('https://youtube.com/', '').replace('@', '@');
        console.log(`\n⚠️  You provided a handle: ${channelId}`);
        console.log('You\'ll need to convert this to a Channel ID using YouTube Studio:');
        console.log('https://studio.youtube.com → Settings → Channel → Advanced Settings\n');
    } else if (channelInput.includes('UC')) {
        // Extract channel ID from URL or use as-is
        channelId = channelInput.includes('/channel/') 
            ? channelInput.split('/channel/')[1] 
            : channelInput;
    } else {
        console.log('\n❌ Invalid format. Please provide either:');
        console.log('- Full YouTube URL: https://youtube.com/@wormdove');
        console.log('- Channel ID: UC1234567890abcdef\n');
        rl.close();
        return;
    }
    
    console.log('\n🔑 Now let\'s get your YouTube API Key:');
    console.log('1. Go to https://console.developers.google.com');
    console.log('2. Create/select a project');
    console.log('3. Enable "YouTube Data API v3"');
    console.log('4. Create credentials → API Key\n');
    
    const apiKey = await askQuestion('Enter your YouTube API Key: ');
    
    if (!apiKey || apiKey.length < 30) {
        console.log('\n❌ Invalid API key. Please check and try again.');
        rl.close();
        return;
    }
    
    const maxResults = await askQuestion('How many videos to show? (default: 50): ') || '50';
    
    // Update the script.js file
    try {
        let scriptContent = fs.readFileSync('./js/script.js', 'utf8');
        
        // Replace the YouTube configuration
        const configRegex = /const YOUTUBE_CONFIG = \{[\s\S]*?\};/;
        const newConfig = `const YOUTUBE_CONFIG = {
    channelId: '${channelId}',
    apiKey: '${apiKey}',
    maxResults: ${maxResults},
    enabled: true
};`;
        
        scriptContent = scriptContent.replace(configRegex, newConfig);
        
        fs.writeFileSync('./js/script.js', scriptContent);
        
        console.log('\n✅ YouTube integration configured successfully!');
        console.log('\n📊 Configuration:');
        console.log(`   Channel ID: ${channelId}`);
        console.log(`   API Key: ${apiKey.substring(0, 8)}...`);
        console.log(`   Max Videos: ${maxResults}`);
        console.log(`   Status: Enabled`);
        
        console.log('\n🚀 Next steps:');
        console.log('1. Run "firebase deploy" to publish changes');
        console.log('2. Visit your website to see your YouTube videos!');
        
        const deploy = await askQuestion('\nDeploy to Firebase now? (y/n): ');
        
        if (deploy.toLowerCase() === 'y' || deploy.toLowerCase() === 'yes') {
            console.log('\n🚀 Deploying to Firebase...\n');
            rl.close();
            
            const { spawn } = require('child_process');
            const deployProcess = spawn('firebase', ['deploy'], { 
                stdio: 'inherit',
                shell: true 
            });
            
            deployProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('\n✅ Deployment successful!');
                    console.log('🌐 Your website: https://wormdove-d9cea.web.app');
                    console.log('📺 Your YouTube videos should now appear in the Art section!');
                } else {
                    console.log('\n❌ Deployment failed. Try running "firebase deploy" manually.');
                }
            });
        } else {
            console.log('\n👍 Configuration saved! Run "firebase deploy" when ready.');
            rl.close();
        }
        
    } catch (error) {
        console.error('\n❌ Error updating configuration:', error.message);
        rl.close();
    }
}

setupYouTubeIntegration().catch(console.error);