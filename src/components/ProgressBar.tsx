import type { FC } from 'react';
import type { GenerationProgress } from '../types';

interface ProgressBarProps {
  progress: GenerationProgress;
}

const SECTION_LABELS = [
  'Executive Summary',
  'Literature Review',
  'Methodology',
  'Results & Analysis',
  'Discussion & Conclusions',
];

const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progress-container" role="status" aria-live="polite" aria-atomic="true">
      <div className="progress-header">
        <span className="progress-label">
          Generating <em>{progress.sectionTitle}</em>…
        </span>
        <span className="progress-pct">{progress.percentage}%</span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={progress.percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Report generation progress"
      >
        <div
          className="progress-fill"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {/* Section indicators */}
      <div className="progress-steps" aria-hidden="true">
        {SECTION_LABELS.map((label, i) => (
          <div
            key={label}
            className={`progress-step ${
              i < progress.current
                ? 'progress-step--done'
                : i === progress.current
                ? 'progress-step--active'
                : 'progress-step--pending'
            }`}
            title={label}
          >
            <div className="progress-step-dot">
              {i < progress.current ? '✓' : i + 1}
            </div>
            <span className="progress-step-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
