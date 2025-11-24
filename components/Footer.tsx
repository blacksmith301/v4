import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-zinc-950 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Signal Sonic Expert. 
          <span className="block sm:inline sm:ml-2">Optimized for mobile devices with vibration support.</span>
        </p>
        <p className="mt-2 text-xs text-zinc-700">
          For the best experience, disable "Silent Mode" on some devices.
        </p>
      </div>
    </footer>
  );
};

export default Footer;