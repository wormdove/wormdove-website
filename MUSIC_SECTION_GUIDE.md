# 🎵 WORMDOVE Music Section Setup Guide

## 🎯 Music Section Features

Your website now has a dedicated Music section that showcases your Bandcamp releases!

### ✅ **What's Included:**
- **Clean album grid** with cover artwork
- **Direct Bandcamp links** for each release
- **Hover animations** with play buttons
- **Mobile responsive** design
- **Electric WORMDOVE aesthetic** (black background, green/pink accents)

## 🎨 **Add Album Artwork**

To complete the music section, add these album cover images:

### **Required Images:**
1. **Rest For The Fatherless**
   - Save as: `assets/music/rest-for-the-fatherless.jpg`
   - Recommended size: 500x500px (square format)

2. **Before the Holy Ghost**
   - Save as: `assets/music/before-the-holy-ghost.jpg`
   - Recommended size: 500x500px (square format)

### **Image Requirements:**
- **Format**: JPG or PNG
- **Size**: 500x500px recommended
- **Quality**: High resolution for crisp display
- **File naming**: Use exact filenames shown above

## 🔗 **Current Bandcamp Links**

The music section automatically links to:
- **Main Bandcamp**: https://wormdove.bandcamp.com/
- **Rest For The Fatherless**: https://wormdove.bandcamp.com/album/rest-for-the-fatherless
- **Before the Holy Ghost**: https://wormdove.bandcamp.com/album/before-the-holy-ghost

## ➕ **Adding More Releases**

To add more albums, edit `index.html` and add new `.music-release` blocks:

```html
<div class="music-release">
    <div class="release-cover">
        <img src="./assets/music/your-album.jpg" alt="Your Album" loading="lazy">
        <div class="release-overlay">
            <a href="https://wormdove.bandcamp.com/album/your-album" target="_blank" class="play-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </a>
        </div>
    </div>
    <div class="release-info">
        <h3 class="release-title">Your Album Title</h3>
        <p class="release-type">Album</p>
        <a href="https://wormdove.bandcamp.com/album/your-album" target="_blank" class="release-link">Listen on Bandcamp</a>
    </div>
</div>
```

## 🎨 **Design Features**

- **Black background** for dramatic effect
- **Electric green text** and accents
- **Pink highlights** on buttons and borders
- **Hover animations** that reveal play buttons
- **Professional typography** with WORMDOVE fonts

## 📱 **Mobile Optimized**

- Single column layout on mobile
- Touch-friendly buttons
- Optimized image sizes
- Smooth animations

## 🚀 **Current Status**

- ✅ Music section structure complete
- ✅ Styling and animations ready
- ✅ Bandcamp links configured
- ⏳ **Waiting for album artwork**

Once you add the album cover images, your Music section will be complete and professional-looking!

## 🎵 **Navigation**

The Music section has been added to your main navigation between "About" and "Art" for easy access.