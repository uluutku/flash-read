import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Type,
  Eye,
  Bell,
  Palette,
  Download,
  Info,
  Heart,
  Github,
  ExternalLink,
} from "lucide-react";
import { cn } from "../utils";

function SettingsPage({
  currentMode,
  setCurrentMode,
  fontSize,
  setFontSize,
  isDarkMode,
  setIsDarkMode,
}) {
  const readingModes = [
    {
      id: "light",
      name: "Light",
      description: "Clean white background",
      icon: Sun,
      bg: "bg-white",
      text: "text-gray-900",
      border: "border-gray-200",
    },
    {
      id: "dark",
      name: "Dark",
      description: "Easy on the eyes",
      icon: Moon,
      bg: "bg-gray-900",
      text: "text-white",
      border: "border-gray-700",
    },
    {
      id: "sepia",
      name: "Sepia",
      description: "Warm, book-like feel",
      icon: Palette,
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-200",
    },
  ];

  const fontSizes = [
    { id: "small", name: "Small", size: "text-sm" },
    { id: "medium", name: "Medium", size: "text-base" },
    { id: "large", name: "Large", size: "text-lg" },
  ];

  const features = [
    {
      id: "focus-mode",
      name: "Focus Mode",
      description: "Hide distractions while reading",
      icon: Eye,
      enabled: true,
    },
    {
      id: "notifications",
      name: "Reading Reminders",
      description: "Get notified to read daily",
      icon: Bell,
      enabled: false,
    },
    {
      id: "auto-save",
      name: "Auto Save",
      description: "Automatically save your progress",
      icon: Download,
      enabled: true,
    },
  ];

  const appInfo = {
    version: "1.0.0",
    build: "2024.1.0",
    lastUpdated: "January 2024",
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Customize your reading experience
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Theme Settings */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Theme & Appearance</h3>
              <p className="card-description">
                Choose your preferred reading theme
              </p>
            </div>
            <div className="card-content space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-primary" />
                    ) : (
                      <Sun className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    isDarkMode ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      isDarkMode ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>

              {/* Reading Mode Selection */}
              <div>
                <h4 className="font-medium mb-4">Reading Mode</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {readingModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setCurrentMode(mode.id)}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200 text-left",
                        currentMode === mode.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            currentMode === mode.id
                              ? "bg-primary/20"
                              : "bg-muted"
                          )}
                        >
                          <mode.icon
                            className={cn(
                              "w-4 h-4",
                              currentMode === mode.id
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            currentMode === mode.id
                              ? "text-primary"
                              : "text-foreground"
                          )}
                        >
                          {mode.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {mode.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Selection */}
              <div>
                <h4 className="font-medium mb-4">Font Size</h4>
                <div className="grid grid-cols-3 gap-4">
                  {fontSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setFontSize(size.id)}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200 text-center",
                        fontSize === size.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "font-medium mb-1",
                          size.size,
                          fontSize === size.id
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        Aa
                      </div>
                      <div
                        className={cn(
                          "text-sm",
                          fontSize === size.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {size.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Features</h3>
              <p className="card-description">Enable or disable app features</p>
            </div>
            <div className="card-content space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <button
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      feature.enabled ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        feature.enabled ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Data & Privacy</h3>
              <p className="card-description">
                Manage your data and privacy settings
              </p>
            </div>
            <div className="card-content space-y-4">
              <button className="w-full p-4 rounded-xl border border-border hover:border-primary/50 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Download className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Export Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Download your reading progress and settings
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>

              <button className="w-full p-4 rounded-xl border border-border hover:border-primary/50 transition-colors text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                      <Download className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Clear Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Delete all your reading data and reset settings
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* App Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">App Information</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="font-medium">{appInfo.version}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Build</span>
                <span className="font-medium">{appInfo.build}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Updated</span>
                <span className="font-medium">{appInfo.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="card-content space-y-3">
              <button className="w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 text-primary" />
                  <span className="font-medium">Help & Support</span>
                </div>
              </button>

              <button className="w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <span className="font-medium">GitHub</span>
                </div>
              </button>

              <button className="w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="font-medium">Rate App</span>
                </div>
              </button>
            </div>
          </div>

          {/* About */}
          <div className="card">
            <div className="card-content text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Made with ❤️</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Flash Read is designed to help you improve your reading speed
                and comprehension through modern technology and beautiful
                design.
              </p>
              <div className="text-xs text-muted-foreground">
                © 2024 Flash Read. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
