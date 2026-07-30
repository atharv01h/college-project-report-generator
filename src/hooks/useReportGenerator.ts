import { useState, useCallback } from 'react';
import { generateReport, countWords } from '../utils/reportGenerator';
import { getRelevantImages } from '../utils/imageGenerator';
import {
  RECENT_TOPICS_KEY,
  MAX_RECENT_TOPICS,
  MIN_TOPIC_LENGTH,
  MAX_TOPIC_LENGTH,
} from '../constants/sections';
import type { GenerationProgress } from '../types';

function loadRecentTopics(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_TOPICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentTopic(topic: string, existing: string[]): string[] {
  const updated = [topic, ...existing.filter((t) => t !== topic)].slice(0, MAX_RECENT_TOPICS);
  try {
    localStorage.setItem(RECENT_TOPICS_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available — ignore
  }
  return updated;
}

/**
 * Custom hook that encapsulates all report generation business logic.
 * Keeps App.tsx clean and components focused on presentation.
 */
export function useReportGenerator() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [recentTopics, setRecentTopics] = useState<string[]>(loadRecentTopics);

  const isTopicValid =
    topic.trim().length >= MIN_TOPIC_LENGTH && topic.trim().length <= MAX_TOPIC_LENGTH;

  const handleGenerate = useCallback(async () => {
    if (!isTopicValid || isLoading) return;

    const trimmedTopic = topic.trim();
    setIsLoading(true);
    setError(null);
    setContent('');
    setImages([]);
    setWordCount(0);
    setProgress({ current: 0, total: 5, sectionTitle: 'Initializing…', percentage: 0 });

    try {
      const [reportContent, imageUrls] = await Promise.all([
        generateReport(trimmedTopic, setProgress),
        getRelevantImages(trimmedTopic, 5),
      ]);

      setContent(reportContent);
      setImages(imageUrls);
      setWordCount(countWords(reportContent));
      setRecentTopics((prev) => saveRecentTopic(trimmedTopic, prev));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
      setProgress(null);
    }
  }, [topic, isTopicValid, isLoading]);

  const handleTopicChange = useCallback((value: string) => {
    setTopic(value);
    if (error) setError(null);
  }, [error]);

  const handleReset = useCallback(() => {
    setTopic('');
    setContent('');
    setImages([]);
    setError(null);
    setProgress(null);
    setWordCount(0);
  }, []);

  return {
    topic,
    content,
    images,
    isLoading,
    error,
    progress,
    wordCount,
    recentTopics,
    isTopicValid,
    handleGenerate,
    handleTopicChange,
    handleReset,
  };
}
