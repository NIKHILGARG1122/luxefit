import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (promoCode: string) => void;
  currency: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('ATELIER15');
  const [appliedPromo, setAppliedPromo] = useState('ATELIER15');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedPromo.toUpperCase() === 'ATELIER15' ? Math.round(subtotal * 0.15) : 0;
  const freeShippingThreshold = 300;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  const handleApplyPromo = () => {
    setAppliedPromo(promoInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E8E6E1] text-[#121212] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E6E1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wider font-normal">Shopping Bag</span>
              <span className="font-mono text-xs text-[#8C733E]">({cartItems.length} items)</span>
            </div>
            <button onClick={onClose} className="p-2 text-[#555] hover:text-[#121212]">
              <X size={20} />
            </button>
          </div>

          {/* Free Express Shipping Meter */}
          <div className="bg-[#121212] text-white py-3 px-6 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-light">
              <span className="flex items-center gap-1.5">
                <Truck size={14} className="text-[#D4AF37]" />
                {subtotal >= freeShippingThreshold
                  ? 'Complimentary Worldwide Express Unlocked'
                  : `Add ${formatPrice(freeShippingThreshold - subtotal)} more for Free Express Shipping`}
              </span>
              <span className="font-mono text-[#D4AF37] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#D4AF37] h-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b border-[#F0EFEA] pb-6">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover border border-[#E8E6E1]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm text-[#121212] font-normal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#999] hover:text-red-700 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#777] font-mono mt-0.5 space-x-2">
                        <span>Color: {item.selectedColor}</span>
                        <span>•</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D8D6D1] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="px-2 py-1 font-mono text-[#555] hover:text-[#121212]"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 font-mono font-medium text-[#121212]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="px-2 py-1 font-mono text-[#555] hover:text-[#121212]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#121212]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="font-serif text-xl font-light text-[#555]">Your shopping bag is empty.</p>
                <p className="text-xs text-[#888] font-light">Explore our Autumn Atelier collection to add items.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#E8E6E1] bg-white space-y-4">
              {/* Promo Code Input */}
              <div className="flex gap-2 text-xs">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-3 text-[#888]" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="VIP Promo Code"
                    className="w-full pl-8 pr-3 py-2 bg-[#F5F4F0] border border-[#E8E6E1] text-xs font-mono uppercase focus:ring-0 outline-none"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="bg-[#121212] text-white px-4 py-2 uppercase text-[11px] font-medium tracking-wider hover:bg-[#8C733E] transition-colors"
                >
                  Apply
                </button>
              </div>

              {appliedPromo.toUpperCase() === 'ATELIER15' && (
                <div className="text-[11px] text-[#1B3B2B] bg-[#1B3B2B]/10 p-2 border border-[#1B3B2B]/20 flex items-center justify-between">
                  <span>VIP Access Discount Applied (15% Off)</span>
                  <span className="font-mono font-bold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#555]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#121212] font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#8C733E]">
                    <span>VIP Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Courier</span>
                  <span className="font-mono text-[#1B3B2B]">{subtotal >= freeShippingThreshold ? 'Complimentary' : '$35'}</span>
                </div>
                <div className="flex justify-between border-t border-[#E8E6E1] pt-2 font-bold text-sm text-[#121212]">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base">{formatPrice(subtotal - discount + (subtotal >= freeShippingThreshold ? 0 : 35))}</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout(appliedPromo)}
                className="w-full py-4 bg-[#121212] hover:bg-[#8C733E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase text-[#888] font-mono">
                <ShieldCheck size={12} className="text-[#8C733E]" />
                <span>256-Bit Encrypted SSL Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
