import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Download, Printer, ArrowRight, PackageCheck, Sparkles, ShieldCheck } from 'lucide-react';
import { OrderConfirmation } from '../types';

interface OrderSuccessModalProps {
  confirmation: OrderConfirmation | null;
  onClose: () => void;
  currency: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  confirmation,
  onClose,
  currency
}) => {
  if (!confirmation) return null;

  useEffect(() => {
    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#121212', '#C5A059', '#FAF9F6']
    });
  }, []);

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] text-[#121212] border border-[#E8E6E1] shadow-2xl overflow-hidden p-6 sm:p-10 my-8">
        {/* Top Header Card */}
        <div className="text-center space-y-3 pb-6 border-b border-[#E8E6E1]">
          <div className="inline-flex p-3 bg-[#121212] text-[#D4AF37] rounded-full shadow-lg">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#8C733E] font-bold block">
            Payment Confirmed & Secured
          </span>

          <h2 className="font-serif text-3xl font-normal text-[#121212]">
            Thank You for Your Order
          </h2>

          <p className="text-xs text-[#555] font-light max-w-md mx-auto">
            Your sartorial order <strong className="font-mono text-[#121212]">{confirmation.orderId}</strong> has been registered with our Paris Atelier. A confirmation receipt was emailed to <strong className="text-[#121212]">{confirmation.shipping.email}</strong>.
          </p>
        </div>

        {/* Delivery Status Card */}
        <div className="my-6 bg-white p-4 border border-[#E8E6E1] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1B3B2B]/10 text-[#1B3B2B] rounded-full">
              <PackageCheck size={20} />
            </div>
            <div>
              <div className="font-bold text-[#121212]">Express Signature Delivery</div>
              <div className="text-[11px] text-[#777]">{confirmation.estimatedDelivery}</div>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-[#121212] text-white px-2.5 py-1 uppercase font-bold">
            Processing
          </span>
        </div>

        {/* Itemized Receipt Breakdown */}
        <div className="space-y-4 my-6 text-xs">
          <h4 className="font-serif text-sm font-medium text-[#121212] uppercase tracking-wider">
            Order Receipt Summary
          </h4>

          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
            {confirmation.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-[#F0EFEA] pb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-10 h-12 object-cover border border-[#E8E6E1]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="font-serif text-[#121212]">{item.product.name}</div>
                    <div className="text-[10px] text-[#777] font-mono">
                      {item.selectedColor} • {item.selectedSize} • Qty {item.quantity}
                    </div>
                  </div>
                </div>

                <span className="font-mono font-medium text-[#121212]">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 text-xs text-[#555] pt-2 border-t border-[#E8E6E1]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-[#121212]">{formatPrice(confirmation.subtotal)}</span>
            </div>
            {confirmation.discount > 0 && (
              <div className="flex justify-between text-[#8C733E]">
                <span>VIP Discount</span>
                <span className="font-mono">-{formatPrice(confirmation.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-mono text-[#1B3B2B]">{confirmation.shippingFee === 0 ? 'Complimentary' : formatPrice(confirmation.shippingFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#121212] pt-2 border-t border-[#E8E6E1]">
              <span>Total Paid</span>
              <span className="font-mono text-base">{formatPrice(confirmation.total)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#E8E6E1]">
          <button
            onClick={handlePrint}
            className="py-3 px-4 border border-[#D8D6D1] text-[#121212] text-xs uppercase font-medium hover:bg-gray-100 flex items-center gap-1.5"
          >
            <Printer size={15} />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#121212] hover:bg-[#8C733E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Continue Atelier Browsing</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
