# 🎵 WORMDOVE Portfolio Quick Guide

## 📁 **File Organization**

### **1. Place Your Files:**
```
/assets/portfolio/
├── music/           ← .mp3, .wav, .flac files
├── audiovisuals/    ← .mp4, .webm AV pieces
├── audio/           ← Sound design, experiments  
├── videos/          ← Pure video content
├── live-sets/       ← Performance recordings
└── thumbnails/      ← Cover art & video stills
```

### **2. Add to Portfolio:**

Open `js/script.js` and add to the `portfolioData` array:

```javascript
{
    id: 10, // Next available number
    title: "Your Track Name",
    category: "music", // music, audiovisual, audio, video, live
    type: "audio", // audio or video
    media: "./assets/portfolio/music/your-file.mp3",
    thumbnail: "./assets/portfolio/thumbnails/artwork.jpg", 
    description: "Your track description"
}
```

## ⚡ **Quick Add Methods**

### **Option A: Manual (5 minutes)**
1. Copy your audio/video file to the right folder
2. Add a thumbnail image (800x600px recommended)
3. Edit `js/script.js` to add the new entry
4. Refresh website

### **Option B: Helper Script**
```bash
node add-portfolio-item.js
```
Follow the prompts and it will:
- Ask for track details
- Automatically add to portfolio data
- Tell you where to place files

### **Option C: Batch Upload**
1. Place multiple files in folders
2. Edit `portfolioData` array with multiple entries
3. Use incremental IDs (10, 11, 12, etc.)

## 🎨 **Thumbnail Tips**

### **Music Tracks:**
- Abstract visualizations
- Waveform graphics
- Album art style
- Color matching your brand

### **Audiovisual Pieces:**
- Key frame from video
- Screenshot of visual elements
- Composite of multiple frames

### **Live Performances:**
- Performance photos
- Equipment setup shots
- Venue/lighting images

## 🎯 **Categories Explained**

- **music**: Pure audio tracks, compositions
- **audiovisual**: Synchronized audio + video 
- **audio**: Sound design, field recordings, experiments
- **video**: Visual-only pieces, projections
- **live**: Performance documentation

## 🔧 **File Optimization**

### **Audio:**
- MP3: 320kbps (final) or 128kbps (preview)
- WAV: High quality but large files
- Keep previews under 3 minutes for web

### **Video:**
- MP4 with H.264 codec
- 1080p maximum resolution  
- Under 100MB for best loading
- 2-5 minutes ideal length

### **Thumbnails:**
- 800x600px or 1:1 square
- JPG format, under 100KB
- High contrast for visibility

## 🚀 **After Adding Content**

1. **Test locally**: Refresh http://localhost:8000
2. **Check all categories**: Use filter buttons
3. **Mobile test**: Verify on phone/tablet  
4. **Deploy**: `firebase deploy` when ready

Your WORMDOVE portfolio will automatically:
✅ Display in the grid
✅ Work with category filters  
✅ Show proper audio/video players
✅ Be mobile responsive
✅ Load progressively

Happy creating! 🎶⚡