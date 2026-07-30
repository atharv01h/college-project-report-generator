import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopicInput from './components/TopicInput';
import ProgressBar from './components/ProgressBar';
import ReportViewer from './components/ReportViewer';
import ApiKeyHelper from './components/ApiKeyHelper';
import { ToastContainer } from './components/ui/Toast';
import { useReportGenerator } from './hooks/useReportGenerator';
import type { ToastMessage } from './types';

function App() {
  const {
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
  } = useReportGenerator();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const apiKeyMissing =
    !import.meta.env.VITE_GEMINI_API_KEY ||
    import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here';

  return (
    <div className="app-root">
      <Navbar />

      <main className="main-content" id="main">
        <div className="container">
          {/* Hero */}
          <header className="hero" aria-labelledby="hero-heading">
            <div className="hero-badge">
              <span className="hero-badge-dot" aria-hidden="true" />
              Powered by Google Gemini AI
            </div>
            <h2 id="hero-heading" className="hero-title">
              Generate Academic Reports<br />
              <span className="hero-title-accent">in Minutes</span>
            </h2>
            <p className="hero-desc">
              Enter any project topic and receive a fully structured 7,500+ word academic report
              with literature review, methodology, results, and more — ready to download.
            </p>
          </header>

          {/* API key missing state */}
          {apiKeyMissing && <ApiKeyHelper />}

          {/* Topic input */}
          {!apiKeyMissing && !content && (
            <TopicInput
              topic={topic}
              isLoading={isLoading}
              isTopicValid={isTopicValid}
              error={error}
              progress={progress}
              recentTopics={recentTopics}
              onTopicChange={handleTopicChange}
              onGenerate={handleGenerate}
            />
          )}

          {/* Real-time progress */}
          {isLoading && progress && (
            <div className="progress-section">
              <ProgressBar progress={progress} />
            </div>
          )}

          {/* Report viewer */}
          {content && !isLoading && (
            <ReportViewer
              content={content}
              images={images}
              wordCount={wordCount}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      <Footer />

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
