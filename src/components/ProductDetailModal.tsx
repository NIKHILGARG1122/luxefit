import React, { useState } from 'react';
import { X, Sparkles, Heart, ShieldCheck, Truck, RefreshCcw, Ruler, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
  onTryOn: (product: Product) => void;
  onOpenSizeAdvisor: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  currency: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onTryOn,
  onOpenSizeAdvisor,
  onToggleWishlist,
  isWishlisted,
  currency
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '38 (S)');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] text-[#121212] border border-[#E8E6E1] shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#121212] hover:text-[#8C733E] bg-white/80 rounded-full transition-colors"
          title="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Left: Gallery Column */}
        <div className="w-full md:w-1/2 bg-[#F5F4F0] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E6E1]">
          {/* Main Large Display Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-white border border-[#E8E6E1]">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => onTryOn(product)}
              className="absolute bottom-4 left-4 right-4 bg-[#121212]/90 hover:bg-[#8C733E] text-white py-3 px-4 text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 backdrop-blur-sm transition-all shadow-lg"
            >
              <Sparkles size={15} className="text-[#D4AF37]" />
              <span>Try On in AI V-Atelier</span>
            </button>
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-20 flex-shrink-0 border transition-all ${
                    selectedImageIndex === idx ? 'border-[#121212] ring-1 ring-[#121212]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Detail Column */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C733E] uppercase tracking-[0.2em] font-medium">
              <span>{product.category}</span>
              <span>In Stock: {product.inStock} items</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121212] mt-1">
              {product.name}
            </h1>

            <p className="text-xs text-[#777] font-light mt-1">
              {product.subtitle}
            </p>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="font-mono text-xl font-semibold text-[#121212]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-sm text-[#999] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-[#444] font-light leading-relaxed border-t border-b border-[#E8E6E1] py-4">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#555] font-medium mb-2">
              <span>Colorway: <strong className="text-[#121212]">{selectedColor}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-all ${
                    selectedColor === c.name
                      ? 'border-[#121212] bg-[#121212] text-white font-medium'
                      : 'border-[#D8D6D1] bg-white text-[#333] hover:border-[#121212]'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector + AI Size Advisor Button */}
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#555] font-medium mb-2">
              <span>Size: <strong className="text-[#121212]">{selectedSize}</strong></span>

              <button
                onClick={() => onOpenSizeAdvisor(product)}
                className="text-[#8C733E] hover:underline flex items-center gap-1 font-medium text-[11px]"
              >
                <Ruler size={13} />
                <span>Find My Size (AI Advisor)</span>
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2 px-1 text-xs uppercase text-center border font-mono transition-all ${
                    selectedSize === sz
                      ? 'border-[#121212] bg-[#121212] text-white font-bold'
                      : 'border-[#D8D6D1] bg-white text-[#333] hover:border-[#121212]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#777] font-light mt-1.5">{product.fitNotes}</p>
          </div>

          {/* Quantity & CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D8D6D1] bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-xs font-mono text-[#555] hover:text-[#121212]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-medium text-[#121212] min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-xs font-mono text-[#555] hover:text-[#121212]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-[#1B3B2B] text-white'
                    : 'bg-[#121212] hover:bg-[#8C733E] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add to Shopping Bag</span>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3 border transition-colors ${
                  isWishlisted ? 'border-[#8C733E] text-[#8C733E] bg-[#8C733E]/10' : 'border-[#D8D6D1] text-[#555] hover:border-[#121212]'
                }`}
                title="Save Item"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Provenance & Care Accordion */}
          <div className="border-t border-[#E8E6E1] pt-4 space-y-3 text-xs text-[#555]">
            <div>
              <strong className="text-[#121212] block mb-1 uppercase tracking-wider font-medium">Material Provenance:</strong>
              <p className="font-light">{product.materials}</p>
            </div>

            <div>
              <strong className="text-[#121212] block mb-1 uppercase tracking-wider font-medium">Atelier Details:</strong>
              <ul className="list-disc list-inside space-y-0.5 font-light">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong className="text-[#121212] block mb-1 uppercase tracking-wider font-medium">Sustainability Index:</strong>
              <p className="font-light text-[#1B3B2B]">{product.sustainabilityNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
