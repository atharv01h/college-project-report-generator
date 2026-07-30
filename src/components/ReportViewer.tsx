import { useState, useCallback, type FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, FileText, Check, RotateCcw, FileDown, Hash } from 'lucide-react';
import { exportToWord, exportToPDF, exportToMarkdown } from '../utils/exportUtils';
import type { ExportFormat } from '../types';

interface ReportViewerProps {
  content: string;
  images: string[];
  wordCount: number;
  onReset: () => void;
}

const ReportViewer: FC<ReportViewerProps> = ({ content, images, wordCount, onReset }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId('text');
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Clipboard API not available
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId('text');
      setTimeout(() => setCopiedId(null), 2500);
    }
  }, [content]);

  const handleExport = useCallback(
    async (format: ExportFormat) => {
      if (exportingFormat) return;
      setExportingFormat(format);
      try {
        switch (format) {
          case 'md':
            exportToMarkdown(content);
            break;
          case 'docx':
            await exportToWord(content, images);
            break;
          case 'pdf':
            await exportToPDF(content, images);
            break;
        }
      } catch (err) {
        console.error(`Export to ${format} failed:`, err);
      } finally {
        setExportingFormat(null);
      }
    },
    [content, images, exportingFormat]
  );

  return (
    <article className="report-viewer" aria-labelledby="report-heading">
      {/* Toolbar */}
      <div className="report-toolbar" role="toolbar" aria-label="Report actions">
        <div className="report-meta">
          <div className="report-badge">
            <Hash size={12} aria-hidden="true" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>
          <div className="report-badge">
            <FileText size={12} aria-hidden="true" />
            <span>{images.length} images</span>
          </div>
        </div>

        <div className="toolbar-actions">
          <button
            onClick={onReset}
            className="toolbar-btn toolbar-btn--ghost"
            type="button"
            aria-label="Generate a new report"
            title="New report"
          >
            <RotateCcw size={15} aria-hidden="true" />
            <span>New Report</span>
          </button>

          <button
            onClick={handleCopy}
            className={`toolbar-btn toolbar-btn--secondary ${copiedId === 'text' ? 'toolbar-btn--success' : ''}`}
            type="button"
            aria-label={copiedId === 'text' ? 'Copied!' : 'Copy report to clipboard'}
            aria-pressed={copiedId === 'text'}
          >
            {copiedId === 'text' ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            <span>{copiedId === 'text' ? 'Copied!' : 'Copy'}</span>
          </button>

          <div className="export-group" role="group" aria-label="Download report">
            <span className="export-label">
              <Download size={13} aria-hidden="true" />
              Download:
            </span>
            {(['md', 'docx', 'pdf'] as ExportFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                disabled={exportingFormat !== null}
                className={`toolbar-btn toolbar-btn--export toolbar-btn--${fmt}`}
                type="button"
                aria-label={`Download as ${fmt.toUpperCase()}`}
                aria-busy={exportingFormat === fmt}
              >
                {exportingFormat === fmt ? (
                  <FileDown size={14} className="pulse" aria-hidden="true" />
                ) : (
                  <FileDown size={14} aria-hidden="true" />
                )}
                <span>{fmt.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <section className="images-section" aria-labelledby="images-heading">
          <h2 id="images-heading" className="images-heading">
            Related Images
          </h2>
          <div className="images-grid" role="list">
            {images.map((src, i) => (
              <figure key={i} className="image-figure" role="listitem">
                <img
                  src={src}
                  alt={`Related image ${i + 1}`}
                  className="report-image"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Report content */}
      <div className="report-content" id="report-heading">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
            h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
            h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
            p: ({ children }) => <p className="md-p">{children}</p>,
            ul: ({ children }) => <ul className="md-ul">{children}</ul>,
            ol: ({ children }) => <ol className="md-ol">{children}</ol>,
            li: ({ children }) => <li className="md-li">{children}</li>,
            strong: ({ children }) => <strong className="md-strong">{children}</strong>,
            em: ({ children }) => <em className="md-em">{children}</em>,
            hr: () => <hr className="md-hr" />,
            blockquote: ({ children }) => (
              <blockquote className="md-blockquote">{children}</blockquote>
            ),
            code: ({ children }) => <code className="md-code">{children}</code>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default ReportViewer;