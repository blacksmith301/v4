import React from 'react';
import { Battery, Zap, Sparkles, ShieldCheck, ArrowRight, Star } from 'lucide-react';

interface ProductCardProps {
  variant: 'black' | 'pink';
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  imageSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ variant, title, subtitle, price, features, imageSrc }) => {
  const isBlack = variant === 'black';
  
  // Theme configuration based on variant
  const theme = {
    accent: isBlack ? 'text-cyan-400' : 'text-pink-400',
    bg: isBlack ? 'bg-zinc-900' : 'bg-zinc-900',
    border: isBlack ? 'border-zinc-800 hover:border-cyan-500/50' : 'border-zinc-800 hover:border-pink-500/50',
    button: isBlack ? 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/20' : 'bg-pink-500 hover:bg-pink-400 shadow-pink-500/20',
    gradient: isBlack ? 'from-cyan-500/10 to-transparent' : 'from-pink-500/10 to-transparent',
    iconBg: isBlack ? 'bg-cyan-500/10' : 'bg-pink-500/10',
    glow: isBlack ? 'shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]' : 'shadow-[0_0_30px_-10px_rgba(236,72,153,0.3)]'
  };

  return (
    <div className={`relative group overflow-hidden rounded-2xl border ${theme.border} ${theme.bg} transition-all duration-300 hover:-translate-y-1 ${theme.glow}`}>
      {/* Background Gradient Effect */}
      <div className={`absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none`} />

      <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
            <p className={`text-sm font-medium ${theme.accent} uppercase tracking-wider`}>{subtitle}</p>
          </div>
          <div className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded text-xs font-semibold text-zinc-300">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span>4.9</span>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative w-full aspect-[3/4] mb-8 rounded-xl flex items-center justify-center overflow-hidden transition-colors">
            {/* Background Glow behind image */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl`} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${isBlack ? 'bg-cyan-400/20' : 'bg-pink-400/20'} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <img 
              src={imageSrc} 
              alt={`${title} ${subtitle}`}
              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 relative z-10"
            />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center`}>
                <FeatureIcon index={idx} className={`w-4 h-4 ${theme.accent}`} />
              </div>
              <span className="text-xs text-zinc-300 font-medium leading-tight">{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Price & CTA */}
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-zinc-500 text-xs line-through">Rs. 9,999</span>
            <span className="text-2xl font-bold text-white">{price}</span>
          </div>
          <button className={`flex items-center space-x-2 px-6 py-3 rounded-full text-white font-semibold transition-all transform hover:scale-105 ${theme.button}`}>
            <span>Buy Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for dynamic icons based on index
const FeatureIcon = ({ index, className }: { index: number; className: string }) => {
  const icons = [ShieldCheck, Zap, Battery, Sparkles]; // Order matches the feature list
  const Icon = icons[index] || Star;
  return <Icon className={className} />;
};

const ProductShowcase: React.FC = () => {
  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row items-end justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
           <h2 className="text-2xl font-bold text-white">Choose Your Expert</h2>
           <p className="text-zinc-400 text-sm">Professional grade care in two distinct styles.</p>
        </div>
        <div className="flex space-x-2 text-xs font-medium text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5 mr-1" />
            <span>Includes 2 Brush Heads</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCard 
          variant="black"
          title="Sonic Expert"
          subtitle="Black Onyx Edition"
          price="Rs. 7,500"
          imageSrc="https://i.imgur.com/Weh0ijc.png"
          features={[
            "8x Plaque Removal*",
            "30,000 Vibrations/min",
            "60 Days Battery Life",
            "3 Brushing Modes"
          ]}
        />
        <ProductCard 
          variant="pink"
          title="Sonic Expert"
          subtitle="Rose Gold Edition"
          price="Rs. 7,500"
          imageSrc="https://i.imgur.com/hhK4aym.png"
          features={[
            "8x Plaque Removal*",
            "30,000 Vibrations/min",
            "60 Days Battery Life",
            "3 Brushing Modes"
          ]}
        />
      </div>
    </div>
  );
};

export default ProductShowcase;