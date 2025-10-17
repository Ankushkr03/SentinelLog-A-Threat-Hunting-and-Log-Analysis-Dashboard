
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-20">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      <p className="mt-4 text-lg font-semibold text-gray-300">SentinelLog AI is analyzing...</p>
      <p className="text-sm text-gray-500">This may take a moment for large files.</p>
    </div>
  );
};

export default Loader;
