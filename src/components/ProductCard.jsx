import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';

export function ProductCard({ product }) {
  const { addToCart, openQuickView } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    product.defaultSize || (product.sizes ? product.sizes[0] : null)
  );

  const [selectedHeight, setSelectedHeight] = useState(
    product.defaultHeight || (product.heightOptions ? product.heightOptions[0] : (product.elevationHeight || null))
  );

  const [quantity, setQuantity] = useState(1);

  // Multi-image slider state
  const imageList = (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handlePrevImg = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNextImg = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  // Dynamic price calculation based on selectedSize
  const currentPriceDisplay = React.useMemo(() => {
    if (product.sizePrices && selectedSize && product.sizePrices[selectedSize]) {
      return product.sizePrices[selectedSize].priceDisplay;
    }
    if (product.priceDisplay) return product.priceDisplay;
    if (product.priceNumeric) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(product.priceNumeric);
    }
    return 'PRICE ON WHATSAPP';
  }, [product, selectedSize]);

  const currentPriceNumeric = React.useMemo(() => {
    if (product.sizePrices && selectedSize && product.sizePrices[selectedSize]) {
      return product.sizePrices[selectedSize].priceNumeric;
    }
    return product.priceNumeric || null;
  }, [product, selectedSize]);

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      height: selectedHeight,
      quantity,
      priceDisplay: currentPriceDisplay,
      priceNumeric: currentPriceNumeric
    });
  };

  const handleWhatsAppInstantQuote = () => {
    const sizePart = selectedSize ? ` | Size: ${selectedSize}` : '';
    const heightPart = selectedHeight ? ` | Height: ${selectedHeight}` : '';
    const pricePart = currentPriceDisplay && currentPriceDisplay !== 'PRICE ON WHATSAPP' ? ` | Est. Price: ${currentPriceDisplay}` : '';
    const message = `Hello Fighter Forge, I'd like a factory quote for *${product.name}*${sizePart}${heightPart}${pricePart} | Qty: ${quantity}. Please share CAD layout, shipping schedule, and payment terms.`;
    openWhatsApp(message);
  };

  return (
    <div
      className={`group relative flex flex-col bg-[#161616] border transition-all duration-300 hover:-translate-y-1.5 ${
        product.isPro
          ? 'border-[#C9A24B]/50 hover:border-[#C9A24B] hover:shadow-[0_0_30px_rgba(201,162,75,0.25)]'
          : 'border-zinc-800 hover:border-[#E10B1F]/60 hover:shadow-[0_0_30px_rgba(225,11,31,0.25)]'
      }`}
      style={{
        clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)'
      }}
    >
      {/* Top Badge: Gold for Pro, Red for Regular */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
        <span
          className={`px-2.5 py-1 text-[11px] font-display tracking-widest uppercase rounded shadow ${
            product.isPro
              ? 'bg-[#C9A24B] text-black font-bold'
              : 'bg-[#E10B1F] text-white font-bold'
          }`}
        >
          {product.badge || (product.isPro ? 'PRO COMPETITION' : 'HEAVY GAUGE')}
        </span>
      </div>

      {/* Image Container with Slider & Zoom */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black select-none group/img">
        <img
          src={imageList[activeImgIndex] || product.image}
          alt={`${product.name} - View ${activeImgIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Diagonal Slash in top-right */}
        <div className="absolute top-0 right-0 p-3 pointer-events-none z-10">
          <div className="diagonal-slash-pair opacity-80">
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Multi-Image Slider Controls if > 1 image */}
        {imageList.length > 1 && (
          <>
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevImg}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E10B1F] border border-white/30 text-white flex items-center justify-center text-lg font-bold transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
              title="Previous View"
              aria-label="Previous view"
            >
              ‹
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextImg}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E10B1F] border border-white/30 text-white flex items-center justify-center text-lg font-bold transition-all shadow-lg hover:scale-110 active:scale-95 cursor-pointer opacity-90 hover:opacity-100"
              title="Next View"
              aria-label="Next view"
            >
              ›
            </button>

            {/* Dot indicators at bottom center */}
            <div className="absolute bottom-3 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
              {imageList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setActiveImgIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeImgIndex === idx
                      ? 'w-6 bg-[#E10B1F] shadow-[0_0_8px_#E10B1F]'
                      : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Slide to photo ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide counter pill */}
            <div className="absolute top-3 right-3 z-20 bg-black/85 border border-zinc-700/80 px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300">
              {activeImgIndex + 1} / {imageList.length}
            </div>
          </>
        )}

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none">
          <button
            onClick={() => openQuickView(product)}
            className="chamfer-btn-sm bg-black/90 hover:bg-black border border-white/40 hover:border-[#E10B1F] text-white px-4 py-2 text-xs font-display tracking-widest uppercase transition-all pointer-events-auto cursor-pointer"
          >
            QUICK VIEW SPECS
          </button>
        </div>

        {/* Bottom image gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#161616] to-transparent pointer-events-none"></div>
      </div>

      {/* Product Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Elevation Chip */}
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold mb-1">
            <span className="uppercase tracking-widest text-[#E10B1F]">{product.elevationType}</span>
            {product.isPro && (
              <span className="text-[#C9A24B] text-[11px] font-bold">★ 100 CM PRO</span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-display tracking-wide text-white uppercase group-hover:text-[#E10B1F] transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Pricing: Dynamic Size Price or "PRICE ON WHATSAPP" */}
          <div className="mt-3 py-2 border-y border-zinc-800/80 flex items-baseline justify-between">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              FACTORY PRICE
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-display tracking-wide ${product.isPro ? 'text-[#C9A24B]' : 'text-white'}`}>
                {currentPriceDisplay}
              </span>
              {currentPriceNumeric && (
                <span className="text-[10px] text-zinc-500 font-mono">
                  ({new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(currentPriceNumeric)})
                </span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-3">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                SELECT SIZE:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded border transition-all ${
                      selectedSize === size
                        ? 'bg-[#E10B1F] border-[#E10B1F] text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Height Selector (If product has multiple height options) */}
          {product.heightOptions && product.heightOptions.length > 1 && (
            <div className="mt-3">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                SELECT HEIGHT:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.heightOptions.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHeight(h)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded border transition-all ${
                      selectedHeight === h
                        ? 'bg-white border-white text-black font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Specs Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.specs && product.specs.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="text-[10px] bg-black/60 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded tracking-wide"
              >
                • {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls: Quantity Stepper + Add To Cart Button */}
        <div className="pt-2 border-t border-zinc-800 flex items-center gap-2">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-black border border-zinc-800 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2.5 py-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-2 text-xs font-bold text-white min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2.5 py-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 chamfer-btn-sm bg-[#E10B1F] hover:bg-[#c80718] text-white py-2.5 px-3 text-xs font-display tracking-widest uppercase transition-all duration-200 glow-red flex items-center justify-center gap-1.5"
          >
            <span>ADD TO CART</span>
            <span className="text-sm">+</span>
          </button>

          {/* Instant WhatsApp Quote Shortcut */}
          <button
            onClick={handleWhatsAppInstantQuote}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded transition-colors"
            title="Instant WhatsApp Quote for this build"
          >
            <svg className="w-4 h-4 fill-current text-green-500" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
