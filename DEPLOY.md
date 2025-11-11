# Firebase Deployment Guide

## Quick Deploy Steps

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Project (if needed)
```bash
firebase init hosting
```
Select:
- Use an existing project or create new one
- Public directory: `.` (current directory)
- Configure as single-page app: `No`
- Set up automatic builds: `No`

### 4. Deploy
```bash
firebase deploy
```

### 5. Custom Domain (Optional)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Hosting
3. Click "Add custom domain"
4. Follow the verification steps

## Configuration Files

- `firebase.json` - Firebase hosting configuration
- `.gitignore` - Files to ignore in version control

## Your website will be live at:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

## Next Steps After Deployment

1. **Add your artwork images** to `/assets/portfolio/`
2. **Update portfolio data** in `js/script.js`
3. **Customize colors and branding** in `css/styles.css`
4. **Add your contact information** in `index.html`
5. **Test the contact form** and integrate with your preferred service
6. **Set up analytics** (Google Analytics, etc.)

## Tips

- Keep images under 1MB for fast loading
- Use descriptive alt text for SEO
- Test on mobile devices
- Consider adding a blog or news section
- Set up automatic backups of your content