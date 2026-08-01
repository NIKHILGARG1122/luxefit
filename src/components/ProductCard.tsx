import React, { useState } from 'react';
import { Sparkles, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onTryOn: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currency: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onTryOn,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  currency
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-none border border-[#E8E6E1] hover:border-[#8C733E]/50 transition-all duration-300 overflow-hidden">
      {/* Image Container with Hover Swap */}
      <div
        className="relative aspect-[3/4] w-full bg-[#F5F4F0] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
        onMouseEnter={() => product.images[1] && setCurrentImageIndex(1)}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-[#121212] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#8C733E] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium">
              Atelier Icon
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all shadow-sm ${
            isWishlisted ? 'text-[#8C733E] bg-white' : 'text-[#555] hover:text-[#121212]'
          }`}
          title={isWishlisted ? "Remove from Saved" : "Save Item"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Hover Quick Try-On Overlay Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTryOn(product);
            }}
            className="flex-1 bg-[#121212] hover:bg-[#8C733E] text-white text-[11px] uppercase tracking-widest py-2.5 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors shadow-md font-medium"
          >
            <Sparkles size={13} className="text-[#D4AF37]" />
            <span>Virtual Try-On</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white hover:bg-[#F0EFEA] text-[#121212] p-2.5 rounded-none transition-colors shadow-md"
            title="Quick View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#888] font-medium mb-1">
            <span>{product.category}</span>
            <span>{product.materials.split(',')[0]}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base font-normal text-[#121212] group-hover:text-[#8C733E] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#777] font-light mt-0.5 line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            {product.colors.map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor === col.name ? 'scale-125 border-[#121212] ring-1 ring-[#121212]' : 'border-gray-300'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>
        )}

        {/* Price & Quick Add */}
        <div className="pt-2 border-t border-[#F0EFEA] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold text-[#121212]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-[#999] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product, selectedColor, product.sizes[0] || 'S')}
            className="text-[11px] uppercase tracking-wider font-semibold text-[#121212] hover:text-[#8C733E] transition-colors flex items-center gap-1.5"
          >
            <span>+ Add Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
