import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, calculateWPM, analyzeText } from "../utils";

function Reader({ fontSize, updateReadingStats }) {
  const [text, setText] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [readingSpeed, setReadingSpeed] = useState(300);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textAnalysis, setTextAnalysis] = useState(null);

  const intervalRef = useRef(null);
  const textAreaRef = useRef(null);
  const focusContainerRef = useRef(null);

  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const currentWord = words[currentWordIndex] || "";
  const progress =
    words.length > 0 ? (currentWordIndex / words.length) * 100 : 0;
  const wpm = calculateWPM(currentWordIndex, elapsedTime);

  useEffect(() => {
    if (text) {
      setTextAnalysis(analyzeText(text));
    }
  }, [text]);

  useEffect(() => {
    if (isReading && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReading, startTime]);

  useEffect(() => {
    if (isReading && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, (60 / readingSpeed) * 1000);

      return () => clearTimeout(timer);
    } else if (currentWordIndex >= words.length && isReading) {
      handleStopReading();
    }
  }, [isReading, currentWordIndex, words.length, readingSpeed]);

  const handleStartReading = () => {
    if (words.length === 0) return;

    setIsReading(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setCurrentWordIndex(0);
  };

  const handleStopReading = () => {
    setIsReading(false);
    setStartTime(null);

    if (currentWordIndex > 0) {
      const finalWpm = calculateWPM(currentWordIndex, elapsedTime);
      updateReadingStats({
        totalWordsRead: currentWordIndex,
        totalTimeSpent: elapsedTime,
        averageWPM: finalWpm,
        sessionsCompleted: 1,
      });
    }
  };

  const handleReset = () => {
    setIsReading(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentWordIndex(0);
  };

  const handleSpeedChange = (newSpeed) => {
    setReadingSpeed(newSpeed);
  };

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      focusContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Speed Reader</h1>
            <p className="text-muted-foreground">Focus on one word at a time</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
          >
            <TrendingUp className="w-5 h-5" />
          </button>
          <button
            onClick={toggleFocusMode}
            className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
          >
            {isFocusMode ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Input Section */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Input Text</h2>
              <p className="card-description">
                Paste or type your text here to start reading
              </p>
            </div>
            <div className="card-content">
              <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here or start typing..."
                className={cn(
                  "w-full h-64 p-4 rounded-xl border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                  "placeholder:text-muted-foreground",
                  fontSize === "small" && "text-sm",
                  fontSize === "medium" && "text-base",
                  fontSize === "large" && "text-lg"
                )}
                disabled={isReading}
              />

              {textAnalysis && (
                <div className="mt-4 p-4 rounded-xl bg-muted/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Words</p>
                      <p className="font-semibold">{textAnalysis.wordCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Characters</p>
                      <p className="font-semibold">
                        {textAnalysis.characterCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sentences</p>
                      <p className="font-semibold">
                        {textAnalysis.sentenceCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Est. Time</p>
                      <p className="font-semibold">
                        {Math.ceil(
                          textAnalysis.wordCount / (readingSpeed / 60)
                        )}{" "}
                        min
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          {/* Reading Controls */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Controls</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={handleStartReading}
                  disabled={isReading || words.length === 0}
                  className="button button-primary button-lg flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </button>
                <button
                  onClick={handleStopReading}
                  disabled={!isReading}
                  className="button button-secondary button-lg flex-1"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </button>
              </div>

              <button
                onClick={handleReset}
                className="button button-outline w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Speed Control */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Reading Speed</h3>
              <p className="card-description">{readingSpeed} WPM</p>
            </div>
            <div className="card-content">
              <input
                type="range"
                min="100"
                max="800"
                step="25"
                value={readingSpeed}
                onChange={(e) => handleSpeedChange(parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                disabled={isReading}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Progress</h3>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Words Read</p>
                  <p className="font-semibold">{currentWordIndex}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-semibold">{formatTime(elapsedTime)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">WPM</p>
                  <p className="font-semibold">{wpm}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Remaining</p>
                  <p className="font-semibold">
                    {words.length - currentWordIndex}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFocusMode(false)}
          >
            <div
              ref={focusContainerRef}
              className="text-center max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">
                      {formatTime(elapsedTime)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-medium">{wpm} WPM</span>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-1 mb-4">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <motion.div
                key={currentWordIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={cn(
                  "text-center p-8 rounded-2xl bg-card border border-border shadow-2xl",
                  "min-h-[200px] flex items-center justify-center"
                )}
              >
                {currentWord ? (
                  <h1
                    className={cn(
                      "font-bold text-gradient",
                      fontSize === "small" && "text-4xl",
                      fontSize === "medium" && "text-6xl",
                      fontSize === "large" && "text-8xl"
                    )}
                  >
                    {currentWord}
                  </h1>
                ) : (
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl text-muted-foreground">
                      Ready to start reading
                    </p>
                  </div>
                )}
              </motion.div>

              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={toggleFullscreen}
                  className="button button-outline"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 mr-2" />
                  ) : (
                    <Maximize2 className="w-4 h-4 mr-2" />
                  )}
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Panel */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 z-40"
          >
            <div className="card w-80 shadow-2xl">
              <div className="card-header">
                <h3 className="card-title">Reading Stats</h3>
              </div>
              <div className="card-content space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">Current WPM</p>
                    <p className="text-2xl font-bold text-primary">{wpm}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <p className="text-2xl font-bold text-green-500">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Words Read
                    </span>
                    <span className="font-medium">{currentWordIndex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Time Elapsed
                    </span>
                    <span className="font-medium">
                      {formatTime(elapsedTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Speed Setting
                    </span>
                    <span className="font-medium">{readingSpeed} WPM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Reader;
