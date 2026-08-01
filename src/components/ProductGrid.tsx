import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid2X2, Grid3X3, Sparkles, RotateCcw } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  currency: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  currency
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [columns, setColumns] = useState<2 | 4>(4);

  // Extract unique colors across catalog
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.colors.forEach(c => set.add(c.name)));
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (selectedColor !== 'All') {
      result = result.filter(p => p.colors.some(c => c.name === selectedColor));
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, selectedColor, sortBy]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E8E6E1] pb-6 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C733E] font-medium block mb-1">
            Atelier Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121212]">
            {activeCategory === 'All' ? 'Complete Collection' : activeCategory}
          </h2>
          <p className="text-xs text-[#777] font-light mt-1">
            Showing {filteredProducts.length} curated luxury garments
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Color Selector Filter */}
          <div className="flex items-center gap-2 border border-[#E8E6E1] bg-white px-3 py-2 text-xs">
            <span className="text-[#888] uppercase tracking-wider text-[10px]">Color:</span>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-[#121212] focus:ring-0 outline-none cursor-pointer"
            >
              {availableColors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 border border-[#E8E6E1] bg-white px-3 py-2 text-xs">
            <span className="text-[#888] uppercase tracking-wider text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-[#121212] focus:ring-0 outline-none cursor-pointer"
            >
              <option value="featured">Featured Atelier</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Grid Layout Column Switcher */}
          <div className="hidden sm:flex items-center border border-[#E8E6E1] bg-white p-1">
            <button
              onClick={() => setColumns(2)}
              className={`p-1.5 ${columns === 2 ? 'bg-[#121212] text-white' : 'text-[#888] hover:text-[#121212]'}`}
              title="2-Column Editorial View"
            >
              <Grid2X2 size={16} />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-1.5 ${columns === 4 ? 'bg-[#121212] text-white' : 'text-[#888] hover:text-[#121212]'}`}
              title="4-Column Grid View"
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Search Notice Banner if searching */}
      {searchQuery && (
        <div className="my-4 bg-[#F5F4F0] border border-[#E8E6E1] px-4 py-2.5 flex items-center justify-between text-xs text-[#555]">
          <span>Search results for: <strong className="text-[#121212]">"{searchQuery}"</strong></span>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-1 text-[#8C733E] hover:underline uppercase text-[10px] tracking-wider"
          >
            <RotateCcw size={12} /> Clear Filter
          </button>
        </div>
      )}

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div
          className={`mt-8 grid grid-cols-1 sm:grid-cols-2 ${
            columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'
          } gap-6 sm:gap-8`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onTryOn={onTryOn}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              currency={currency}
            />
          ))}
        </div>
      ) : (
        <div className="my-16 text-center py-16 bg-[#F5F4F0] border border-dashed border-[#D8D6D1]">
          <p className="font-serif text-2xl font-light text-[#121212]">No garments match your filter criteria.</p>
          <p className="text-xs text-[#777] font-light mt-2">Try adjusting your category selection, color filter, or search term.</p>
          <button
            onClick={() => {
              onSelectCategory('All');
              setSelectedColor('All');
              onClearSearch();
            }}
            className="mt-6 bg-[#121212] text-white px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-[#8C733E] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};
