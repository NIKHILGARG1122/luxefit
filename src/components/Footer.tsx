import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#121212] text-[#FAF9F6] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.25em] font-light text-[#FAF9F6] uppercase">
                AURA
              </span>
              <span className="block text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase font-sans">
                ATELIER PARIS
              </span>
            </a>

            <p className="text-xs text-[#AAA] font-light max-w-sm leading-relaxed">
              Monolithic architectural lines paired with unlined Loro Piana double-faced cashmere and 19mm heavy Mulberry silk. Designed in Paris, handcrafted across Milan, Florence, and Kojima.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium block mb-2">
                Join the Private VIP Atelier Register
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter private email address..."
                  className="flex-1 bg-white/5 border border-white/20 px-3.5 py-2.5 text-xs text-white placeholder-[#777] focus:ring-0 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black hover:bg-white px-5 py-2.5 text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5"
                >
                  {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#D4AF37] mt-1.5 font-mono">
                  Welcome to the AURA Atelier VIP Register.
                </p>
              )}
            </div>
          </div>

          {/* Boutiques */}
          <div className="md:col-span-3 space-y-3 text-xs text-[#AAA] font-light">
            <span className="text-xs uppercase tracking-widest text-white font-medium block mb-1">
              Global Atelier Flagships
            </span>
            <ul className="space-y-2">
              <li><strong className="text-white font-normal">Paris:</strong> 14 Rue du Faubourg Saint-Honoré</li>
              <li><strong className="text-white font-normal">London:</strong> 28 Bond Street, Mayfair</li>
              <li><strong className="text-white font-normal">New York:</strong> 740 Madison Avenue, Upper East Side</li>
              <li><strong className="text-white font-normal">Tokyo:</strong> 5-7-15 Ginza, Chuo-ku</li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="md:col-span-2 space-y-3 text-xs text-[#AAA] font-light">
            <span className="text-xs uppercase tracking-widest text-white font-medium block mb-1">
              Client Care
            </span>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">AI Virtual Try-On Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bespoke Fitting Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garment Preservation & Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worldwide Express Logistics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Complimentary Returns</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 space-y-3 text-xs text-[#AAA] font-light">
            <span className="text-xs uppercase tracking-widest text-white font-medium block mb-1">
              Ethics & Legal
            </span>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Sustainable Fiber Provenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Zero-Waste Atelier Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">256-Bit SSL Privacy Shield</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Haute Couture Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777] font-mono">
          <div>
            © {new Date().getFullYear()} AURA ATELIER S.A. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>PARIS</span>
            <span>•</span>
            <span>MILAN</span>
            <span>•</span>
            <span>LONDON</span>
            <span>•</span>
            <span>TOKYO</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
