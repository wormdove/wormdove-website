# 📸 WORMDOVE Image Setup Guide

## 🎯 Where to Add Your Images

### 1. Artist Photo (About Section)
- **File Location**: `./assets/artist-photo.jpg`
- **Recommended Size**: 800x800px (square format works best)
- **Used In**: About section, right side of the page
- **Current HTML**: `<img src="./assets/artist-photo.jpg" alt="Artist Photo" loading="lazy">`

### 2. Featured Artwork (Hero Section)
- **File Location**: `./assets/hero-image.jpg` 
- **Recommended Size**: 1200x800px (landscape format)
- **Used In**: Hero section, right side of main banner
- **Current HTML**: `<img src="./assets/hero-image.jpg" alt="Featured Artwork" loading="lazy">`

### 3. Portfolio Content
- **Audio Files**: `./assets/portfolio/audio/your-track.mp3`
- **Video Files**: `./assets/portfolio/videos/your-video.mp4`
- **Thumbnails**: `./assets/portfolio/thumbnails/your-thumbnail.jpg`
- **Added Via**: `node add-portfolio-item.js` helper script

## 🚀 Quick Setup Steps

### Option A: Manual File Addition
1. **Add your artist photo**: Save as `assets/artist-photo.jpg`
2. **Add featured artwork**: Save as `assets/hero-image.jpg`
3. **Deploy**: Run `firebase deploy`

### Option B: Use Helper Script
```bash
node setup-images.js
```

## 📐 Image Requirements

### Artist Photo
- **Format**: JPG or PNG
- **Dimensions**: 800x800px minimum
- **Aspect Ratio**: Square (1:1) preferred
- **File Size**: Under 500KB for fast loading

### Featured Artwork  
- **Format**: JPG or PNG
- **Dimensions**: 1200x800px minimum
- **Aspect Ratio**: 3:2 or 16:10 landscape
- **File Size**: Under 1MB for fast loading

### Portfolio Thumbnails
- **Format**: JPG or PNG
- **Dimensions**: 600x600px
- **Aspect Ratio**: Square (1:1)
- **File Size**: Under 200KB each

## 🎨 Current Image Placeholders

The website currently expects these two main images:
1. `./assets/artist-photo.jpg` - Your professional photo for the About section
2. `./assets/hero-image.jpg` - A featured piece of your artwork for the main banner

## 🔧 Need to Change Image Names?

If you want to use different filenames, update the HTML in `index.html`:
- Line ~55: `src="./assets/hero-image.jpg"` 
- Line ~84: `src="./assets/artist-photo.jpg"`

## 📱 Responsive Behavior

Both images automatically resize for mobile devices and have lazy loading for performance.