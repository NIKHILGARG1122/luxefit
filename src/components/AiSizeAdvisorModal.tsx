import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product, UserMeasurements } from '../types';

interface AiSizeAdvisorModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRecommendedSize: (size: string) => void;
}

export const AiSizeAdvisorModal: React.FC<AiSizeAdvisorModalProps> = ({
  product,
  onClose,
  onSelectRecommendedSize
}) => {
  if (!product) return null;

  const [measurements, setMeasurements] = useState<UserMeasurements>({
    heightCm: 175,
    weightKg: 65,
    chestBustCm: 88,
    waistCm: 70,
    hipsCm: 95,
    fitPreference: 'regular'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<any | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/size-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          measurements
        })
      });

      const data = await res.json();
      if (data.success && data.advice) {
        setAdvice(data.advice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF9F6] text-[#121212] border border-[#E8E6E1] shadow-2xl overflow-hidden p-6 sm:p-8 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#121212] hover:text-[#8C733E]"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 border-b border-[#E8E6E1] pb-4 mb-6">
          <div className="p-2.5 bg-[#121212] text-[#D4AF37] rounded-full">
            <Ruler size={20} />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#8C733E] font-bold block">
              Smart Atelier Fit Engine
            </span>
            <h3 className="font-serif text-xl font-normal text-[#121212]">
              AI Size Advisor for {product.name}
            </h3>
          </div>
        </div>

        {!advice ? (
          <form onSubmit={handleCalculate} className="space-y-4 text-xs">
            <p className="text-[#666] font-light">
              Enter your body measurements to calculate your tailored size match for this garment.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase tracking-wider text-[#555] font-medium mb-1">
                  Height: {measurements.heightCm} cm ({Math.floor(measurements.heightCm / 30.48)}' {Math.round((measurements.heightCm % 30.48) / 2.54)}")
                </label>
                <input
                  type="range"
                  min="150"
                  max="205"
                  value={measurements.heightCm}
                  onChange={(e) => setMeasurements({ ...measurements, heightCm: Number(e.target.value) })}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#555] font-medium mb-1">
                  Weight: {measurements.weightKg} kg ({Math.round(measurements.weightKg * 2.205)} lbs)
                </label>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={measurements.weightKg}
                  onChange={(e) => setMeasurements({ ...measurements, weightKg: Number(e.target.value) })}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#555] font-medium mb-1">
                  Chest / Bust: {measurements.chestBustCm} cm
                </label>
                <input
                  type="range"
                  min="70"
                  max="130"
                  value={measurements.chestBustCm}
                  onChange={(e) => setMeasurements({ ...measurements, chestBustCm: Number(e.target.value) })}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#555] font-medium mb-1">
                  Waist: {measurements.waistCm} cm
                </label>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={measurements.waistCm}
                  onChange={(e) => setMeasurements({ ...measurements, waistCm: Number(e.target.value) })}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-[#555] font-medium mb-1">
                Fit Silhouette Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['fitted', 'regular', 'oversized'] as const).map((pref) => (
                  <button
                    type="button"
                    key={pref}
                    onClick={() => setMeasurements({ ...measurements, fitPreference: pref })}
                    className={`py-2 px-3 border uppercase font-medium transition-all ${
                      measurements.fitPreference === pref
                        ? 'border-[#121212] bg-[#121212] text-white'
                        : 'border-[#D8D6D1] bg-white text-[#333]'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#121212] hover:bg-[#8C733E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Sparkles size={16} className="animate-spin" />
                  <span>Computing Bespoke Fit...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-[#D4AF37]" />
                  <span>Calculate Recommended Size</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-5 text-xs animate-fade-in">
            <div className="bg-[#121212] text-white p-6 text-center border-l-4 border-[#D4AF37]">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Recommended Match ({advice.confidenceScore}% Confidence)
              </span>
              <div className="font-mono text-3xl font-bold mt-1 text-white">
                {advice.recommendedSize}
              </div>
            </div>

            <div className="bg-white p-4 border border-[#E8E6E1] space-y-2 text-[#444] font-light">
              <strong className="text-[#121212] uppercase tracking-wider block font-medium">Fit Analysis:</strong>
              <p>{advice.fitDetail}</p>

              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-[#F0EFEA] mt-2">
                <div>Shoulders: <strong className="text-[#121212]">{advice.shoulderChestFit}</strong></div>
                <div>Waist/Hips: <strong className="text-[#121212]">{advice.waistHipFit}</strong></div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setAdvice(null)}
                className="py-3 px-4 border border-[#D8D6D1] text-[#121212] uppercase text-xs font-medium hover:bg-gray-100"
              >
                Recalculate
              </button>

              <button
                onClick={() => {
                  onSelectRecommendedSize(advice.recommendedSize);
                  onClose();
                }}
                className="flex-1 py-3 px-4 bg-[#121212] hover:bg-[#8C733E] text-white uppercase text-xs tracking-wider font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Check size={16} />
                <span>Select Size {advice.recommendedSize}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
