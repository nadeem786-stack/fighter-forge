import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';
import { useCart } from '../context/CartContext.jsx';

function AccessoryCard({ accessory }) {
  const { addToCart, openQuickView } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const imageList = (accessory.images && accessory.images.length > 0)
    ? accessory.images
    : (accessory.image ? [accessory.image] : []);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleAdd = () => {
    addToCart(accessory, {
      quantity,
      priceDisplay: accessory.priceDisplay || accessory.price,
      priceNumeric: accessory.priceNumeric
    });
  };

  return (
    <div
      className="group relative flex flex-col justify-between bg-[#141414] border border-zinc-800 hover:border-[#E10B1F] transition-all duration-300 rounded-lg overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(225,11,31,0.2)]"
      style={{
        clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
      }}
    >
      <div>
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <span className="bg-black/85 border border-[#E10B1F]/60 text-[#E10B1F] text-[10px] font-bold px-2 py-0.5 rounded font-mono tracking-wider">
            {accessory.number}
          </span>
          <span className="bg-[#E10B1F] text-white text-[10px] font-display tracking-widest uppercase px-2 py-0.5 rounded font-bold shadow">
            {accessory.badge || 'OFFICIAL HARDWARE'}
          </span>
        </div>

        {/* Product Image Container with Interactive Multi-Image Slider */}
        <div
          className="relative h-60 sm:h-64 w-full overflow-hidden bg-black/80 flex items-center justify-center p-3 cursor-pointer select-none group/slider"
          onClick={() => openQuickView && openQuickView({ ...accessory, initialImageIndex: activeImgIndex })}
        >
          {/* Main Display Image */}
          <img
            src={imageList[activeImgIndex] || accessory.image}
            alt={`${accessory.name} - View ${activeImgIndex + 1}`}
            className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
            loading="lazy"
          />

          {/* Top Right: Multi-Image Counter Pill */}
          {imageList.length > 1 && (
            <div className="absolute top-3 right-3 z-20 bg-black/85 border border-[#E10B1F]/70 text-white px-2 py-0.5 rounded text-[10px] font-mono tracking-wider shadow">
              <span className="text-[#E10B1F] font-bold">{activeImgIndex + 1}</span>
              <span className="text-zinc-500"> / </span>
              <span>{imageList.length}</span>
            </div>
          )}

          {/* Left / Right Interactive Arrow Buttons (Click right to see all!) */}
          {imageList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E10B1F] border border-zinc-700 hover:border-[#E10B1F] text-white flex items-center justify-center text-sm font-bold opacity-80 hover:opacity-100 transition-all shadow-lg active:scale-90"
                aria-label="Previous view"
                title="Previous view"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E10B1F] border border-zinc-700 hover:border-[#E10B1F] text-white flex items-center justify-center text-sm font-bold opacity-80 hover:opacity-100 transition-all shadow-lg active:scale-90"
                aria-label="Next view (click to see all)"
                title="Next view (click to see all)"
              >
                ›
              </button>

              {/* Bottom Dot Stepper */}
              <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-3">
                {imageList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImgIndex(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      activeImgIndex === dotIdx
                        ? 'w-5 bg-[#E10B1F]'
                        : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'
                    }`}
                    aria-label={`View photo ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Quick Click-Right Hint for Customer */}
          {imageList.length > 1 && (
            <div className="absolute bottom-5 right-3 z-10 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity bg-black/85 border border-[#C9A24B]/40 text-[9px] text-[#C9A24B] font-mono px-2 py-0.5 rounded uppercase tracking-wider">
              CLICK RIGHT → VIEW ALL {imageList.length}
            </div>
          )}
        </div>


        {/* Card Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg sm:text-xl text-white tracking-wide uppercase group-hover:text-[#E10B1F] transition-colors leading-snug">
              {accessory.name}
            </h3>
          </div>

          {/* Price Pill */}
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] border border-[#C9A24B]/40 px-3 py-1.5 rounded">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">PRICE:</span>
            <span className="font-display text-base text-[#C9A24B] tracking-wider">
              {accessory.priceDisplay || accessory.price}
            </span>
          </div>

          {/* Spec Sheet List */}
          <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
              SPEC SHEET:
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
              {accessory.specs && accessory.specs.map((spec, sIdx) => (
                <li key={sIdx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-[#E10B1F] text-xs font-bold leading-none mt-0.5">•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/60">
          {/* Quantity Selector */}
          <div className="flex items-center border border-zinc-700 bg-black rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
            >
              -
            </button>
            <span className="px-2 text-xs font-mono font-bold text-white min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className="flex-1 chamfer-btn-sm bg-[#E10B1F] hover:bg-[#c80718] text-white py-2 text-xs font-display tracking-widest uppercase transition-all glow-red"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}


export function BoxingRingsPage({ navigateTo, onOpenRentalModal }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'floor', 'elevated', 'accessories'
  const [elevatedHeightFilter, setElevatedHeightFilter] = useState('all'); // 'all', '1-2ft', '3ft'

  const rings = siteConfig.boxingRings;
  const accessories = siteConfig.boxingRingAccessories || [];

  const filteredRings = rings.filter((ring) => {
    if (activeFilter === 'floor') return ring.category === 'floor';
    if (activeFilter === 'elevated') {
      if (elevatedHeightFilter === '1-2ft') return ring.id.includes('training') || ring.id.includes('1-2');
      if (elevatedHeightFilter === '3ft') return ring.isPro;
      return ring.category === 'elevated';
    }
    return true;
  });

  const handleCustomEnquiry = () => {
    navigateTo('customize');
  };

  const handleWhatsAppConsult = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I need expert sizing advice and a quote for a Boxing Ring. My gym/event dimensions are...`
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Page Header with Breadcrumb */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              HOME
            </button>
            <span>/</span>
            <span className="text-[#E10B1F]">BOXING RINGS & ACCESSORIES</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#E10B1F] uppercase mb-2">
                <span className="diagonal-slash scale-75"></span>
                <span>HEAVY-GAUGE ARENA STEEL & HARDWARE</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-none">
                BOXING RINGS & ACCESSORIES
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Olympic regulation and professional championship boxing rings, plus all 10 official arena accessories, canvas mats, corner pads, turnbuckles, rope covers, and stairs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRentalModal}
                className="chamfer-btn-sm bg-gradient-to-r from-[#C9A24B] to-[#b58f3c] text-black font-bold px-5 py-3 text-xs font-display tracking-widest uppercase transition-all flex items-center gap-2 glow-gold"
              >
                <span>RENT RINGS FOR EVENTS</span>
                <span>↗</span>
              </button>
              <button
                onClick={handleWhatsAppConsult}
                className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-3 text-xs font-display tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>RING SIZING GUIDE</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Height Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          {/* Category Tabs: ALL | FLOOR | ELEVATED | ACCESSORIES */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              ALL BOXING RINGS ({rings.length})
            </button>

            <button
              onClick={() => setActiveFilter('floor')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'floor'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              FLOOR-LEVEL RINGS
            </button>

            <button
              onClick={() => setActiveFilter('elevated')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'elevated'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              ELEVATED RINGS
            </button>

            <button
              onClick={() => setActiveFilter('accessories')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all flex items-center gap-1.5 ${
                activeFilter === 'accessories'
                  ? 'bg-[#C9A24B] border-[#C9A24B] text-black font-bold glow-gold'
                  : 'bg-zinc-900 border-zinc-800 text-[#C9A24B] hover:border-[#C9A24B]'
              }`}
            >
              <span>★ RING ACCESSORIES ({accessories.length})</span>
            </button>
          </div>

          {/* Elevated Height Sub-Filter (Visible when Elevated or All selected) */}
          {(activeFilter === 'elevated' || activeFilter === 'all') && (
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2">
                HEIGHT:
              </span>

              <button
                onClick={() => setElevatedHeightFilter('all')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                  elevatedHeightFilter === 'all'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setElevatedHeightFilter('1-2ft')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                  elevatedHeightFilter === '1-2ft'
                    ? 'bg-[#E10B1F] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1–2 ft Training
              </button>

              <button
                onClick={() => setElevatedHeightFilter('3ft')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors ${
                  elevatedHeightFilter === '3ft'
                    ? 'bg-[#C9A24B] text-black'
                    : 'text-[#C9A24B] hover:bg-[#C9A24B]/10'
                }`}
              >
                <span>★ 3 ft Championship (100 cm)</span>
              </button>
            </div>
          )}
        </div>

        {/* Event Rental Banner for Promoters */}
        <div className="mt-4 p-5 bg-gradient-to-r from-[#17130C] via-[#121212] to-black border-2 border-[#C9A24B] rounded flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-ping"></span>
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-widest">
                EVENT RENTALS ACROSS INDIA • IPBL & PRO FIGHT NIGHTS
              </span>
            </div>
            <div className="text-lg font-display text-white uppercase tracking-wide">
              NEED A COMPETITION BOXING RING ON RENTAL FOR YOUR EVENT?
            </div>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              We provide elevated 3ft Pro and training rings on rental for IPBL (India Pro Boxing League), state championships, and televised fight nights across India. Includes certified on-site setup crew, acoustic subfloor, and teardown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={onOpenRentalModal}
              className="chamfer-btn-sm bg-[#E10B1F] hover:bg-[#c80718] text-white px-5 py-2.5 text-xs font-display tracking-widest uppercase glow-red flex items-center justify-center gap-1.5"
            >
              <span>RENT ON WHATSAPP</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Ring Models Grid (Only when filter is not 'accessories') */}
        {activeFilter !== 'accessories' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRings.map((ring) => (
              <ProductCard key={ring.id} product={ring} />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          DEDICATED SECTION: 10 RING ACCESSORIES & HARDWARE
          ========================================================= */}
      {(activeFilter === 'all' || activeFilter === 'accessories') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t border-zinc-800">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C9A24B] uppercase mb-1">
                <span>★ CUSTOM-MADE FOR CHAMPION-MAKERS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white leading-none">
                RING ACCESSORIES & HARDWARE
              </h2>
              <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Every ring accessory can be customised in size, texture, and colour to match your gym or tournament arena requirements.
              </p>
            </div>

            {/* Quick WhatsApp Accessories Support */}
            <button
              onClick={() => openWhatsApp("Hello Fighter Forge, I want to inquire about custom Boxing Ring Accessories and replacement parts for my ring.")}
              className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#C9A24B] hover:text-white px-5 py-3 text-xs font-display tracking-widest uppercase transition-all flex items-center gap-2 self-start md:self-auto"
            >
              <span>ACCESSORY CONSULTATION</span>
              <span>↗</span>
            </button>
          </div>

          {/* 10 Accessories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {accessories.map((acc) => (
              <AccessoryCard key={acc.id} accessory={acc} />
            ))}
          </div>

        </section>
      )}

      {/* Bottom Customization Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div
          className="relative bg-[#161616] border border-zinc-800 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
          }}
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
              <span>★ BESPOKE FABRICATION</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-wide">
              NEED A SPECIFIC SIZE OR GYM LOGO CANVAS?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We manufacture non-standard sizes (e.g. 15×15 ft, 22×22 ft), custom rope wrapping, custom corner cushion colors, and print your gym logo sharp on the canvas.
            </p>
          </div>

          <button
            onClick={handleCustomEnquiry}
            className="chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-8 py-4 text-sm font-display tracking-widest uppercase glow-gold transition-all whitespace-nowrap"
          >
            CUSTOMIZE YOUR RING →
          </button>
        </div>
      </section>
    </div>
  );
}

