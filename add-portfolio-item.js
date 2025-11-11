#!/usr/bin/env node

// WORMDOVE Portfolio Manager
// Quick script to add new portfolio items

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function addPortfolioItem() {
    console.log('🎵 WORMDOVE Portfolio Manager\n');
    
    try {
        // Get input from user
        const title = await askQuestion('Track/AV Title: ');
        const category = "art"; // Single category for all WORMDOVE work
        const type = await askQuestion('Type (audio/video): ');
        const filename = await askQuestion('File name (with extension): ');
        const thumbnail = await askQuestion('Thumbnail name (with extension): ');
        const description = await askQuestion('Description: ');
        
        // Read current portfolio data
        const scriptPath = path.join(__dirname, 'js', 'script.js');
        let scriptContent = fs.readFileSync(scriptPath, 'utf8');
        
        // Find the portfolioData array
        const dataStart = scriptContent.indexOf('const portfolioData = [');
        const dataEnd = scriptContent.indexOf('];', dataStart);
        
        if (dataStart === -1 || dataEnd === -1) {
            throw new Error('Could not find portfolioData array');
        }
        
        // Get current data and find next ID
        const currentDataText = scriptContent.substring(dataStart, dataEnd + 2);
        const idMatches = currentDataText.match(/id:\s*(\d+)/g);
        const maxId = Math.max(...idMatches.map(match => parseInt(match.match(/\d+/)[0])));
        const newId = maxId + 1;
        
        // Create new portfolio item - all goes in portfolio folder
        const folder = type === 'video' ? 'videos' : 'audio';
        
        const newItem = `    {
        id: ${newId},
        title: "${title}",
        category: "${category}",
        type: "${type}",
        media: "./assets/portfolio/${folder}/${filename}",
        thumbnail: "./assets/portfolio/thumbnails/${thumbnail}",
        description: "${description}"
    },`;
        
        // Insert new item
        const beforeArray = scriptContent.substring(0, dataEnd);
        const afterArray = scriptContent.substring(dataEnd);
        
        const updatedContent = beforeArray + '\n' + newItem + afterArray;
        
        // Write back to file
        fs.writeFileSync(scriptPath, updatedContent);
        
        console.log(`\n✅ Added "${title}" to portfolio!`);
        console.log(`📁 Place your file at: assets/portfolio/${folder}/${filename}`);
        console.log(`🖼️ Place thumbnail at: assets/portfolio/thumbnails/${thumbnail}`);
        console.log('\n🚀 Refresh your website to see the changes!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    
    rl.close();
}

// Run the script
addPortfolioItem();