import React from 'react';
import { Waves } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-cyan-950/50 border border-cyan-500/30">
            <Waves className="w-6 h-6 text-cyan-400" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Signal Sonic Expert <span className="text-cyan-400">v4</span></h1>
            <p className="text-xs text-zinc-400 tracking-widest uppercase">Sonic Experience</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2 text-xs text-zinc-500">
          <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span> Haptics Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;