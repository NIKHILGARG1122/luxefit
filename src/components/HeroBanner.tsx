import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, Feather } from 'lucide-react';

interface HeroBannerProps {
  onOpenTryOn: () => void;
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenTryOn, onExploreClick }) => {
  return (
    <div className="relative bg-[#121212] text-[#FAF9F6] overflow-hidden min-h-[520px] lg:min-h-[620px] flex items-center">
      {/* Editorial High-Resolution Background Image */}
      <div className="absolute inset-0 z-0 opacity-45 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-100">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="AURA High Fashion Editorial Campaign"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>Autumn / Winter Sartorial Atelier</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#FAF9F6] leading-[1.15]">
            Monolithic Lines.<br />
            <span className="font-italic font-serif italic text-[#E8E6E1] font-normal">Pure Tactile Luxury.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C5C3BD] font-light max-w-2xl leading-relaxed">
            Crafted from unlined Loro Piana double-faced cashmere, 19mm heavy Mulberry silk, and Okayama shuttle-loom selvedge. Experience our interactive AI Virtual Fitting Atelier to drape any garment on your persona before tailoring.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenTryOn}
              className="group bg-[#FAF9F6] text-[#121212] px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#D4AF37] hover:text-white transition-all shadow-lg flex items-center gap-3"
            >
              <Sparkles size={16} className="text-[#8C733E] group-hover:text-white transition-colors" />
              <span>Launch Virtual Try-On</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreClick}
              className="border border-[#E8E6E1]/30 hover:border-[#FAF9F6] text-[#FAF9F6] px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all hover:bg-white/5"
            >
              Explore Collection
            </button>
          </div>

          {/* Value Badges */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-xl text-xs text-[#A8A6A0] font-light">
            <div className="flex items-center gap-2">
              <Feather size={15} className="text-[#D4AF37]" />
              <span>100% Traceable Fibers</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#D4AF37]" />
              <span>256-Bit SSL Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={15} className="text-[#D4AF37]" />
              <span>30-Day Atelier Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
