import React, { useState, useEffect } from 'react';
import { Product, Category, CartItem, OrderConfirmation } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { AiSizeAdvisorModal } from './components/AiSizeAdvisorModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';

export default function App() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [tryOnInitialProduct, setTryOnInitialProduct] = useState<Product | null>(null);
  const [sizeAdvisorProduct, setSizeAdvisorProduct] = useState<Product | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('ATELIER15');
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  // Load products from backend endpoint if needed
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.log('Loaded default static catalog:', err));
  }, []);

  // Cart actions
  const handleAddToCart = (product: Product, color: string, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) => ci.product.id === product.id && ci.selectedColor === color && ci.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedColor: color, selectedSize: size, quantity }];
    });
  };

  const handleAddLookToCart = (lookProducts: Product[]) => {
    lookProducts.forEach((p) => {
      handleAddToCart(p, p.colors[0]?.name || '', p.sizes[0] || 'S', 1);
    });
    setIsTryOnOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleOpenTryOnForProduct = (product: Product) => {
    setTryOnInitialProduct(product);
    setIsTryOnOpen(true);
  };

  const handleProceedToCheckout = (promoCode: string) => {
    setCheckoutPromoCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (confirmation: OrderConfirmation) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setOrderConfirmation(confirmation);
  };

  const scrollToGrid = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      {/* Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToGrid();
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTryOn={() => {
          setTryOnInitialProduct(null);
          setIsTryOnOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Hero Editorial Banner */}
      <HeroBanner
        onOpenTryOn={() => {
          setTryOnInitialProduct(null);
          setIsTryOnOpen(true);
        }}
        onExploreClick={scrollToGrid}
      />

      {/* Product Catalog Grid */}
      <div id="catalog-grid">
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickView={(p) => setQuickViewProduct(p)}
          onTryOn={handleOpenTryOnForProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          currency={currency}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onTryOn={handleOpenTryOnForProduct}
        onOpenSizeAdvisor={(p) => setSizeAdvisorProduct(p)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        currency={currency}
      />

      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        products={products}
        initialProduct={tryOnInitialProduct}
        onAddLookToCart={handleAddLookToCart}
      />

      <AiSizeAdvisorModal
        product={sizeAdvisorProduct}
        onClose={() => setSizeAdvisorProduct(null)}
        onSelectRecommendedSize={(size) => {
          if (quickViewProduct) {
            // Apply size
          }
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        currency={currency}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        appliedPromoCode={checkoutPromoCode}
        onOrderComplete={handleOrderComplete}
        currency={currency}
      />

      <OrderSuccessModal
        confirmation={orderConfirmation}
        onClose={() => setOrderConfirmation(null)}
        currency={currency}
      />
    </div>
  );
}
