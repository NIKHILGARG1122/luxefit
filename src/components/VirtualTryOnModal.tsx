import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Upload, Camera, Check, RefreshCcw, ShoppingBag, Layers, Download, Sliders, CheckCircle, Info } from 'lucide-react';
import { Product, ModelPreset, TryOnAnalysis } from '../types';
import { MODEL_PRESETS } from '../data/models';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProduct?: Product | null;
  onAddLookToCart: (products: Product[]) => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  products,
  initialProduct,
  onAddLookToCart
}) => {
  if (!isOpen) return null;

  // Selected Model/Photo state
  const [selectedModel, setSelectedModel] = useState<ModelPreset>(MODEL_PRESETS[0]);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  // Selected Garments to overlay/try on
  const [selectedGarments, setSelectedGarments] = useState<Product[]>(
    initialProduct ? [initialProduct] : [products[0]]
  );

  // Interactive Canvas Overlay Controls
  const [garmentScale, setGarmentScale] = useState<number>(100);
  const [garmentOffsetY, setGarmentOffsetY] = useState<number>(0);
  const [lightingFilter, setLightingFilter] = useState<'studio' | 'golden' | 'noir'>('studio');

  // AI Fitting Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<TryOnAnalysis | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto trigger analysis on initial open or garment change
  useEffect(() => {
    runAiTryOnAnalysis();
  }, [selectedModel, userPhotoUrl, selectedGarments]);

  const runAiTryOnAnalysis = async () => {
    if (selectedGarments.length === 0) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const activePhoto = userPhotoUrl || selectedModel.image;

      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelName: userPhotoUrl ? 'Custom User Photo' : selectedModel.name,
          modelHeight: selectedModel.height,
          modelSize: selectedModel.size,
          selectedProducts: selectedGarments,
          userPhotoBase64: userPhotoUrl || undefined
        })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (err) {
      console.error('Try On error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Upload Photo Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera Handler
  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Unable to access camera. Please allow camera permissions in browser settings.');
      setCameraActive(false);
    }
  };

  const captureCameraSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setUserPhotoUrl(dataUrl);

        // Stop stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(t => t.stop());
        setCameraActive(false);
      }
    }
  };

  const toggleGarmentSelection = (prod: Product) => {
    if (selectedGarments.some(p => p.id === prod.id)) {
      if (selectedGarments.length > 1) {
        setSelectedGarments(selectedGarments.filter(p => p.id !== prod.id));
      }
    } else {
      setSelectedGarments([...selectedGarments, prod]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#FAF9F6] text-[#121212] border border-[#E8E6E1] shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#121212] text-white px-6 py-4 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full text-[#D4AF37]">
              <Sparkles size={18} className="animate-spin-slow" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-normal tracking-wide flex items-center gap-2">
                AURA V-Atelier <span className="text-xs uppercase font-mono bg-[#D4AF37] text-black px-2 py-0.5 font-bold">Gemini AI Studio</span>
              </h2>
              <p className="text-[11px] text-[#BBB] font-light">
                Interactive Multi-Layer Virtual Fitting Room & Drape Analysis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#AAA] hover:text-white transition-colors"
            title="Close Fitting Room"
          >
            <X size={22} />
          </button>
        </div>

        {/* Main Body Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* LEFT 4 COLS: Studio Setup & Wardrobe Picker */}
          <div className="lg:col-span-4 p-5 bg-[#F5F4F0] border-b lg:border-b-0 lg:border-r border-[#E8E6E1] space-y-6 overflow-y-auto max-h-[80vh]">
            {/* Step 1: Model & Photo Selector */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[#8C733E] font-bold block mb-2">
                1. Select Persona or Upload Photo
              </label>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {MODEL_PRESETS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m);
                      setUserPhotoUrl(null);
                    }}
                    className={`relative p-1 border text-left transition-all ${
                      !userPhotoUrl && selectedModel.id === m.id
                        ? 'border-[#121212] bg-white ring-1 ring-[#121212]'
                        : 'border-[#D8D6D1] bg-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full aspect-square object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-1 text-[10px] font-medium line-clamp-1 text-[#121212]">
                      {m.name.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Upload or Camera Options */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="border border-dashed border-[#121212]/40 hover:border-[#121212] bg-white p-2 text-center cursor-pointer flex items-center justify-center gap-1.5 transition-colors">
                  <Upload size={14} className="text-[#8C733E]" />
                  <span className="font-medium text-[11px]">Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={startCamera}
                  className="border border-[#121212]/40 hover:border-[#121212] bg-white p-2 text-center flex items-center justify-center gap-1.5 transition-colors font-medium text-[11px]"
                >
                  <Camera size={14} className="text-[#8C733E]" />
                  <span>Webcam Snap</span>
                </button>
              </div>

              {userPhotoUrl && (
                <div className="mt-2 text-[10px] text-[#1B3B2B] flex items-center gap-1 font-medium bg-[#1B3B2B]/10 p-1.5 border border-[#1B3B2B]/20">
                  <CheckCircle size={12} />
                  <span>Using custom persona photo</span>
                  <button
                    onClick={() => setUserPhotoUrl(null)}
                    className="ml-auto underline text-[#888] hover:text-black"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Wardrobe Garment Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-[#8C733E] font-bold">
                  2. Wardrobe Ensemble ({selectedGarments.length})
                </label>
                <span className="text-[10px] text-[#777]">Tap item to toggle</span>
              </div>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {products.map((prod) => {
                  const isSelected = selectedGarments.some(p => p.id === prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => toggleGarmentSelection(prod)}
                      className={`p-2 border flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#121212] bg-white shadow-sm ring-1 ring-[#121212]'
                          : 'border-[#E8E6E1] bg-white/50 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-14 object-cover border border-[#E8E6E1]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 text-xs">
                        <div className="font-serif font-medium line-clamp-1 text-[#121212]">
                          {prod.name}
                        </div>
                        <div className="text-[10px] text-[#777]">
                          {prod.category} • ${prod.price}
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                        isSelected ? 'bg-[#121212] text-white border-[#121212]' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Fit & Lighting Adjusters */}
            <div className="border-t border-[#E8E6E1] pt-4 space-y-3">
              <label className="text-xs uppercase tracking-widest text-[#8C733E] font-bold flex items-center gap-1.5">
                <Sliders size={14} />
                <span>Garment Fit & Lighting Fine-Tuning</span>
              </label>

              <div>
                <div className="flex justify-between text-[11px] text-[#555] mb-1">
                  <span>Drape Scale Adjustment</span>
                  <span className="font-mono font-bold">{garmentScale}%</span>
                </div>
                <input
                  type="range"
                  min="85"
                  max="135"
                  value={garmentScale}
                  onChange={(e) => setGarmentScale(Number(e.target.value))}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#555] mb-1">
                  <span>Vertical Shoulder Offset</span>
                  <span className="font-mono font-bold">{garmentOffsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  value={garmentOffsetY}
                  onChange={(e) => setGarmentOffsetY(Number(e.target.value))}
                  className="w-full accent-[#121212] cursor-pointer"
                />
              </div>

              {/* Lighting Filter Toggle */}
              <div>
                <span className="text-[11px] text-[#555] block mb-1">Studio Ambiance</span>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => setLightingFilter('studio')}
                    className={`py-1.5 px-2 border text-[10px] uppercase font-medium ${
                      lightingFilter === 'studio' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    Studio Neutral
                  </button>
                  <button
                    onClick={() => setLightingFilter('golden')}
                    className={`py-1.5 px-2 border text-[10px] uppercase font-medium ${
                      lightingFilter === 'golden' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    Golden Hour
                  </button>
                  <button
                    onClick={() => setLightingFilter('noir')}
                    className={`py-1.5 px-2 border text-[10px] uppercase font-medium ${
                      lightingFilter === 'noir' ? 'border-[#121212] bg-[#121212] text-white' : 'border-[#D8D6D1] bg-white'
                    }`}
                  >
                    Atelier Noir
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER 5 COLS: Interactive Try-On Visual Canvas Stage */}
          <div className="lg:col-span-5 p-6 bg-[#18181A] text-white flex flex-col items-center justify-between min-h-[500px]">
            {cameraActive ? (
              <div className="relative w-full aspect-[3/4] max-w-sm bg-black overflow-hidden flex flex-col items-center justify-center border border-[#333]">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <button
                  onClick={captureCameraSnapshot}
                  className="absolute bottom-4 bg-[#D4AF37] text-black font-bold py-2 px-6 rounded-full text-xs uppercase tracking-widest shadow-lg flex items-center gap-2"
                >
                  <Camera size={16} /> Capture Snapshot
                </button>
              </div>
            ) : (
              /* High-Resolution Virtual Try-On Canvas Stage */
              <div className={`relative w-full aspect-[3/4] max-w-sm bg-[#121212] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 ${
                lightingFilter === 'golden' ? 'sepia-[0.25] brightness-105' :
                lightingFilter === 'noir' ? 'contrast-125 grayscale' : ''
              }`}>
                {/* Layer 1: Base Persona Photo */}
                <img
                  src={userPhotoUrl || selectedModel.image}
                  alt="Model Persona"
                  className="w-full h-full object-cover object-top opacity-95 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {/* Layer 2: Selected Garments Layered Over Persona */}
                <div
                  className="absolute inset-0 pointer-events-none transition-transform duration-200 flex items-center justify-center"
                  style={{
                    transform: `scale(${garmentScale / 100}) translateY(${garmentOffsetY}px)`,
                  }}
                >
                  {selectedGarments.map((garment, idx) => (
                    <img
                      key={garment.id}
                      src={garment.transparentImage || garment.images[0]}
                      alt={garment.name}
                      className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-85 transition-all duration-500 filter drop-shadow-xl"
                      style={{
                        zIndex: 10 + idx,
                      }}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>

                {/* Status Indicator Overlay */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase text-[#D4AF37] flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                  <span>Interactive Drape Render</span>
                </div>

                {/* Model Info Badge */}
                <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 text-center text-xs">
                  <span className="font-serif text-[#FAF9F6] block">
                    {userPhotoUrl ? 'Custom User Persona' : selectedModel.name}
                  </span>
                  <span className="text-[10px] text-[#AAA] font-mono">
                    {selectedModel.height} • {selectedModel.size}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="w-full max-w-sm mt-4 flex items-center justify-between gap-3 text-xs">
              <button
                onClick={runAiTryOnAnalysis}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2.5 px-3 uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCcw size={14} />
                <span>Re-Analyze Fit</span>
              </button>

              <button
                onClick={() => onAddLookToCart(selectedGarments)}
                className="flex-1 bg-[#D4AF37] hover:bg-[#8C733E] text-black hover:text-white py-2.5 px-3 uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 transition-colors shadow-lg"
              >
                <ShoppingBag size={14} />
                <span>Add Ensemble Bag</span>
              </button>
            </div>
          </div>

          {/* RIGHT 3 COLS: Gemini AI Tailoring & Fitting Analysis */}
          <div className="lg:col-span-3 p-5 bg-[#FAF9F6] space-y-5 overflow-y-auto max-h-[80vh]">
            <div className="border-b border-[#E8E6E1] pb-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C733E] font-bold block mb-1">
                AI Fitting Report
              </span>
              <h3 className="font-serif text-lg font-normal text-[#121212]">
                Gemini Tailor Evaluation
              </h3>
            </div>

            {isAnalyzing ? (
              <div className="py-12 text-center space-y-4">
                <div className="inline-block p-4 bg-[#121212] text-[#D4AF37] rounded-full animate-pulse">
                  <Sparkles size={28} />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-sm text-[#121212] font-medium">Scanning Garment Contour Drape...</p>
                  <p className="text-[11px] text-[#777] font-mono animate-pulse">
                    Evaluating fabric weight, shoulder seams, and waist ratio
                  </p>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4 text-xs">
                {/* Fit Score Badge */}
                <div className="bg-[#121212] text-white p-4 text-center border-l-4 border-[#D4AF37]">
                  <div className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Fit Confidence Index</div>
                  <div className="font-mono text-3xl font-bold mt-0.5 text-white">
                    {analysisResult.fitScore}%
                  </div>
                  <div className="text-[11px] text-[#CCC] mt-1">
                    Recommended Size: <strong className="text-[#D4AF37] font-mono">{analysisResult.recommendedSize}</strong>
                  </div>
                </div>

                {/* Architectural Drape */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#121212] block mb-1">
                    Fabric Drape & Silhouette:
                  </span>
                  <p className="text-[#444] leading-relaxed font-light bg-white p-3 border border-[#E8E6E1]">
                    {analysisResult.drapeAndSilhouette}
                  </p>
                </div>

                {/* Proportions */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#121212] block mb-1">
                    Proportions & Harmony:
                  </span>
                  <p className="text-[#444] leading-relaxed font-light bg-white p-3 border border-[#E8E6E1]">
                    {analysisResult.proportionsHarmony}
                  </p>
                </div>

                {/* Styling Tips */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#121212] block mb-1">
                    Atelier Styling Guidance:
                  </span>
                  <ul className="space-y-1.5 font-light text-[#444]">
                    {analysisResult.stylingAdvice?.map((tip, i) => (
                      <li key={i} className="flex items-start gap-1.5 bg-white p-2 border border-[#E8E6E1]">
                        <Sparkles size={12} className="text-[#8C733E] flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Color Harmony */}
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#121212] block mb-1">
                    Tone Harmony:
                  </span>
                  <p className="text-[#444] leading-relaxed font-light bg-white p-2.5 border border-[#E8E6E1]">
                    {analysisResult.colorHarmony}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-[#888]">
                Select garments to analyze fit.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
