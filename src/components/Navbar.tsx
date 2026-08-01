import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Heart, Search, Menu, X, Globe, SlidersHorizontal } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTryOn: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Outerwear',
  'Tailoring',
  'Knitwear & Tops',
  'Dresses & Skirts',
  'Trousers',
  'Accessories'
];

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTryOn,
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E6E1]">
      {/* Top Banner */}
      <div className="bg-[#121212] text-[#E8E6E1] text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span>Complimentary Worldwide Express Shipping on Orders Over $300</span>
        <span className="hidden sm:inline text-[#D4AF37]">|</span>
        <span className="hidden sm:inline text-[#D4AF37]">VIP Access: Use Code <strong className="underline text-white">ATELIER15</strong> for 15% Off</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Currency Selector */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#121212] hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#555] uppercase tracking-wider hover:text-[#121212] cursor-pointer">
            <Globe size={14} />
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="bg-transparent border-none text-xs font-mono font-medium text-[#121212] focus:ring-0 cursor-pointer uppercase"
            >
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="JPY">¥ JPY</option>
            </select>
          </div>
        </div>

        {/* Center Logo */}
        <div className="text-center flex-1 lg:flex-none">
          <a href="#" className="inline-block group">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-semibold text-[#121212] uppercase group-hover:text-[#8C733E] transition-colors">
              AURA
            </span>
            <span className="block text-[9px] tracking-[0.35em] text-[#888] uppercase -mt-1 font-sans">
              ATELIER PARIS
            </span>
          </a>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Virtual Try-On CTA Button */}
          <button
            onClick={onOpenTryOn}
            className="relative group flex items-center gap-2 bg-[#121212] text-[#FAF9F6] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs tracking-wider uppercase font-medium hover:bg-[#8C733E] transition-all shadow-sm"
          >
            <Sparkles size={14} className="text-[#D4AF37] animate-pulse" />
            <span className="hidden md:inline">V-Atelier</span>
            <span className="inline md:hidden">Try On</span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
            </span>
          </button>

          {/* Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-[#121212] hover:text-[#8C733E] transition-colors"
            title="Search Collection"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#121212] hover:text-[#8C733E] transition-colors"
            title="Saved Items"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8C733E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#121212] hover:text-[#8C733E] transition-colors flex items-center gap-2"
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="bg-[#121212] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Links Navigation Bar */}
      <nav className="hidden lg:block border-t border-[#E8E6E1]/60 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-[#555]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`transition-all duration-200 relative py-1 ${
                activeCategory === cat
                  ? 'text-[#121212] font-semibold'
                  : 'hover:text-[#121212]'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#121212]" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="border-t border-[#E8E6E1] bg-[#FAF9F6] py-4 px-6 transition-all duration-300">
          <div className="max-w-3xl mx-auto flex items-center gap-3 bg-white border border-[#D8D6D1] px-4 py-2.5 rounded-full shadow-inner">
            <Search size={18} className="text-[#888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by silk, cashmere, outerwear, trousers, tailoring..."
              className="w-full text-sm bg-transparent border-none focus:ring-0 outline-none text-[#121212] placeholder-[#999]"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-xs uppercase text-[#888] hover:text-[#121212] px-2"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-[#888] hover:text-[#121212] p-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E6E1] bg-[#FAF9F6] py-6 px-6 space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#888] font-bold mb-2">Categories</div>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#121212] text-white font-medium'
                    : 'text-[#333] hover:bg-[#E8E6E1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
