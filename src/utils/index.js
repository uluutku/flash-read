import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for combining Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Text processing utilities
export function splitTextIntoWords(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

export function splitTextIntoSentences(text) {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim().length > 0);
}

export function splitTextIntoParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .filter((paragraph) => paragraph.trim().length > 0);
}

// Reading speed calculations
export function calculateReadingSpeed(words, timeInSeconds) {
  const wordsPerMinute = (words / timeInSeconds) * 60;
  return Math.round(wordsPerMinute);
}

export function calculateWPM(words, timeInMs) {
  if (timeInMs === 0) return 0;
  const timeInMinutes = timeInMs / (1000 * 60);
  return Math.round(words / timeInMinutes);
}

export function getSpeedCategory(wpm) {
  if (wpm >= 300)
    return { category: "fast", label: "Speed Reader", color: "speed-fast" };
  if (wpm >= 200)
    return {
      category: "medium",
      label: "Average Reader",
      color: "speed-medium",
    };
  return { category: "slow", label: "Slow Reader", color: "speed-slow" };
}

export function estimateReadingTime(wordCount, wpm = 200) {
  const minutes = wordCount / wpm;
  const seconds = Math.round((minutes % 1) * 60);
  const wholeMinutes = Math.floor(minutes);

  if (wholeMinutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${wholeMinutes}m`;
  return `${wholeMinutes}m ${seconds}s`;
}

// Text analysis
export function analyzeText(text) {
  const words = splitTextIntoWords(text);
  const sentences = splitTextIntoSentences(text);
  const paragraphs = splitTextIntoParagraphs(text);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    averageWordsPerSentence: words.length / sentences.length || 0,
    averageWordsPerParagraph: words.length / paragraphs.length || 0,
    readingLevel: calculateReadingLevel(words, sentences),
  };
}

export function calculateReadingLevel(words, sentences) {
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord =
    words.reduce((total, word) => {
      return total + countSyllables(word);
    }, 0) / words.length;

  // Flesch Reading Ease formula
  const fleschScore =
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  if (fleschScore >= 90) return "Very Easy";
  if (fleschScore >= 80) return "Easy";
  if (fleschScore >= 70) return "Fairly Easy";
  if (fleschScore >= 60) return "Standard";
  if (fleschScore >= 50) return "Fairly Difficult";
  if (fleschScore >= 30) return "Difficult";
  return "Very Difficult";
}

function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");

  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

// Focus mode utilities
export function createFocusMask(text, focusWord, contextWords = 3) {
  const words = splitTextIntoWords(text);
  const focusIndex = words.findIndex((word) =>
    word.toLowerCase().includes(focusWord.toLowerCase())
  );

  if (focusIndex === -1) return text;

  const start = Math.max(0, focusIndex - contextWords);
  const end = Math.min(words.length, focusIndex + contextWords + 1);

  return words
    .map((word, index) => {
      if (index >= start && index < end) {
        return word;
      }
      return "█".repeat(word.length);
    })
    .join(" ");
}

// Progress tracking
export function calculateProgress(current, total) {
  return Math.min(100, Math.max(0, (current / total) * 100));
}

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Local storage utilities
export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

export function loadFromLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
}

// Sample texts for demonstration
export const sampleTexts = [
  {
    title: "The Art of Speed Reading",
    content: `Speed reading is a collection of methods used to increase the rate at which a person reads while maintaining comprehension. The goal is to read faster while still understanding and retaining the information.

The average adult reads at a speed of about 200-250 words per minute. However, with proper training and techniques, it's possible to increase this to 400-600 words per minute or even higher.

Key techniques include:
- Eliminating subvocalization (reading aloud in your head)
- Using a pointer or guide to maintain focus
- Expanding your peripheral vision
- Practicing regularly with timed exercises

Remember, speed reading is not about rushing through text. It's about becoming more efficient and focused in your reading process.`,
    category: "Education",
    difficulty: "Standard",
  },
  {
    title: "The Future of Technology",
    content: `Artificial intelligence and machine learning are transforming the way we live and work. From virtual assistants to autonomous vehicles, AI is becoming increasingly integrated into our daily lives.

The rapid advancement of technology brings both opportunities and challenges. On one hand, we have the potential to solve complex problems and improve human lives. On the other hand, we must carefully consider the ethical implications and ensure that technology serves humanity's best interests.

As we move forward, it's crucial to maintain a balance between innovation and responsibility. The future belongs to those who can adapt and learn continuously.`,
    category: "Technology",
    difficulty: "Fairly Easy",
  },
  {
    title: "Mindfulness and Mental Health",
    content: `Mindfulness is the practice of being fully present and engaged in the current moment, without judgment. It's a powerful tool for managing stress, anxiety, and improving overall mental well-being.

Research has shown that regular mindfulness practice can lead to:
- Reduced stress and anxiety levels
- Improved focus and concentration
- Better emotional regulation
- Enhanced self-awareness

Incorporating mindfulness into your daily routine doesn't require hours of meditation. Simple practices like mindful breathing, body scans, or even mindful eating can make a significant difference in your mental health.`,
    category: "Health",
    difficulty: "Easy",
  },
];

// Reading modes
export const readingModes = {
  light: {
    name: "Light",
    bg: "bg-neutral-50",
    text: "text-neutral-900",
    className: "reading-mode",
  },
  dark: {
    name: "Dark",
    bg: "bg-neutral-900",
    text: "text-neutral-100",
    className: "reading-mode-dark",
  },
  sepia: {
    name: "Sepia",
    bg: "bg-amber-50",
    text: "text-amber-900",
    className: "reading-mode-sepia",
  },
};

// Font sizes for reading
export const fontSizes = {
  small: { name: "Small", size: "text-sm", lineHeight: "leading-relaxed" },
  medium: { name: "Medium", size: "text-base", lineHeight: "leading-relaxed" },
  large: { name: "Large", size: "text-lg", lineHeight: "leading-relaxed" },
  xlarge: {
    name: "Extra Large",
    size: "text-xl",
    lineHeight: "leading-relaxed",
  },
};
