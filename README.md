# AI News Hub 🚀

A modern, responsive website for AI news and updates built with HTML, CSS, and JavaScript.

## Features

### 🎨 Modern Design
- Clean, professional interface with gradient backgrounds
- Responsive design that works on all devices
- Smooth animations and transitions
- Beautiful typography using Inter font

### 📰 News Sections
- **Featured Stories**: Highlighted AI news articles
- **Latest News**: Recent articles with category filtering
- **Trending Topics**: Popular AI topics and categories
- **Search Functionality**: Find articles by keywords

### 🔧 Interactive Features
- **Category Filters**: Filter news by Machine Learning, Deep Learning, NLP, Robotics
- **Search Bar**: Real-time search through articles
- **Load More**: Pagination for news articles
- **Newsletter Subscription**: Email signup form
- **Mobile Navigation**: Hamburger menu for mobile devices

### 🎯 User Experience
- **Smooth Scrolling**: Navigation between sections
- **Modal Popups**: Detailed article views
- **Notifications**: User feedback for actions
- **Loading States**: Visual feedback during operations
- **Hover Effects**: Interactive card animations

## File Structure

```
ai-news-website/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. The website will load immediately with sample AI news data

### Running Locally
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx serve .

# Or simply open index.html in your browser
```

## Usage Guide

### Navigation
- **Header**: Fixed navigation with logo and menu items
- **Hero Section**: Main landing area with search functionality
- **Featured News**: Top stories displayed prominently
- **Latest News**: Recent articles with filtering options
- **Trending Topics**: Popular AI categories
- **Newsletter**: Email subscription section
- **Footer**: Links and social media

### Search and Filter
1. **Search**: Use the search bar in the hero section
2. **Category Filters**: Click filter buttons to show specific categories
3. **Load More**: Click "Load More News" to see additional articles

### Article Interaction
- Click on any news card to open a detailed modal
- Modal shows full article information
- Close modal by clicking the X or outside the modal

### Mobile Experience
- Responsive design adapts to mobile screens
- Hamburger menu for navigation
- Touch-friendly interface
- Optimized layouts for small screens

## Customization

### Adding News Articles
Edit the `aiNewsData` array in `script.js`:

```javascript
{
    id: 7,
    title: "Your Article Title",
    excerpt: "Article description...",
    category: "machine-learning", // or "deep-learning", "nlp", "robotics"
    image: "image-url.jpg",
    author: "Author Name",
    date: "2024-01-20",
    featured: true // Set to true for featured articles
}
```

### Styling Changes
- Modify CSS variables in `styles.css` for color schemes
- Update gradients and animations
- Customize typography and spacing

### Adding Categories
1. Add new category buttons in `index.html`
2. Update the `aiNewsData` with new category values
3. Add corresponding filter logic in `script.js`

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Adaptive typography

### Performance
- Optimized images with lazy loading
- Efficient DOM manipulation
- Minimal external dependencies
- Fast loading times

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## Future Enhancements

- [ ] Real-time news API integration
- [ ] User authentication system
- [ ] Comment system for articles
- [ ] Dark mode toggle
- [ ] Advanced search filters
- [ ] Social media sharing
- [ ] RSS feed support
- [ ] Progressive Web App features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for the AI community**
