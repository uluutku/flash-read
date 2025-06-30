# 🚀 Flash Read - Modern Speed Reading App

A beautiful, mobile-first React application designed to help you master the art of speed reading with modern UI/UX design and advanced features.

![Flash Read App](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 Core Reading Features

- **Advanced Text Reader** with word-by-word progression
- **Focus Mode** for distraction-free reading
- **Speed Tests** with multiple difficulty levels and durations
- **Progress Tracking** with detailed analytics
- **Reading Mode Themes** (Light, Dark, Sepia)
- **Font Size Controls** for optimal reading comfort

### 📊 Analytics & Progress

- **Real-time WPM tracking** during reading sessions
- **Comprehensive statistics** (words read, time spent, average speed)
- **Achievement system** with unlockable badges
- **Progress charts** showing improvement over time
- **Reading level assessment** with personalized recommendations

### 🎨 Modern UI/UX Design

- **Mobile-first responsive design** that works on all devices
- **Smooth animations** and transitions using Framer Motion
- **Glass morphism effects** and modern gradients
- **Intuitive navigation** with bottom tab bar
- **Beautiful color schemes** and typography

### 🚀 Performance Features

- **Local storage** for persistent settings and progress
- **Optimized rendering** for smooth performance
- **Progressive Web App** ready
- **Fast loading** with Vite build system

## 🛠️ Technology Stack

- **React 19.1.0** - Latest React with modern features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flash-read
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## 🌐 Deployment

### Vercel (Recommended)

The app is optimized for Vercel deployment with built-in routing fixes:

1. **Connect your repository** to Vercel
2. **Deploy automatically** - Vercel will detect the React app
3. **No additional configuration needed** - The app includes:
   - `vercel.json` for proper routing configuration
   - `public/_redirects` for fallback handling
   - HashRouter for client-side routing compatibility

**Why HashRouter?**

- Prevents 404 errors on page refresh
- Works with static hosting platforms
- No server-side routing configuration required

### Manual Deployment

```bash
npm run build
npm run preview
```

### Other Platforms

The app works on any static hosting platform thanks to HashRouter. Simply upload the `dist` folder after building.

## 📱 App Structure

### 🏠 Home Dashboard

- **Reading statistics** overview
- **Quick action buttons** for common tasks
- **Motivational quotes** and daily goals
- **Reading level badge** with current status

### 📖 Reader

- **Text input** with sample texts
- **Focus mode** for word-by-word reading
- **Progress tracking** with real-time stats
- **Text analysis** showing reading level and complexity
- **Play/pause controls** with reset functionality

### ⚡ Speed Test

- **Multiple test durations** (30s, 1m, 2m, 5m)
- **Difficulty levels** (Easy, Standard, Challenging)
- **Real-time WPM calculation**
- **Detailed results** with accuracy metrics
- **Progress visualization**

### 📈 Progress

- **Comprehensive statistics** dashboard
- **Achievement system** with progress tracking
- **Reading level visualization**
- **Historical progress charts**
- **Insights and recommendations**

### ⚙️ Settings

- **Reading mode selection** (Light/Dark/Sepia)
- **Font size controls**
- **Feature toggles**
- **App information** and version details

## 🎯 Key Features Explained

### Speed Reading Techniques

- **Word-by-word progression** to eliminate regression
- **Focus mode** to reduce distractions
- **Timed reading sessions** to build speed
- **Progress tracking** to monitor improvement

### Reading Modes

- **Light Mode**: Clean white background for daytime reading
- **Dark Mode**: Easy on the eyes for low-light environments
- **Sepia Mode**: Warm, paper-like appearance for extended reading

### Achievement System

- **First Steps**: Complete your first reading session
- **Speed Reader**: Achieve 300+ WPM
- **Bookworm**: Read 10,000+ words
- **Marathon Reader**: Spend 60+ minutes reading
- **Consistent**: Complete 10+ sessions
- **Speed Master**: Achieve 500+ WPM

## 🎨 Design System

### Colors

- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green for achievements and progress
- **Warning**: Yellow for medium speed indicators
- **Error**: Red for slow speed indicators

### Typography

- **Primary Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono for technical content
- **Responsive sizing** with clamp() functions
- **Optimized line heights** for readability

### Animations

- **Fade-in effects** for smooth page transitions
- **Scale animations** for interactive elements
- **Progress bars** with smooth transitions
- **Hover effects** for better user feedback

## 📊 Performance Optimizations

- **Lazy loading** of components
- **Optimized CSS** with Tailwind's purge
- **Efficient state management** with React hooks
- **Local storage** for data persistence
- **Minimal bundle size** with tree shaking

## 🔧 Customization

### Adding New Reading Modes

Edit `src/utils/index.js` to add new reading modes:

```javascript
export const readingModes = {
  // ... existing modes
  custom: {
    name: "Custom",
    bg: "bg-custom-bg",
    text: "text-custom-text",
    className: "reading-mode-custom",
  },
};
```

### Adding New Sample Texts

Add new texts to the `sampleTexts` array in `src/utils/index.js`:

```javascript
export const sampleTexts = [
  // ... existing texts
  {
    title: "Your Title",
    content: "Your content here...",
    category: "Category",
    difficulty: "Easy/Standard/Fairly Difficult",
  },
];
```

## 🚀 Future Enhancements

- [ ] **Cloud sync** for cross-device progress
- [ ] **Social features** for reading challenges
- [ ] **Advanced analytics** with detailed insights
- [ ] **Text import** from various sources
- [ ] **Audio narration** for accessibility
- [ ] **Reading comprehension tests**
- [ ] **Custom reading goals** and reminders
- [ ] **Export functionality** for reading data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Lucide** for the beautiful icons
- **Framer Motion** for smooth animations
- **Google Fonts** for the typography

---

**Made with ❤️ for speed reading enthusiasts everywhere!**

_Flash Read - Master the art of speed reading with modern technology._
