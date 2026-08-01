import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  currency: string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  currency
}) => {
  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E8E6E1] text-[#121212] shadow-2xl flex flex-col justify-between">
          <div className="p-6 border-b border-[#E8E6E1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-[#8C733E]" fill="currentColor" />
              <span className="font-serif text-xl tracking-wider font-normal">Saved Atelier Wishlist</span>
              <span className="font-mono text-xs text-[#8C733E]">({wishlistProducts.length})</span>
            </div>
            <button onClick={onClose} className="p-2 text-[#555] hover:text-[#121212]">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div key={product.id} className="flex gap-4 border-b border-[#F0EFEA] pb-6">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover border border-[#E8E6E1]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm text-[#121212] font-normal line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#999] hover:text-red-700 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#777] font-mono mt-0.5">
                        {product.category} • {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.colors[0]?.name || '', product.sizes[0] || 'S');
                        onRemoveFromWishlist(product);
                      }}
                      className="mt-2 py-2 px-3 bg-[#121212] hover:bg-[#8C733E] text-white text-[11px] uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Shopping Bag</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="font-serif text-xl font-light text-[#555]">Your saved list is empty.</p>
                <p className="text-xs text-[#888] font-light">Click the heart icon on any garment to save for later.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
