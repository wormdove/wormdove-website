# Artist Portfolio Website

A modern, responsive artist portfolio website built with HTML, CSS, and JavaScript. Designed to showcase artwork beautifully and professionally, with Firebase hosting capabilities.

## 🎨 Features

- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** - Clean, professional aesthetic
- **Portfolio Gallery** - Filterable artwork showcase
- **Contact Form** - Direct communication with visitors
- **Performance Optimized** - Fast loading and smooth animations
- **Firebase Ready** - Easy deployment to Firebase Hosting
- **SEO Optimized** - Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (for Firebase CLI)
- [Firebase CLI](https://firebase.google.com/docs/cli) installed globally

### Installation

1. **Clone or download this project**
2. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:
   ```bash
   firebase login
   ```

4. **Initialize Firebase** (if needed):
   ```bash
   firebase init hosting
   ```

### Customization

#### 1. Replace Placeholder Content
- Update `index.html` with your personal information
- Replace placeholder images in `/assets/` folder
- Modify portfolio data in `js/script.js`

#### 2. Add Your Artwork
- Add images to `/assets/portfolio/` directory
- Update the `portfolioData` array in `js/script.js`
- Recommended image sizes: 800x600px or similar aspect ratio

#### 3. Customize Styling
- Modify colors, fonts, and layout in `css/styles.css`
- Update CSS custom properties (variables) at the top of the file

#### 4. Configure Contact Form
- Update contact information in `index.html`
- Configure form submission in `js/script.js` (currently shows placeholder)

### Deployment to Firebase

1. **Build and deploy**:
   ```bash
   firebase deploy
   ```

2. **Your website will be live at**:
   ```
   https://your-project-id.web.app
   ```

### Custom Domain (Optional)
1. Purchase your domain
2. In Firebase Console, go to Hosting
3. Add custom domain and follow verification steps

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles and responsive design
├── js/
│   └── script.js          # JavaScript functionality
├── assets/
│   ├── portfolio/         # Your artwork images
│   ├── hero-image.jpg     # Main hero image
│   ├── artist-photo.jpg   # Your photo
│   └── favicon.ico        # Website icon
├── firebase.json          # Firebase configuration
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## 🎯 Customization Guide

### Portfolio Data
Edit the `portfolioData` array in `js/script.js`:

```javascript
const portfolioData = [
    {
        id: 1,
        title: "Your Artwork Title",
        category: "paintings", // or "digital", "mixed"
        image: "./assets/portfolio/your-image.jpg",
        description: "Description of your artwork"
    },
    // Add more artworks...
];
```

### Color Scheme
Modify CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main brand color */
    --secondary-color: #3498db;     /* Accent color */
    --accent-color: #e74c3c;       /* Highlight color */
    /* ... more colors */
}
```

### Contact Information
Update contact details in `index.html`:

```html
<div class="contact-item">
    <span class="contact-icon">📧</span>
    <a href="mailto:your.email@example.com">your.email@example.com</a>
</div>
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

For local development:
1. Open `index.html` in a web browser, or
2. Use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

## 📈 Performance Features

- Lazy loading for images
- Optimized CSS and JavaScript
- Responsive images
- Minimal dependencies
- Service Worker ready (optional)

## 🎨 Customization Ideas

- Add more sections (exhibitions, press, shop)
- Implement a blog section
- Add animation effects
- Create a dark/light theme toggle
- Integrate with social media APIs
- Add e-commerce functionality

## 📞 Support

Need help customizing your website? The code is well-commented and modular for easy modifications.

## 📄 License

This project is open source. Feel free to use it for your portfolio!

---

**Happy creating! 🎨**