// Created by Atharv Hatwar
import React, { useState } from 'react';
import { Book, FileText, Loader2, AlertTriangle, Github, Instagram } from 'lucide-react';
import ReportViewer from './components/ReportViewer';
import { generateReport } from './utils/reportGenerator';
import { getRelevantImages } from './utils/imageGenerator';

function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setProgress(0);
    try {
      const [content, imageUrls] = await Promise.all([
        generateReport(topic).then(result => {
          setProgress(100);
          return result;
        }),
        getRelevantImages(topic, 5)
      ]);
      setReport(content);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-times">
      <nav className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 p-6 shadow-xl border-b border-blue-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Book className="w-10 h-10 text-blue-400" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Project Report Generator
            </h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 mb-8">
            <label className="block text-xl font-semibold mb-4 text-blue-300">Enter Project Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-times text-lg"
              placeholder="e.g., Artificial Intelligence in Healthcare"
            />
            
            <div className="mt-6 space-y-4">
              <button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin mr-3" />
                    Generating ({progress}%)
                  </>
                ) : (
                  <>
                    <FileText className="w-6 h-6 mr-3" />
                    Generate Report
                  </>
                )}
              </button>

              <div className="bg-gray-800/50 p-4 rounded-lg space-y-2">
                <p className="text-gray-300 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                  It will take 3 to 7 minutes to generate a comprehensive report of 7,500+ words with images.
                </p>
                <p className="text-gray-400 flex items-center text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                  Images may not be accurate. The relevance depends on your search prompt.
                </p>
              </div>
            </div>
          </div>

          {report && <ReportViewer content={report} images={images} />}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-center py-8 mt-16 border-t border-blue-800">
        <div className="container mx-auto px-4">
          <p className="text-xl font-semibold text-blue-300 mb-4">Created by Atharv Hatwar</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/atharv01h"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Github className="w-6 h-6 mr-2" />
              GitHub
            </a>
            <a
              href="https://www.instagram.com/atharv_hatwar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <Instagram className="w-6 h-6 mr-2" />
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;