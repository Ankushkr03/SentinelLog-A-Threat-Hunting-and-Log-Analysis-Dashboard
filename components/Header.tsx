
import React from 'react';
import { ShieldCheckIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <ShieldCheckIcon className="w-8 h-8 text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Sentinel<span className="text-blue-400">Log</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
