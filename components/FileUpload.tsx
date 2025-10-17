
import React, { useState, useRef } from 'react';
import { LogType } from '../types';
import { UploadIcon, FileTextIcon } from './icons';

interface FileUploadProps {
  onAnalyze: (file: File, logType: LogType) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalyze }) => {
  const [file, setFile] = useState<File | null>(null);
  const [logType, setLogType] = useState<LogType>('SSH');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onAnalyze(file, logType);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-2xl bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Start Your Threat Hunt</h2>
        <p className="text-center text-gray-400 mb-8">Upload a log file to begin analysis.</p>

        <div className="space-y-6">
          <div 
            className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-400 bg-gray-700/50' : 'border-gray-600 hover:border-blue-500 hover:bg-gray-700/30'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".log, .txt"
            />
            {file ? (
              <div className="text-center">
                <FileTextIcon className="w-12 h-12 mx-auto text-green-400 mb-2" />
                <p className="font-semibold text-white">{file.name}</p>
                <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="text-center">
                <UploadIcon className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                <p className="font-semibold text-white">Drag & drop a log file here</p>
                <p className="text-sm text-gray-400">or click to browse</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="logType" className="block text-sm font-medium text-gray-300 mb-2">Log Type</label>
            <select
              id="logType"
              value={logType}
              onChange={(e) => setLogType(e.target.value as LogType)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>SSH</option>
              <option>Apache</option>
              <option>Nginx</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!file}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-blue-500/40"
          >
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
