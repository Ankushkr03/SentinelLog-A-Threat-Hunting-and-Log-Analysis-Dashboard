
import React, { useState } from 'react';
import { AnalysisResult, LogType } from './types';
import { analyzeLogFile } from './services/geminiService';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileAnalysis = async (file: File, logType: LogType) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setFileName(file.name);

    try {
      const content = await file.text();
      const result = await analyzeLogFile(content, logType);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze the log file. The AI model might be unable to parse the format or the content is too large. Please try a different file or check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="p-4 md:p-8">
        {!analysisResult && !isLoading && !error && (
          <FileUpload onAnalyze={handleFileAnalysis} />
        )}

        {isLoading && <Loader />}
        
        {error && (
          <div className="flex flex-col items-center justify-center text-center h-full mt-20">
            <div className="bg-red-900/50 border border-red-700 p-6 rounded-lg max-w-lg">
              <h2 className="text-xl font-bold text-red-400 mb-2">Analysis Error</h2>
              <p className="text-red-300">{error}</p>
              <button
                onClick={handleReset}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {analysisResult && (
          <Dashboard
            result={analysisResult}
            fileName={fileName}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;
