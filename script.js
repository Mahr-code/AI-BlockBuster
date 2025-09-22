// AI News Data
const aiNewsData = [
    {
        id: 1,
        title: "OpenAI Releases GPT-5 with Revolutionary Multimodal Capabilities",
        excerpt: "The latest iteration of GPT introduces unprecedented abilities to process and generate text, images, audio, and video simultaneously.",
        category: "deep-learning",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
        author: "AI Research Team",
        date: "2024-01-15",
        featured: true
    },
    {
        id: 2,
        title: "Google's Gemini Pro Surpasses Human Performance in Reasoning Tasks",
        excerpt: "New benchmarks show Gemini Pro achieving human-level performance across multiple reasoning domains.",
        category: "machine-learning",
        image: "https://images.unsplash.com/photo-1676299251956-415b0b5b0b5b?w=400&h=200&fit=crop",
        author: "Tech Insights",
        date: "2024-01-14",
        featured: true
    },
    {
        id: 3,
        title: "Breakthrough in Quantum Machine Learning Algorithms",
        excerpt: "Researchers develop new quantum algorithms that could revolutionize machine learning.",
        category: "machine-learning",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
        author: "Quantum AI Lab",
        date: "2024-01-13",
        featured: true
    },
    {
        id: 4,
        title: "Meta's Llama 3 Achieves State-of-the-Art Performance",
        excerpt: "The open-source language model demonstrates superior performance in multilingual understanding.",
        category: "nlp",
        image: "https://images.unsplash.com/photo-1676299251956-415b0b5b0b5b?w=400&h=200&fit=crop",
        author: "AI Weekly",
        date: "2024-01-12"
    },
    {
        id: 5,
        title: "Autonomous Robots Navigate Complex Environments",
        excerpt: "New navigation algorithms enable robots to autonomously traverse challenging terrains.",
        category: "robotics",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
        author: "Robotics Today",
        date: "2024-01-11"
    },
    {
        id: 6,
        title: "Neural Networks Break New Ground in Medical Diagnosis",
        excerpt: "AI systems achieve 99% accuracy in detecting early-stage diseases.",
        category: "deep-learning",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
        author: "Health AI",
        date: "2024-01-10"
    }
];

const trendingTopics = [
    { icon: "fas fa-brain", title: "Neural Networks", description: "Latest developments in neural network architectures" },
    { icon: "fas fa-language", title: "Natural Language Processing", description: "Advances in language understanding" },
    { icon: "fas fa-eye", title: "Computer Vision", description: "Breakthroughs in image and video analysis" },
    { icon: "fas fa-robot", title: "Robotics", description: "AI-powered autonomous systems" },
    { icon: "fas fa-chart-line", title: "Machine Learning", description: "New algorithms and applications" },
    { icon: "fas fa-microchip", title: "AI Hardware", description: "Specialized chips and infrastructure" }
];

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const featuredGrid = document.getElementById('featuredGrid');
const newsGrid = document.getElementById('newsGrid');
const trendingGrid = document.getElementById('trendingGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const newsletterForm = document.getElementById('newsletterForm');

// State
let currentCategory = 'all';
let currentPage = 1;
let filteredNews = [...aiNewsData];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedNews();
    loadNews();
    loadTrendingTopics();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    navToggle.addEventListener('click', toggleMobileMenu);
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', e => e.key === 'Enter' && performSearch());
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterNews(btn.dataset.category));
    });
    
    loadMoreBtn.addEventListener('click', loadMoreNews);
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Navigation Links - Handle internal sections and external links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an internal section link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
                updateActiveNavLink(this);
            }
            // If it's an external link, let it open normally (or in new tab if target="_blank")
        });
    });
}

// Mobile Menu
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    filteredNews = searchTerm === '' ? [...aiNewsData] : 
        aiNewsData.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm)
        );
    currentPage = 1;
    loadNews();
    showNotification(`Found ${filteredNews.length} articles`);
}

// Filter News
function filterNews(category) {
    currentCategory = category;
    currentPage = 1;
    filteredNews = category === 'all' ? [...aiNewsData] : 
        aiNewsData.filter(article => article.category === category);
    
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    loadNews();
}

// Load Featured News
function loadFeaturedNews() {
    const featured = aiNewsData.filter(article => article.featured);
    featuredGrid.innerHTML = featured.map(article => `
        <article class="featured-card fade-in" onclick="openArticle(${article.id})">
            <img src="${article.image}" alt="${article.title}">
            <div class="featured-card-content">
                <div class="featured-card-category">${formatCategory(article.category)}</div>
                <h3 class="featured-card-title">${article.title}</h3>
                <p class="featured-card-excerpt">${article.excerpt}</p>
                <div class="featured-card-meta">
                    <span>${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Load News
function loadNews() {
    const startIndex = 0;
    const endIndex = currentPage * 6;
    const newsToShow = filteredNews.slice(startIndex, endIndex);
    
    if (currentPage === 1) newsGrid.innerHTML = '';
    
    newsGrid.innerHTML += newsToShow.map(article => `
        <article class="news-card fade-in" onclick="openArticle(${article.id})">
            <img src="${article.image}" alt="${article.title}">
            <div class="news-card-content">
                <div class="news-card-category">${formatCategory(article.category)}</div>
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-excerpt">${article.excerpt}</p>
                <div class="news-card-meta">
                    <span>${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
        </article>
    `).join('');
    
    loadMoreBtn.style.display = endIndex >= filteredNews.length ? 'none' : 'block';
}

// Load More
function loadMoreNews() {
    currentPage++;
    loadNews();
}

// Load Trending
function loadTrendingTopics() {
    trendingGrid.innerHTML = trendingTopics.map(topic => `
        <div class="trending-card fade-in" onclick="searchTopic('${topic.title}')">
            <i class="${topic.icon}"></i>
            <h3>${topic.title}</h3>
            <p>${topic.description}</p>
        </div>
    `).join('');
}

// Utilities
function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function openArticle(articleId) {
    const article = aiNewsData.find(a => a.id === articleId);
    if (article) {
        showArticleModal(article);
    }
}

function searchTopic(topic) {
    searchInput.value = topic;
    performSearch();
}

function showArticleModal(article) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${article.image}" alt="${article.title}">
            <div class="modal-body">
                <div class="article-category">${formatCategory(article.category)}</div>
                <h2>${article.title}</h2>
                <p>${article.excerpt}</p>
                <div class="article-meta">
                    <span>By ${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
                <p>This is a detailed article about ${article.title.toLowerCase()}. 
                In a real application, this would contain the full article content.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => e.target === modal && modal.remove();
}

// Newsletter
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification('Thank you for subscribing!');
    e.target.reset();
}

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6366f1;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add modal styles
const modalStyles = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    }
    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }
    .modal-content img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: 16px 16px 0 0;
    }
    .modal-body {
        padding: 2rem;
    }
    .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    }
    .article-category {
        color: #6366f1;
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
    }
    .article-meta {
        display: flex;
        gap: 1rem;
        color: #9ca3af;
        font-size: 0.875rem;
        margin: 1rem 0;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Welcome message
setTimeout(() => showNotification('Welcome to AI News Hub! 🚀'), 1000);
