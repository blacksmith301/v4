import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SonicPlayer from './components/SonicPlayer';
import ProductShowcase from './components/ProductShowcase';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-cyan-500/30 relative overflow-hidden">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto space-y-16">
          
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

          {/* Product Showcase Section */}
          <ProductShowcase />

        </div>
      </main>

      <Footer />
      
      {/* Background Decor - Ambient Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-0"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none -z-0 translate-x-1/3 translate-y-1/3"></div>
    </div>
  );
};

export default App;
