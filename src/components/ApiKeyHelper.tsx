import type { FC } from 'react';
import { Key, ExternalLink, Terminal, Copy } from 'lucide-react';

const ApiKeyHelper: FC = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="api-helper-card" role="complementary" aria-labelledby="api-helper-title">
      <div className="api-helper-icon">
        <Key size={28} aria-hidden="true" />
      </div>
      <h2 id="api-helper-title" className="api-helper-title">
        API Key Required
      </h2>
      <p className="api-helper-desc">
        To generate reports, you need a free Google Gemini API key. Set it up in 3 steps:
      </p>

      <ol className="api-steps">
        <li className="api-step">
          <span className="api-step-num">1</span>
          <div>
            <p className="api-step-text">Get your free API key:</p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="api-step-link"
            >
              aistudio.google.com/app/apikey
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          </div>
        </li>
        <li className="api-step">
          <span className="api-step-num">2</span>
          <div>
            <p className="api-step-text">Create a <code>.env</code> file in the project root:</p>
            <div className="code-block">
              <pre>VITE_GEMINI_API_KEY=your_key_here</pre>
              <button
                className="code-copy-btn"
                onClick={() => handleCopy('VITE_GEMINI_API_KEY=your_key_here')}
                aria-label="Copy environment variable"
                type="button"
              >
                <Copy size={12} />
              </button>
            </div>
          </div>
        </li>
        <li className="api-step">
          <span className="api-step-num">3</span>
          <div>
            <p className="api-step-text">Restart the dev server:</p>
            <div className="code-block">
              <Terminal size={12} aria-hidden="true" />
              <code>npm run dev</code>
            </div>
          </div>
        </li>
      </ol>

      <p className="api-helper-note">
        💡 The Gemini API is free for personal use. No credit card required.
      </p>
    </div>
  );
};

export default ApiKeyHelper;
