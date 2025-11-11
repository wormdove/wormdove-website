#!/usr/bin/env node

/**
 * WORMDOVE Image Setup Helper
 * Helps you set up artist photo and featured artwork
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎨 WORMDOVE Image Setup Helper\n');
console.log('This will help you add your artist photo and featured artwork.\n');

// Ensure assets directory exists
const assetsDir = './assets';
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
    console.log('✅ Created assets directory');
}

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

function copyFile(source, destination) {
    try {
        if (fs.existsSync(source)) {
            fs.copyFileSync(source, destination);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`❌ Error copying file: ${error.message}`);
        return false;
    }
}

async function setupImages() {
    console.log('📷 Let\'s set up your images!\n');
    
    // Artist Photo Setup
    console.log('1️⃣ ARTIST PHOTO SETUP');
    console.log('   This will be shown in the About section');
    console.log('   Recommended: Square format (800x800px)\n');
    
    const artistPhotoPath = await askQuestion('Enter the full path to your artist photo (or press Enter to skip): ');
    
    if (artistPhotoPath) {
        if (copyFile(artistPhotoPath, './assets/artist-photo.jpg')) {
            console.log('✅ Artist photo added successfully!\n');
        } else {
            console.log('❌ Could not find or copy artist photo. Please check the file path.\n');
        }
    } else {
        console.log('⏭️  Skipped artist photo setup\n');
    }
    
    // Featured Artwork Setup  
    console.log('2️⃣ FEATURED ARTWORK SETUP');
    console.log('   This will be shown in the main hero banner');
    console.log('   Recommended: Landscape format (1200x800px)\n');
    
    const heroImagePath = await askQuestion('Enter the full path to your featured artwork (or press Enter to skip): ');
    
    if (heroImagePath) {
        if (copyFile(heroImagePath, './assets/hero-image.jpg')) {
            console.log('✅ Featured artwork added successfully!\n');
        } else {
            console.log('❌ Could not find or copy featured artwork. Please check the file path.\n');
        }
    } else {
        console.log('⏭️  Skipped featured artwork setup\n');
    }
    
    // Summary
    console.log('🎯 SETUP COMPLETE!\n');
    console.log('Next steps:');
    console.log('1. Run "firebase deploy" to publish your changes');
    console.log('2. Use "node add-portfolio-item.js" to add individual artworks');
    console.log('3. Check IMAGE_SETUP_GUIDE.md for more details\n');
    
    const deploy = await askQuestion('Would you like to deploy to Firebase now? (y/n): ');
    
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
            } else {
                console.log('\n❌ Deployment failed. Try running "firebase deploy" manually.');
            }
        });
    } else {
        console.log('\n👍 Remember to run "firebase deploy" when you\'re ready!');
        rl.close();
    }
}

setupImages().catch(console.error);