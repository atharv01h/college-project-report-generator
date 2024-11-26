// Created by Atharv Hatwar
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Download, Copy, FileText, FileImage } from 'lucide-react';
import { exportToWord, exportToPDF } from '../utils/exportUtils';

// Created by Atharv Hatwar
interface ReportViewerProps {
  content: string;
  images: string[];
}

// Created by Atharv Hatwar
const ReportViewer: React.FC<ReportViewerProps> = ({ content, images }) => {
  // Created by Atharv Hatwar
  const handleDownload = (format: 'md' | 'docx' | 'pdf') => {
    switch (format) {
      case 'md':
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project-report.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      case 'docx':
        exportToWord(content, images);
        break;
      case 'pdf':
        exportToPDF(content, images);
        break;
    }
  };

  // Created by Atharv Hatwar
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  // Created by Atharv Hatwar
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex flex-wrap gap-4 justify-end mb-4">
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </button>
        <button
          onClick={() => handleDownload('md')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all"
        >
          <Download className="w-4 h-4 mr-2" />
          Markdown
        </button>
        <button
          onClick={() => handleDownload('docx')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-all"
        >
          <FileText className="w-4 h-4 mr-2" />
          Word
        </button>
        <button
          onClick={() => handleDownload('pdf')}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-all"
        >
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </button>
      </div>

      {images.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Related Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Related image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

// Created by Atharv Hatwar
export default ReportViewer;