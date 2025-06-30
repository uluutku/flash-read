import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  Target,
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  Zap,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  cn,
  calculateReadingSpeed,
  getSpeedCategory,
  sampleTexts,
} from "../utils";

function SpeedTest({ fontSize, updateReadingStats }) {
  const [currentTest, setCurrentTest] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [testHistory, setTestHistory] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  const intervalRef = useRef(null);
  const testTexts = {
    easy: [
      "The quick brown fox jumps over the lazy dog. This is a simple sentence that contains all the letters of the alphabet. Reading is an essential skill that everyone should develop. Practice makes perfect when it comes to improving your reading speed.",
      "A beautiful day begins with a beautiful mindset. When you wake up, take a moment to think of something positive. This will set the tone for your entire day. Remember, your thoughts create your reality.",
      "Success is not final, failure is not fatal. It is the courage to continue that counts. Every day brings new opportunities to improve yourself. Take small steps towards your goals every day.",
    ],
    medium: [
      "The human brain is an incredibly complex organ that processes vast amounts of information every second. Reading comprehension involves multiple cognitive processes working together simultaneously. Speed reading techniques can help improve both reading speed and comprehension when practiced regularly.",
      "Technology has revolutionized the way we access and consume information. Digital reading platforms offer various tools to enhance the reading experience, from adjustable font sizes to built-in dictionaries. However, the fundamental skills of reading remain the same regardless of the medium.",
      "The benefits of reading extend far beyond simple entertainment or information gathering. Regular reading has been shown to improve vocabulary, enhance critical thinking skills, and even increase empathy by exposing readers to different perspectives and experiences.",
    ],
    hard: [
      "Neuroscientific research has demonstrated that reading comprehension involves a complex interplay between multiple brain regions, including the visual cortex, language processing areas, and memory centers. The process of decoding written symbols into meaningful concepts requires sophisticated neural networks that develop and strengthen through practice and experience.",
      "Cognitive psychology studies have revealed that proficient readers employ various strategies to optimize their reading efficiency, including chunking information into meaningful units, utilizing contextual clues, and maintaining focus through active engagement with the material. These strategies can be systematically developed through targeted training and practice.",
      "The relationship between reading speed and comprehension is not linear, as various factors including text complexity, reader familiarity with the subject matter, and individual cognitive differences all play significant roles in determining optimal reading performance.",
    ],
  };

  const durations = [
    { value: 30, label: "30 seconds", color: "text-green-500" },
    { value: 60, label: "1 minute", color: "text-blue-500" },
    { value: 120, label: "2 minutes", color: "text-purple-500" },
    { value: 300, label: "5 minutes", color: "text-orange-500" },
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      color: "text-green-500",
      bgColor: "bg-green-500/20",
    },
    {
      value: "medium",
      label: "Medium",
      color: "text-blue-500",
      bgColor: "bg-blue-500/20",
    },
    {
      value: "hard",
      label: "Hard",
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
    },
  ];

  useEffect(() => {
    if (isRunning && startTime) {
      intervalRef.current = setInterval(() => {
        const currentElapsed = Date.now() - startTime;
        setElapsedTime(currentElapsed);

        if (currentElapsed >= selectedDuration * 1000) {
          completeTest();
        }
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
  }, [isRunning, startTime, selectedDuration]);

  const startTest = () => {
    const texts = testTexts[selectedDifficulty];
    const randomText = texts[Math.floor(Math.random() * texts.length)];

    setCurrentTest({
      text: randomText,
      duration: selectedDuration,
      difficulty: selectedDifficulty,
      words: randomText
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0),
    });

    setIsRunning(true);
    setStartTime(Date.now());
    setElapsedTime(0);
    setWordsRead(0);
    setShowResults(false);
  };

  const stopTest = () => {
    setIsRunning(false);
    setStartTime(null);
  };

  const completeTest = () => {
    const finalWpm = calculateReadingSpeed(wordsRead, elapsedTime / 1000);
    const result = {
      id: Date.now(),
      wpm: finalWpm,
      wordsRead,
      timeSpent: elapsedTime,
      duration: selectedDuration,
      difficulty: selectedDifficulty,
      date: new Date().toISOString(),
    };

    setTestHistory((prev) => [result, ...prev.slice(0, 9)]);
    setShowResults(true);
    setIsRunning(false);
    setStartTime(null);

    updateReadingStats({
      totalWordsRead: wordsRead,
      totalTimeSpent: elapsedTime,
      averageWPM: finalWpm,
      sessionsCompleted: 1,
    });
  };

  const resetTest = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
    setWordsRead(0);
    setCurrentTest(null);
    setShowResults(false);
  };

  const handleWordClick = () => {
    if (isRunning && currentTest) {
      setWordsRead((prev) => {
        const newCount = prev + 1;
        if (newCount >= currentTest.words.length) {
          completeTest();
        }
        return newCount;
      });
    }
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const currentWpm = calculateReadingSpeed(wordsRead, elapsedTime / 1000);
  const progress = currentTest
    ? (wordsRead / currentTest.words.length) * 100
    : 0;
  const timeRemaining = Math.max(0, selectedDuration * 1000 - elapsedTime);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Speed Test</h1>
            <p className="text-muted-foreground">
              Test your reading speed and comprehension
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Test Configuration */}
        <div className="space-y-6">
          {/* Duration Selection */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Test Duration</h3>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-2 gap-3">
                {durations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value)}
                    disabled={isRunning}
                    className={cn(
                      "p-3 rounded-xl border transition-all duration-200 text-center",
                      selectedDuration === duration.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Timer className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-medium">{duration.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Difficulty Level</h3>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.value}
                    onClick={() => setSelectedDifficulty(difficulty.value)}
                    disabled={isRunning}
                    className={cn(
                      "w-full p-4 rounded-xl border transition-all duration-200 text-left",
                      selectedDifficulty === difficulty.value
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={cn("font-medium", difficulty.color)}>
                          {difficulty.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {difficulty.value === "easy" &&
                            "Simple vocabulary and short sentences"}
                          {difficulty.value === "medium" &&
                            "Moderate complexity with varied structure"}
                          {difficulty.value === "hard" &&
                            "Complex vocabulary and long sentences"}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          difficulty.bgColor
                        )}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Test Controls */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Controls</h3>
            </div>
            <div className="card-content space-y-4">
              {!isRunning ? (
                <button
                  onClick={startTest}
                  className="button button-primary button-lg w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Test
                </button>
              ) : (
                <button
                  onClick={stopTest}
                  className="button button-destructive button-lg w-full"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Test
                </button>
              )}

              <button
                onClick={resetTest}
                className="button button-outline w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Live Stats */}
          {isRunning && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Live Stats</h3>
              </div>
              <div className="card-content space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">Current WPM</p>
                    <p className="text-2xl font-bold text-primary">
                      {currentWpm}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <p className="text-sm text-muted-foreground">Words Read</p>
                    <p className="text-2xl font-bold text-green-500">
                      {wordsRead}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
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
                      Time Remaining
                    </span>
                    <span className="font-medium">
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Progress
                    </span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Test Area */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Test Text</h2>
              <p className="card-description">
                {isRunning
                  ? "Click on words as you read them to track your progress"
                  : "Configure your test settings and click Start Test to begin"}
              </p>
            </div>
            <div className="card-content">
              {currentTest ? (
                <div className="space-y-4">
                  <div
                    className={cn(
                      "p-6 rounded-xl border min-h-[200px]",
                      isRunning ? "bg-background" : "bg-muted/50"
                    )}
                  >
                    <div
                      className={cn(
                        "leading-relaxed",
                        fontSize === "small" && "text-sm",
                        fontSize === "medium" && "text-base",
                        fontSize === "large" && "text-lg"
                      )}
                    >
                      {currentTest.words.map((word, index) => (
                        <span
                          key={index}
                          onClick={handleWordClick}
                          className={cn(
                            "inline-block mr-2 mb-2 px-1 rounded cursor-pointer transition-all duration-200",
                            index < wordsRead
                              ? "bg-green-500/20 text-green-700 dark:text-green-400"
                              : index === wordsRead && isRunning
                              ? "bg-primary/20 text-primary animate-pulse"
                              : "hover:bg-muted"
                          )}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {!isRunning && (
                    <div className="text-center p-6 bg-muted/50 rounded-xl">
                      <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Ready to start your {selectedDuration}-second{" "}
                        {selectedDifficulty} test
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-12">
                  <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground mb-2">
                    No Test Selected
                  </p>
                  <p className="text-muted-foreground">
                    Configure your test settings and click Start Test to begin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResults(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-header text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h2 className="card-title">Test Complete!</h2>
                <p className="card-description">Here are your results</p>
              </div>

              <div className="card-content space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {currentWpm} WPM
                  </div>
                  <div
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                      getSpeedCategory(currentWpm).bgColor,
                      getSpeedCategory(currentWpm).color
                    )}
                  >
                    {getSpeedCategory(currentWpm).label}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <p className="text-sm text-muted-foreground">Words Read</p>
                    <p className="text-xl font-bold text-primary">
                      {wordsRead}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <p className="text-sm text-muted-foreground">Time Spent</p>
                    <p className="text-xl font-bold text-green-500">
                      {formatTime(elapsedTime)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Test Duration
                    </span>
                    <span className="font-medium">{selectedDuration}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Difficulty
                    </span>
                    <span className="font-medium capitalize">
                      {selectedDifficulty}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowResults(false)}
                    className="button button-outline flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      resetTest();
                    }}
                    className="button button-primary flex-1"
                  >
                    New Test
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test History */}
      {testHistory.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-center mb-8">
            <BarChart3 className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold">Test History</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testHistory.map((test) => (
              <div key={test.id} className="card">
                <div className="card-content">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-gradient">
                      {test.wpm} WPM
                    </div>
                    <div
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getSpeedCategory(test.wpm).bgColor,
                        getSpeedCategory(test.wpm).color
                      )}
                    >
                      {getSpeedCategory(test.wpm).label}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words Read</span>
                      <span className="font-medium">{test.wordsRead}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{test.duration}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="font-medium capitalize">
                        {test.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">
                        {new Date(test.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SpeedTest;
