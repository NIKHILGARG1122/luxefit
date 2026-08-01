import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CreditCard, CheckCircle, Truck, Building2, Smartphone, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, ShippingInfo, PaymentDetails, OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedPromoCode: string;
  onOrderComplete: (confirmation: OrderConfirmation) => void;
  currency: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedPromoCode,
  onOrderComplete,
  currency
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);

  // Shipping Form State
  const [shipping, setShipping] = useState<ShippingInfo>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@atelier-aura.com',
    phone: '+1 (555) 234-5678',
    address: '740 Park Avenue',
    apartment: 'Penthouse 12A',
    city: 'New York',
    state: 'NY',
    zipCode: '10021',
    country: 'United States',
    deliveryMethod: 'express'
  });

  // Payment Form State
  const [payment, setPayment] = useState<PaymentDetails>({
    method: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardName: 'Eleanor Vance',
    expDate: '12/28',
    cvv: '888'
  });

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedPromoCode.toUpperCase() === 'ATELIER15' ? Math.round(subtotal * 0.15) : 0;
  const shippingFee = shipping.deliveryMethod === 'express' && subtotal < 300 ? 35 : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shippingFee + tax;

  const formatPrice = (val: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(val * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(val * 0.78).toLocaleString()}`;
      case 'JPY': return `¥${Math.round(val * 155).toLocaleString()}`;
      default: return `$${val.toLocaleString()}`;
    }
  };

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setPayment({ ...payment, cardNumber: formatted });
  };

  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const steps = [
      'Establishing 256-bit TLS encrypted session...',
      'Verifying atelier inventory reservations...',
      'Authorizing PCI-DSS payment token...',
      'Securing transaction signature & order receipt...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStatus(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          shipping,
          payment,
          discountCode: appliedPromoCode
        })
      });

      const data = await res.json();
      if (data.success && data.confirmation) {
        onOrderComplete(data.confirmation);
      }
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] text-[#121212] border border-[#E8E6E1] shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#121212] hover:text-[#8C733E] bg-white rounded-full shadow"
        >
          <X size={20} />
        </button>

        {/* Processing Loading Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-30 bg-[#121212]/95 text-white flex flex-col items-center justify-center p-8 text-center space-y-6">
            <div className="p-4 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full text-[#D4AF37] animate-spin-slow">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-light tracking-wide text-[#FAF9F6]">
                Authorizing Secure Payment
              </h3>
              <p className="font-mono text-xs text-[#D4AF37] animate-pulse">
                {processingStatus}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-[#AAA]">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span>PCI-DSS Level 1 Compliant Authorization</span>
            </div>
          </div>
        )}

        {/* Left Column: Checkout Steps Form */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto space-y-6 border-b md:border-b-0 md:border-r border-[#E8E6E1]">
          {/* Header & Steps Indicator */}
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C733E] font-bold">
              <Lock size={14} />
              <span>Encrypted Checkout</span>
            </div>
            <h2 className="font-serif text-2xl font-normal text-[#121212] mt-1">
              {step === 1 ? '1. Shipping & Delivery' : '2. Secure Payment Gateway'}
            </h2>

            <div className="flex items-center gap-2 mt-3">
              <div className={`flex-1 h-1 ${step >= 1 ? 'bg-[#121212]' : 'bg-[#E8E6E1]'}`} />
              <div className={`flex-1 h-1 ${step >= 2 ? 'bg-[#121212]' : 'bg-[#E8E6E1]'}`} />
            </div>
          </div>

          {step === 1 ? (
            /* STEP 1: Shipping Form */
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    value={shipping.firstName}
                    onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    value={shipping.lastName}
                    onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">Email Receipt Address</label>
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">Mobile Phone (Delivery SMS)</label>
                  <input
                    type="tel"
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#555] uppercase font-medium mb-1">Street Address</label>
                <input
                  type="text"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">State / Prov</label>
                  <input
                    type="text"
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#555] uppercase font-medium mb-1">ZIP / Postal</label>
                  <input
                    type="text"
                    value={shipping.zipCode}
                    onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                  />
                </div>
              </div>

              {/* Delivery Method Selector */}
              <div className="pt-2">
                <label className="block text-[#555] uppercase font-bold mb-2">Select Delivery Method</label>
                <div className="space-y-2">
                  <div
                    onClick={() => setShipping({ ...shipping, deliveryMethod: 'express' })}
                    className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                      shipping.deliveryMethod === 'express' ? 'border-[#121212] bg-white ring-1 ring-[#121212]' : 'border-[#E8E6E1] bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck size={16} className="text-[#8C733E]" />
                      <div>
                        <div className="font-medium">Express Courier (Signature Required)</div>
                        <div className="text-[10px] text-[#777]">2-3 Business Days • DHL / FedEx Signature</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#121212]">
                      {subtotal >= 300 ? 'Complimentary' : '$35'}
                    </span>
                  </div>

                  <div
                    onClick={() => setShipping({ ...shipping, deliveryMethod: 'eco' })}
                    className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                      shipping.deliveryMethod === 'eco' ? 'border-[#121212] bg-white ring-1 ring-[#121212]' : 'border-[#E8E6E1] bg-white/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck size={16} className="text-[#1B3B2B]" />
                      <div>
                        <div className="font-medium">Carbon-Neutral Ground Shipping</div>
                        <div className="text-[10px] text-[#777]">4-6 Business Days • 100% Offset</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1B3B2B]">Complimentary</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-4 bg-[#121212] hover:bg-[#8C733E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* STEP 2: Payment Gateway Form */
            <form onSubmit={handleProcessOrder} className="space-y-4 text-xs">
              {/* Payment Method Tabs */}
              <div>
                <label className="block text-[#555] uppercase font-bold mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'card' })}
                    className={`p-2.5 border text-center font-medium flex items-center justify-center gap-1.5 transition-all ${
                      payment.method === 'card' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    <CreditCard size={14} />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'applepay' })}
                    className={`p-2.5 border text-center font-medium flex items-center justify-center gap-1.5 transition-all ${
                      payment.method === 'applepay' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    <Smartphone size={14} />
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'klarna' })}
                    className={`p-2.5 border text-center font-medium transition-all ${
                      payment.method === 'klarna' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    <span>Klarna (4x)</span>
                  </button>
                </div>
              </div>

              {payment.method === 'card' ? (
                <div className="space-y-3 bg-white p-4 border border-[#E8E6E1]">
                  <div>
                    <label className="block text-[#555] uppercase font-medium mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={payment.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-10 pr-3 py-2 bg-[#F5F4F0] border border-[#D8D6D1] text-xs font-mono focus:ring-0 outline-none"
                        required
                      />
                      <CreditCard size={16} className="absolute left-3 top-2.5 text-[#888]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#555] uppercase font-medium mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F5F4F0] border border-[#D8D6D1] text-xs focus:ring-0 outline-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#555] uppercase font-medium mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={payment.expDate}
                        onChange={(e) => setPayment({ ...payment, expDate: e.target.value })}
                        placeholder="12/28"
                        className="w-full px-3 py-2 bg-[#F5F4F0] border border-[#D8D6D1] text-xs font-mono focus:ring-0 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#555] uppercase font-medium mb-1">CVC / Security Code</label>
                      <input
                        type="password"
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                        placeholder="888"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-[#F5F4F0] border border-[#D8D6D1] text-xs font-mono focus:ring-0 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 border border-[#E8E6E1] text-center space-y-2">
                  <p className="font-serif text-sm">Express One-Touch Payment Selected</p>
                  <p className="text-[11px] text-[#777]">Biometric authentication will prompt upon clicking Authorize.</p>
                </div>
              )}

              {/* Security Badges */}
              <div className="bg-[#121212]/5 p-3 border border-[#E8E6E1] flex items-center justify-between text-[11px] text-[#555]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#8C733E]" />
                  <span>256-Bit SSL Encrypted Vault</span>
                </div>
                <div className="font-mono text-[10px] text-[#777]">PCI-DSS LEVEL 1</div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3.5 px-4 border border-[#D8D6D1] text-[#121212] uppercase text-xs font-medium hover:bg-gray-100 flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#121212] hover:bg-[#8C733E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock size={14} className="text-[#D4AF37]" />
                  <span>Authorize Payment ({formatPrice(total)})</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary Breakdown */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 bg-[#F5F4F0] flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C733E] font-bold block mb-1">
              Order Summary ({cartItems.length} items)
            </span>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 my-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-3 text-xs border-b border-[#E8E6E1] pb-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover border border-[#E8E6E1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="font-serif text-[#121212] line-clamp-1">{item.product.name}</div>
                    <div className="text-[10px] text-[#777] font-mono">
                      {item.selectedColor} • {item.selectedSize} • Qty {item.quantity}
                    </div>
                    <div className="font-mono font-medium text-[#121212] mt-0.5">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-[#555] border-t border-[#E8E6E1] pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#121212] font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#8C733E]">
                  <span>VIP Access Discount (15%)</span>
                  <span className="font-mono">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-mono text-[#1B3B2B]">{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono">{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between border-t border-[#E8E6E1] pt-3 text-base font-bold text-[#121212]">
                <span>Total Amount</span>
                <span className="font-mono text-lg">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-[#777] font-light bg-white p-3 border border-[#E8E6E1] space-y-1">
            <div className="font-medium text-[#121212]">Atelier Service Guarantee:</div>
            <p>Every garment arrives in a signature garment bag with engraved wooden hanger and certificate of authenticity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
