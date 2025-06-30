import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Zap,
  BarChart3,
  Settings,
  Home,
  Moon,
  Sun,
} from "lucide-react";
import { loadFromLocalStorage, saveToLocalStorage } from "./utils";

// Import components
import HomePage from "./components/HomePage";
import Reader from "./components/Reader";
import SpeedTest from "./components/SpeedTest";
import Progress from "./components/Progress";
import SettingsPage from "./components/SettingsPage";

function App() {
  const [currentMode, setCurrentMode] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [readingStats, setReadingStats] = useState({
    totalWordsRead: 0,
    totalTimeSpent: 0,
    averageWPM: 0,
    sessionsCompleted: 0,
    lastSession: null,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedMode = loadFromLocalStorage("readingMode", "dark");
    const savedFontSize = loadFromLocalStorage("fontSize", "medium");
    const savedDarkMode = loadFromLocalStorage("darkMode", true);
    const savedStats = loadFromLocalStorage("readingStats", {
      totalWordsRead: 0,
      totalTimeSpent: 0,
      averageWPM: 0,
      sessionsCompleted: 0,
      lastSession: null,
    });

    setCurrentMode(savedMode);
    setFontSize(savedFontSize);
    setIsDarkMode(savedDarkMode);
    setReadingStats(savedStats);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Save settings to localStorage when they change
  useEffect(() => {
    saveToLocalStorage("readingMode", currentMode);
  }, [currentMode]);

  useEffect(() => {
    saveToLocalStorage("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    saveToLocalStorage("darkMode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    saveToLocalStorage("readingStats", readingStats);
  }, [readingStats]);

  const updateReadingStats = (newStats) => {
    setReadingStats((prev) => ({
      ...prev,
      ...newStats,
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/reader", icon: BookOpen, label: "Reader" },
    { path: "/speed-test", icon: Zap, label: "Speed Test" },
    { path: "/progress", icon: BarChart3, label: "Progress" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Header with Dark Mode Toggle */}
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-gradient">Flash Read</h1>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-24">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="animate-fade-in">
                    <HomePage
                      readingStats={readingStats}
                      currentMode={currentMode}
                    />
                  </div>
                }
              />
              <Route
                path="/reader"
                element={
                  <div className="animate-fade-in">
                    <Reader
                      currentMode={currentMode}
                      fontSize={fontSize}
                      updateReadingStats={updateReadingStats}
                    />
                  </div>
                }
              />
              <Route
                path="/speed-test"
                element={
                  <div className="animate-fade-in">
                    <SpeedTest
                      currentMode={currentMode}
                      fontSize={fontSize}
                      updateReadingStats={updateReadingStats}
                    />
                  </div>
                }
              />
              <Route
                path="/progress"
                element={
                  <div className="animate-fade-in">
                    <Progress
                      readingStats={readingStats}
                      currentMode={currentMode}
                    />
                  </div>
                }
              />
              <Route
                path="/settings"
                element={
                  <div className="animate-fade-in">
                    <SettingsPage
                      currentMode={currentMode}
                      setCurrentMode={setCurrentMode}
                      fontSize={fontSize}
                      setFontSize={setFontSize}
                      isDarkMode={isDarkMode}
                      setIsDarkMode={setIsDarkMode}
                    />
                  </div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Enhanced Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex justify-around items-center py-3">
              {navItems.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </div>
          </div>
        </nav>
      </div>
    </Router>
  );
}

// Enhanced Navigation Item Component
function NavItem({ path, icon: Icon, label }) {
  const isActive = window.location.pathname === path;

  return (
    <a
      href={path}
      className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "text-primary bg-primary/10 shadow-lg"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      }`}
    >
      <div
        className={`p-2 rounded-lg transition-all duration-200 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-glow"
            : "group-hover:bg-accent"
        }`}
      >
        <Icon size={20} />
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </a>
  );
}

export default App;
