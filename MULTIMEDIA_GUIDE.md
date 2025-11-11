# WORMDOVE Music & Audiovisual Portfolio Guide

## 📁 **Supported File Types**

### � **Music Files**
- `.mp3` (recommended - universal support)
- `.wav` (high quality, best for music production)
- `.flac` (lossless compression)
- `.m4a` (AAC format, good quality/size ratio)

### � **Audiovisual Files**
- `.mp4` (recommended - best browser support)
- `.webm` (good compression, modern browsers)
- `.mov` (high quality for detailed AV work)

### 🖼️ **Image Files**
- `.jpg/.jpeg` (photos, artwork)
- `.png` (graphics with transparency)
- `.webp` (modern format, great compression)
- `.svg` (vector graphics)

## 📂 **Folder Structure**

```
/assets/portfolio/
├── music/
│   ├── electric-pulse.mp3
│   ├── bass-synthesis.wav
│   └── modular-sequences.flac
├── audiovisuals/
│   ├── neon-dreams-av.mp4
│   ├── glitch-patterns.mp4
│   └── digital-rain.webm
├── audio/
│   ├── ambient-frequencies.mp3
│   └── experimental-sounds.wav
├── live-sets/
│   ├── live-performance-2024.mp4
│   └── festival-set.mp4
└── thumbnails/
    ├── electric-pulse-thumb.jpg
    ├── neon-dreams-thumb.jpg
    └── live-performance-thumb.jpg
```

## 🎨 **Adding Your Media**

### **1. Video Portfolio Items:**
```javascript
{
    id: 10,
    title: "Your Video Title",
    category: "video", 
    type: "video",
    media: "./assets/portfolio/videos/your-video.mp4",
    thumbnail: "./assets/portfolio/thumbnails/your-video-thumb.jpg",
    description: "Description of your video art piece"
}
```

### **2. Audio Portfolio Items:**
```javascript
{
    id: 11,
    title: "Your Audio Title",
    category: "audio",
    type: "audio", 
    media: "./assets/portfolio/audio/your-audio.mp3",
    thumbnail: "./assets/portfolio/thumbnails/audio-visualization.jpg",
    description: "Description of your audio piece"
}
```

### **3. Image Portfolio Items:**
```javascript
{
    id: 12,
    title: "Your Artwork Title",
    category: "paintings", // or "digital", "mixed"
    type: "image",
    image: "./assets/portfolio/images/your-artwork.jpg",
    description: "Description of your artwork"
}
```

## 🎯 **Best Practices**

### **File Optimization:**
- **Videos**: Keep under 50MB for web, use H.264 codec
- **Audio**: 128-320 kbps for good quality/size balance  
- **Images**: Optimize for web (usually under 500KB)
- **Thumbnails**: 400x300px recommended, under 100KB

### **Naming Convention:**
- Use lowercase with hyphens: `video-installation-2024.mp4`
- Be descriptive: `ambient-soundscape-forest.mp3`
- Include year if relevant: `painting-abstract-2024.jpg`

### **Accessibility:**
- Always include descriptive alt text
- Provide captions for videos when possible
- Add audio descriptions for complex visual content

## 🚀 **Technical Features**

### **Built-in Player Features:**
- ✅ **Video controls** - Play/pause, scrubbing, fullscreen
- ✅ **Audio controls** - Play/pause, volume, progress
- ✅ **Lazy loading** - Media loads when scrolled into view  
- ✅ **Error handling** - Fallbacks for unsupported formats
- ✅ **Mobile optimized** - Touch-friendly controls
- ✅ **Thumbnail previews** - Custom poster images for videos

### **Interactive Elements:**
- Click overlay to play/pause media
- Hover effects reveal media controls
- Smooth transitions and animations
- Category filtering includes video/audio

## 💡 **Creative Ideas**

### **Video Categories:**
- Performance art documentation
- Time-lapse creation processes  
- Installation walkthroughs
- Artist interviews/statements
- Behind-the-scenes content

### **Audio Categories:**
- Experimental sound art
- Ambient compositions
- Field recordings
- Spoken word/poetry
- Process documentation audio

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **Video not playing**: Check codec (H.264 recommended)
2. **Large file sizes**: Use video compression tools
3. **Audio not loading**: Ensure correct MIME type
4. **Slow loading**: Optimize file sizes and use thumbnails

### **Optimization Tools:**
- **Video**: HandBrake, FFmpeg
- **Audio**: Audacity, online converters  
- **Images**: TinyPNG, ImageOptim

Your multimedia portfolio is now ready to showcase videos, audio, and images beautifully! 🎨