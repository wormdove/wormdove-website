// ==========================================
// PORTFOLIO DATA
// ==========================================
// WORMDOVE Art Portfolio - YouTube Integration
let portfolioData = [];

// YouTube Channel Configuration
const YOUTUBE_CONFIG = {
    channelId: 'UCkmZ0NJg0ZasfOSNgnGr05A', // WORMDOVE YouTube Channel
    apiKey: 'AIzaSyCJyfkbzPYpwWFuN9W8J53byIHGA6U9YuU', // YouTube Data API Key
    maxResults: 50, // Maximum videos to fetch
    enabled: true // YouTube integration is now ACTIVE!
};

// YouTube Integration Functions
class YouTubeIntegration {
    constructor() {
        this.baseUrl = 'https://www.googleapis.com/youtube/v3';
        this.portfolioInstance = null;
        this.init();
    }

    setPortfolioInstance(portfolio) {
        this.portfolioInstance = portfolio;
        console.log('🔗 Portfolio instance connected to YouTube integration');
        
        // If we already have data, re-render immediately
        if (portfolioData.length > 0) {
            console.log('📺 Re-rendering with existing YouTube data');
            this.portfolioInstance.renderPortfolio();
        }
    }

    async init() {
        if (YOUTUBE_CONFIG.enabled && YOUTUBE_CONFIG.apiKey && YOUTUBE_CONFIG.channelId) {
            try {
                await this.fetchYouTubeVideos();
                // Re-render portfolio after loading YouTube data
                if (this.portfolioInstance) {
                    this.portfolioInstance.renderPortfolio();
                }
            } catch (error) {
                console.warn('YouTube API error:', error);
                this.fallbackToEmptyState();
            }
        } else {
            this.fallbackToEmptyState();
        }
    }

    async fetchYouTubeVideos() {
        const searchUrl = `${this.baseUrl}/search?key=${YOUTUBE_CONFIG.apiKey}&channelId=${YOUTUBE_CONFIG.channelId}&part=snippet,id&order=date&maxResults=${YOUTUBE_CONFIG.maxResults}&type=video`;
        
        try {
            const response = await fetch(searchUrl);
            const data = await response.json();
            
            if (data.error) {
                console.error('YouTube API error:', data.error);
                throw new Error(data.error.message);
            }
            
            if (data.items && data.items.length > 0) {
                portfolioData = data.items.map((item, index) => ({
                    id: index + 1,
                    title: item.snippet.title,
                    category: "art",
                    type: "youtube",
                    videoId: item.id.videoId,
                    media: `https://www.youtube.com/embed/${item.id.videoId}`,
                    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
                    description: item.snippet.description.substring(0, 150) + '...',
                    publishedAt: item.snippet.publishedAt,
                    channelTitle: item.snippet.channelTitle
                }));
                
                console.log(`✅ Loaded ${portfolioData.length} YouTube videos from WORMDOVE channel`);
                
                // Trigger portfolio re-render
                if (this.portfolioInstance) {
                    this.portfolioInstance.renderPortfolio();
                }
            } else {
                console.warn('No videos found for channel');
                this.fallbackToEmptyState();
            }
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            throw error;
        }
    }

    fallbackToEmptyState() {
        portfolioData = [];
        console.log('📺 YouTube integration disabled - showing empty state');
    }
}

// Initialize YouTube integration
const youtubeIntegration = new YouTubeIntegration();

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navMenu = document.querySelector('.nav-menu');
        this.navHamburger = document.querySelector('.nav-hamburger');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleScroll();
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.navHamburger?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                this.navMenu?.classList.remove('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }
}

// ==========================================
// PORTFOLIO FUNCTIONALITY
// ==========================================
class Portfolio {
    constructor() {
        this.portfolioGrid = document.querySelector('.portfolio-grid');
        
        this.init();
    }
    
    init() {
        // Render immediately to show loading state, then YouTube will trigger re-render
        this.renderPortfolio();
    }
    
    renderPortfolio() {
        if (!this.portfolioGrid) return;
        
        const filteredData = portfolioData; // Show all content since no filtering needed
        
        // Debug: Log portfolio data to verify content
        console.log('Portfolio data length:', filteredData.length);
        console.log('Portfolio data content:', filteredData);
        
        if (filteredData.length === 0) {
            this.portfolioGrid.innerHTML = `
                <div class="portfolio-empty">
                    <h3>Loading WORMDOVE Content...</h3>
                    <p>Fetching videos from YouTube channel</p>
                    <p>YouTube Integration: ${YOUTUBE_CONFIG.enabled ? '✅ Enabled' : '❌ Disabled'}</p>
                    <small>Channel ID: ${YOUTUBE_CONFIG.channelId}</small>
                </div>
            `;
            return;
        }

        this.portfolioGrid.innerHTML = filteredData.map(item => {
            let mediaElement = '';
            
            switch(item.type) {
                case 'youtube':
                    mediaElement = `
                        <div class="portfolio-media-container">
                            <div class="youtube-video-card" onclick="this.classList.toggle('playing')">
                                <div class="youtube-thumbnail" style="background-image: url('${item.thumbnail}')">
                                    <div class="youtube-play-button">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                    <div class="youtube-duration">YouTube</div>
                                </div>
                                <iframe 
                                    src="${item.media}?autoplay=1&rel=0&modestbranding=1" 
                                    title="${item.title}"
                                    frameborder="0" 
                                    allowfullscreen
                                    loading="lazy"
                                    class="youtube-iframe">
                                </iframe>
                            </div>
                            <div class="youtube-links">
                                <a href="https://www.youtube.com/watch?v=${item.videoId}" target="_blank" class="youtube-link">
                                    <span>▶️ Watch on YouTube</span>
                                </a>
                                <a href="https://www.youtube.com/channel/${YOUTUBE_CONFIG.channelId}" target="_blank" class="channel-link">
                                    <span>📺 Visit Channel</span>
                                </a>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'video':
                    mediaElement = `
                        <div class="portfolio-media-container">
                            <video class="portfolio-video" controls poster="${item.thumbnail}" preload="metadata">
                                <source src="${item.media}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="media-overlay">
                                <span class="media-icon">▶️</span>
                                <span class="media-type">Video</span>
                            </div>
                        </div>
                    `;
                    break;
                    
                case 'audio':
                    mediaElement = `
                        <div class="portfolio-media-container">
                            <div class="audio-thumbnail" style="background-image: url('${item.thumbnail}');">
                                <audio class="portfolio-audio" controls preload="metadata">
                                    <source src="${item.media}" type="audio/mp3">
                                    <source src="${item.media}" type="audio/mpeg">
                                    Your browser does not support the audio tag.
                                </audio>
                            </div>
                            <div class="media-overlay">
                                <span class="media-icon">🎵</span>
                                <span class="media-type">Audio</span>
                            </div>
                        </div>
                    `;
                    break;
                    
                default: // image
                    mediaElement = `
                        <img src="${item.image || item.media}" alt="${item.title}" loading="lazy">
                    `;
            }
            
            return `
                <div class="portfolio-item" data-category="${item.category}" data-type="${item.type}">
                    ${mediaElement}
                    <div class="portfolio-content">
                        <h3 class="portfolio-title">${item.title}</h3>
                        <p class="portfolio-category">${item.category.replace('-', ' ')}</p>
                        <p class="portfolio-description">${item.description}</p>
                        ${item.publishedAt ? `<small class="portfolio-date">Published: ${new Date(item.publishedAt).toLocaleDateString()}</small>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        // Add animation delay for staggered effect
        this.animatePortfolioItems();
        
        // Initialize media players
        this.initializeMediaPlayers();
    }
    
    animatePortfolioItems() {
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    initializeMediaPlayers() {
        // Initialize video players
        const videos = document.querySelectorAll('.portfolio-video');
        videos.forEach(video => {
            video.addEventListener('loadedmetadata', () => {
                // Video loaded successfully
                console.log('Video loaded:', video.src);
            });
            
            video.addEventListener('error', (e) => {
                console.error('Video error:', e);
                // You could add fallback image here
            });
        });
        
        // Initialize audio players
        const audios = document.querySelectorAll('.portfolio-audio');
        audios.forEach(audio => {
            audio.addEventListener('loadedmetadata', () => {
                console.log('Audio loaded:', audio.src);
            });
            
            audio.addEventListener('error', (e) => {
                console.error('Audio error:', e);
            });
        });
        
        // Add click handlers for media overlays
        const mediaContainers = document.querySelectorAll('.portfolio-media-container');
        mediaContainers.forEach(container => {
            const overlay = container.querySelector('.media-overlay');
            const video = container.querySelector('video');
            const audio = container.querySelector('audio');
            
            if (overlay && (video || audio)) {
                overlay.addEventListener('click', () => {
                    if (video) {
                        if (video.paused) {
                            video.play();
                        } else {
                            video.pause();
                        }
                    }
                    if (audio) {
                        if (audio.paused) {
                            audio.play();
                        } else {
                            audio.pause();
                        }
                    }
                });
            }
        });
    }
}

// ==========================================
// CONTACT FORM FUNCTIONALITY
// ==========================================
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with your actual endpoint)
            await this.simulateSubmission(data);
            
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async simulateSubmission(data) {
        // Replace this with your actual form submission logic
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1000);
        });
    }
    
    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create and show new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            padding: 12px 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.init();
    }
    
    init() {
        this.createObserver();
        this.observeElements();
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    observeElements() {
        this.elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.preloadCriticalAssets();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    preloadCriticalAssets() {
        const criticalImages = [
            './assets/hero-image.jpg',
            './assets/artist-photo.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// ==========================================
// THEME UTILITIES
// ==========================================
class ThemeManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setSystemTheme();
        this.handleThemeChanges();
    }
    
    setSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Add dark theme support if needed
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    handleThemeChanges() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        });
    }
}

// ==========================================
// ANALYTICS & TRACKING (Optional)
// ==========================================
class Analytics {
    constructor() {
        this.init();
    }
    
    init() {
        this.trackPageViews();
        this.trackInteractions();
    }
    
    trackPageViews() {
        // Add your analytics tracking code here
        console.log('Page view tracked');
    }
    
    trackInteractions() {
        // Track portfolio item clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-item')) {
                console.log('Portfolio item clicked');
            }
            
            if (e.target.closest('.btn')) {
                console.log('Button clicked:', e.target.textContent);
            }
        });
    }
}

// ==========================================
// INSPIRATIONS SYSTEM
// ==========================================
class InspirationsManager {
    constructor() {
        this.inspirations = [];
        this.filteredInspirations = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.container = null;
        this.isLoading = false;
        
        this.categoryEmojis = {
            music: '🎵',
            visual: '🎨',
            technique: '⚙️',
            concept: '💭',
            learning: '📚'
        };
        
        this.init();
    }
    
    async init() {
        this.container = document.querySelector('.inspirations-grid');
        if (!this.container) return;
        
        this.setupEventListeners();
        await this.loadInspirations();
        this.renderInspirations();
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Apply filter
                this.currentFilter = e.target.dataset.category;
                this.applyFilters();
            });
        });
        
        // Search input
        const searchInput = document.querySelector('#inspirations-search');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.applyFilters();
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.applyFilters();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }
    }
    
    async loadInspirations() {
        try {
            this.showLoading();
            
            const response = await fetch('./assets/inspirations.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.inspirations = await response.json();
            console.log(`✨ Loaded ${this.inspirations.length} inspirations`);
            
        } catch (error) {
            console.warn('Could not load inspirations:', error);
            this.inspirations = [];
        } finally {
            this.hideLoading();
        }
    }
    
    applyFilters() {
        this.filteredInspirations = this.inspirations.filter(item => {
            // Category filter
            const categoryMatch = this.currentFilter === 'all' || item.category === this.currentFilter;
            
            // Search filter
            const searchMatch = this.searchTerm === '' || 
                item.title.toLowerCase().includes(this.searchTerm) ||
                item.content.toLowerCase().includes(this.searchTerm) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(this.searchTerm)));
                
            return categoryMatch && searchMatch;
        });
        
        this.renderInspirations();
    }
    
    renderInspirations() {
        if (!this.container) return;
        
        // Clear loading message
        this.hideLoading();
        
        if (this.inspirations.length === 0) {
            this.showEmptyState();
            return;
        }
        
        if (this.filteredInspirations.length === 0) {
            this.showNoResults();
            return;
        }
        
        // Hide empty state
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) emptyState.style.display = 'none';
        
        // Render inspirations
        this.container.innerHTML = this.filteredInspirations.map(item => this.createInspirationCard(item)).join('');
        
        // Add fade-in animation
        requestAnimationFrame(() => {
            const cards = this.container.querySelectorAll('.inspiration-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'all 0.4s ease';
                    
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }, index * 100);
            });
        });
    }
    
    createInspirationCard(item) {
        const date = new Date(item.addedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        const categoryEmoji = this.categoryEmojis[item.category] || '✨';
        const categoryName = item.category.charAt(0).toUpperCase() + item.category.slice(1);
        
        let imageHtml = '';
        if (item.image) {
            imageHtml = `<img src="${item.image}" alt="${item.title}" class="inspiration-image" loading="lazy">`;
        }
        
        let linkHtml = '';
        if (item.link) {
            linkHtml = `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="inspiration-link">
                View Source →
            </a>`;
        }
        
        let tagsHtml = '';
        if (item.tags && item.tags.length > 0) {
            tagsHtml = `
                <div class="inspiration-tags">
                    ${item.tags.map(tag => `<span class="inspiration-tag">${tag}</span>`).join('')}
                </div>
            `;
        }
        
        return `
            <div class="inspiration-card" data-category="${item.category}">
                <div class="inspiration-header">
                    <span class="inspiration-category">${categoryEmoji} ${categoryName}</span>
                    <span class="inspiration-date">${date}</span>
                </div>
                <div class="inspiration-content">
                    <h3>${item.title}</h3>
                    <p class="inspiration-text">${item.content}</p>
                    ${imageHtml}
                    ${linkHtml}
                    ${tagsHtml}
                </div>
            </div>
        `;
    }
    
    showLoading() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="loading-message">
                <p>Loading inspirations...</p>
            </div>
        `;
    }
    
    hideLoading() {
        const loading = document.querySelector('.loading-message');
        if (loading) {
            loading.remove();
        }
    }
    
    showEmptyState() {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        this.container.innerHTML = '';
    }
    
    showNoResults() {
        const searchTerm = this.searchTerm;
        const filterName = this.currentFilter === 'all' ? 'this search' : `"${this.currentFilter}"`;
        
        this.container.innerHTML = `
            <div class="loading-message">
                <p>No inspirations found for ${filterName}${searchTerm ? ` matching "${searchTerm}"` : ''}.</p>
                <p style="margin-top: 1rem; opacity: 0.7;">Try adjusting your filters or search terms.</p>
            </div>
        `;
        
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) emptyState.style.display = 'none';
    }
    
    // Method to refresh inspirations (can be called externally)
    async refresh() {
        await this.loadInspirations();
        this.applyFilters();
    }
}

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================
class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        // Initialize all components
        new Navigation();
        const portfolio = new Portfolio();
        new ContactForm();
        new ScrollAnimations();
        new PerformanceOptimizer();
        new ThemeManager();
        new Analytics();
        new InspirationsManager();
        
        // Connect YouTube integration with portfolio
        youtubeIntegration.setPortfolioInstance(portfolio);
        
        // Add any additional setup
        this.setupErrorHandling();
        this.setupServiceWorker();
        
        console.log('🎨 Artist website loaded successfully!');
    }
    
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    async setupServiceWorker() {
        // Service worker disabled to prevent caching issues
        // This ensures all browsers see the latest version
        console.log('Service worker disabled for consistent cross-browser experience');
    }
}

// Start the application
new App();