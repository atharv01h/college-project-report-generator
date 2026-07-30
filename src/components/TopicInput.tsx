import { useRef, useEffect, type FC } from 'react';
import { FileText, Loader2, AlertCircle, Clock, Zap } from 'lucide-react';
import type { GenerationProgress } from '../types';
import { MIN_TOPIC_LENGTH, MAX_TOPIC_LENGTH } from '../constants/sections';

interface TopicInputProps {
  topic: string;
  isLoading: boolean;
  isTopicValid: boolean;
  error: string | null;
  progress: GenerationProgress | null;
  recentTopics: string[];
  onTopicChange: (value: string) => void;
  onGenerate: () => void;
}

const TopicInput: FC<TopicInputProps> = ({
  topic,
  isLoading,
  isTopicValid,
  error,
  progress,
  recentTopics,
  onTopicChange,
  onGenerate,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && isTopicValid && !isLoading) {
        onGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTopicValid, isLoading, onGenerate]);

  const charCount = topic.length;
  const isOverLimit = charCount > MAX_TOPIC_LENGTH;

  return (
    <section className="input-card" aria-labelledby="topic-label">
      <div className="input-header">
        <label id="topic-label" htmlFor="topic-input" className="input-label">
          Enter Your Project Topic
        </label>
        <span
          className={`char-count ${isOverLimit ? 'char-count--over' : ''}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {charCount}/{MAX_TOPIC_LENGTH}
        </span>
      </div>

      <div className="input-wrapper">
        <input
          id="topic-input"
          ref={inputRef}
          type="text"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && isTopicValid && !isLoading) onGenerate();
          }}
          className={`topic-input ${error ? 'topic-input--error' : ''}`}
          placeholder="e.g., Artificial Intelligence in Healthcare"
          disabled={isLoading}
          maxLength={MAX_TOPIC_LENGTH + 20}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'topic-error' : 'topic-hint'}
          autoComplete="off"
          spellCheck
        />
      </div>

      {topic.length > 0 && topic.trim().length < MIN_TOPIC_LENGTH && (
        <p className="input-hint" id="topic-hint" aria-live="polite">
          Topic must be at least {MIN_TOPIC_LENGTH} characters.
        </p>
      )}

      {/* Recent topics */}
      {recentTopics.length > 0 && !isLoading && (
        <div className="recent-topics" aria-label="Recent topics">
          <div className="recent-topics-header">
            <Clock size={12} aria-hidden="true" />
            <span>Recent</span>
          </div>
          <div className="recent-topics-list" role="list">
            {recentTopics.map((t) => (
              <button
                key={t}
                className="recent-topic-chip"
                onClick={() => onTopicChange(t)}
                role="listitem"
                type="button"
                aria-label={`Use recent topic: ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generate button */}
      <button
        id="generate-btn"
        onClick={onGenerate}
        disabled={isLoading || !isTopicValid}
        className={`generate-btn ${isLoading ? 'generate-btn--loading' : ''}`}
        aria-busy={isLoading}
        type="button"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="spin" aria-hidden="true" />
            <span>
              {progress
                ? `Generating Section ${progress.current + 1}/${progress.total} — ${progress.sectionTitle}`
                : 'Initializing…'}
            </span>
          </>
        ) : (
          <>
            <Zap size={20} aria-hidden="true" />
            <span>Generate Report</span>
            <span className="btn-shortcut" aria-label="Keyboard shortcut: Ctrl Enter">
              ⌘↵
            </span>
          </>
        )}
      </button>

      {/* Info notice */}
      {!isLoading && (
        <div className="info-notice" role="note">
          <FileText size={14} aria-hidden="true" />
          <span>
            Generates a <strong>7,500+ word</strong> academic report in 3–7 minutes using Google
            Gemini AI. Images require an Unsplash API key.
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error-card" role="alert" aria-live="assertive" id="topic-error">
          <AlertCircle size={18} className="error-icon" aria-hidden="true" />
          <div className="error-content">
            <p className="error-title">Generation Failed</p>
            <p className="error-message">{error}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopicInput;
