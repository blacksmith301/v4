import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SonicPlayer from './components/SonicPlayer';
import { Smartphone, Info } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Hero / Player Section */}
          <div className="space-y-6">
             <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 tracking-tight">
                  Feel the Deep Clean
                </h2>
                <p className="text-zinc-400 max-w-lg mx-auto">
                  Experience the Signal Sonic Expert in 4D. Turn up your volume and hold your device to feel the different cleaning modes.
                </p>
             </div>

             <SonicPlayer />
          </div>

          {/* Instructions / Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Haptic Sync Technology</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    This player uses the Web Vibration API to synchronize physical feedback with the video timeline. 
                    <span className="block mt-2 text-cyan-500/80 text-xs font-medium">
                      *Compatible with Android devices. iOS devices will experience visual rumble effects.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-800 rounded-xl">
                  <Info className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How it Works</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Press play. As the toothbrush mode changes on screen (Deep Clean, Whitening, etc.), your phone will vibrate in a unique pattern matching that specific mode.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      
      {/* Background Decor */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </div>
  );
};

export default App;