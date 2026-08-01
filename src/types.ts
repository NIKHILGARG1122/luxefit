export type Category = 'All' | 'Outerwear' | 'Tailoring' | 'Knitwear & Tops' | 'Dresses & Skirts' | 'Trousers' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  originalPrice?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  materials: string;
  details: string[];
  images: string[];
  careInstructions: string;
  sustainabilityNote: string;
  fitNotes: string;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  inStock: number;
  transparentImage?: string; // Garment silhouette for V-TryOn overlay
  categoryType: 'top' | 'bottom' | 'outerwear' | 'dress' | 'accessory';
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface ModelPreset {
  id: string;
  name: string;
  height: string;
  size: string;
  bustChest: string;
  waist: string;
  image: string;
  gender: 'female' | 'male' | 'unisex';
}

export interface UserMeasurements {
  heightCm: number;
  weightKg: number;
  chestBustCm: number;
  waistCm: number;
  hipsCm: number;
  fitPreference: 'fitted' | 'regular' | 'oversized';
}

export interface TryOnAnalysis {
  fitScore: number; // 0-100
  recommendedSize: string;
  drapeAndSilhouette: string;
  proportionsHarmony: string;
  stylingAdvice: string[];
  colorHarmony: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  deliveryMethod: 'express' | 'eco' | 'boutique';
}

export interface PaymentDetails {
  method: 'card' | 'applepay' | 'klarna' | 'googlepay';
  cardNumber?: string;
  cardName?: string;
  expDate?: string;
  cvv?: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  shipping: ShippingInfo;
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
}
