import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-zinc-950 border-t border-zinc-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-zinc-500 text-sm">
          &copy; 2025 Signal Sonic Expert Demo | Prototype by DAT - The Ai Company
        </p>
        <p className="text-xs text-zinc-700">
          For the best experience, disable "Silent Mode" on mobile devices.
        </p>
      </div>
    </footer>
  );
};

export default Footer;