import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp, formatCustomEnquiryMessage } from '../utils/whatsapp.js';
import { submitCustomEnquiry } from '../utils/api.js';

export function CustomizePage({ navigateTo, onOpenRentalModal }) {
  const [selectedType, setSelectedType] = useState('ring'); // 'ring' or 'cage'
  const [currentStep, setCurrentStep] = useState(1); // 1 = Type, 2 = Specs, 3 = Photos & Contact

  // Boxing Ring Custom Specs
  const [ringSpecs, setRingSpecs] = useState({
    elevation: '3 ft (≈100 cm) Pro Level',
    sizePreset: '20×20 ft',
    customSize: '',
    ropeColors: 'Black & Fight Red',
    canvasColor: 'Deep Black (#0A0A0A)',
    cornerPadsColor: '2 Fight Red, 2 Deep Black',
    branding: true,
    quantity: 1,
    additionalNotes: ''
  });

  // MMA Cage Custom Specs
  const [cageSpecs, setCageSpecs] = useState({
    shape: 'Octagon (8-Sided)',
    diameter: '24 ft Pro Diameter',
    customDiameter: '',
    elevation: 'Championship',
    fenceHeight: '6 ft Competition Standard',
    doors: '2 Doors (Fighter & Medic)',
    stairs: true,
    // Step 3: Branding, Logos & Aesthetics
    canvasColor: 'Matte Black (Standard)',
    customCanvasColor: '',
    logoLayout: 'Single Center Logo', // 'Single Center Logo' | 'Multi-Sponsor Layout'
    centerLogoName: '',
    cornerPadColor: 'Classic Red/Blue/Black (Standard)',
    customCornerPadColor: '',
    cornerPadPrint: 'No Print', // 'No Print' | 'Print Gym/Brand Logo'
    topRailPadColor: 'Matte Black',
    topRailPrint: 'No Repeating Print', // 'No Repeating Print' | 'Add Repeating Brand/Sponsor Text'
    topRailText: '',
    meshColor: 'Heavy PVC Black (Standard)',
    customMeshColor: '',
    frameCoating: 'Industrial Matte Black',
    customFrameCoating: '',
    platformSkirt: 'Plain Heavy PVC Skirt',
    quantity: 1,
    additionalNotes: ''
  });

  // Photo Upload State (up to 5 files)
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  // Contact Info
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    city: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // File Handlers
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (files.length + selected.length > 5) {
      alert('You can upload a maximum of 5 reference photos or logo files.');
      return;
    }

    const newFiles = [...files, ...selected].slice(0, 5);
    setFiles(newFiles);

    // Generate previews
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(newPreviews);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFilePreviews(updatedPreviews);
  };

  const handleSubmitCustomQuote = async (e) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.phone.trim() || !contact.city.trim()) {
      alert('Please fill in your Name, Phone Number, and City.');
      return;
    }

    setIsSubmitting(true);

    const isRing = selectedType === 'ring';
    const activeSpecs = isRing ? ringSpecs : cageSpecs;

    // Prepare FormData for file upload & backend save
    const formData = new FormData();
    formData.append('type', selectedType);
    formData.append('specs', JSON.stringify(activeSpecs));
    formData.append('customer', JSON.stringify(contact));
    files.forEach((file) => {
      formData.append('photos', file);
    });

    // 1. Submit to backend / MongoDB
    const result = await submitCustomEnquiry(formData);
    const uploadedUrls = result.uploadedUrls || files.map(f => f.name);

    setIsSubmitting(false);
    setSubmitted(true);

    // 2. Format WhatsApp message
    const formattedMessage = formatCustomEnquiryMessage({
      customData: {
        type: selectedType,
        ...activeSpecs,
        size: isRing
          ? (activeSpecs.customSize || activeSpecs.sizePreset)
          : (activeSpecs.customDiameter || activeSpecs.diameter)
      },
      customer: contact,
      uploadedUrls
    });

    // 3. Open WhatsApp
    openWhatsApp(formattedMessage);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-white">
              HOME
            </button>
            <span>/</span>
            <span className="text-[#C9A24B]">CUSTOM ARENA BUILDER</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#C9A24B] uppercase mb-2">
            <span className="w-1.5 h-1.5 bg-[#C9A24B]"></span>
            <span>CUSTOM GYM & ARENA ARCHITECTURE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-none">
            CUSTOMIZE YOUR RING / CAGE
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Configure custom sizes, frame heights, rope accents, post cushion pads, and upload your gym logo. Our CAD engineers will build your 3D arena blueprint.
          </p>

          {/* Step Progress Indicator */}
          <div className="mt-8 flex items-center gap-3 sm:gap-6 border-t border-zinc-800/80 pt-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#E10B1F] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-display tracking-wider uppercase text-white">
                SELECT ARENA
              </span>
            </div>
            <span className="text-zinc-600">→</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C9A24B] text-black text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-display tracking-wider uppercase text-white">
                CONFIGURE SPECS
              </span>
            </div>
            <span className="text-zinc-600">→</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-300 text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-display tracking-wider uppercase text-zinc-400">
                UPLOAD & WHATSAPP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Event Rental Alert Banner */}
        <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-[#17130C] via-[#121212] to-black border-2 border-[#C9A24B] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-ping"></span>
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-widest">
                LOOKING FOR TEMPORARY EVENT RENTALS? (IPBL & PRO MMA)
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              If you need a Boxing Ring or MMA Cage on rental for a fight night, tournament, or promotion anywhere in India, we provide turnkey setups with on-site crew and transport.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenRentalModal}
            className="chamfer-btn-sm bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-5 py-2.5 text-xs font-display tracking-widest uppercase glow-gold whitespace-nowrap self-start sm:self-auto"
          >
            RENT FOR EVENT (IPBL) ↗
          </button>
        </div>

        {/* STEP 1: Two Large Cards (Ring vs Cage) */}
        <div className="mb-10">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-3">
            STEP 1: CHOOSE EQUIPMENT TYPE
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Box 1: Boxing Ring */}
            <div
              onClick={() => setSelectedType('ring')}
              className={`p-6 bg-[#161616] border cursor-pointer transition-all duration-300 relative ${
                selectedType === 'ring'
                  ? 'border-[#E10B1F] bg-[#1a1213] glow-red'
                  : 'border-zinc-800 hover:border-zinc-600'
              }`}
              style={{
                clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
              }}
            >
              {selectedType === 'ring' && (
                <div className="absolute top-3 right-3 text-[#E10B1F] text-xl font-bold">✓</div>
              )}
              <div className="text-xs font-bold uppercase tracking-wider text-[#E10B1F] mb-1">
                4-ROPE PLATFORM
              </div>
              <h3 className="text-2xl font-display text-white uppercase tracking-wide">
                CUSTOMIZE BOXING RING
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Floor-level to 3 ft Pro heights. Customizable ring canvas, corner cushions, and rope wrap colors.
              </p>
            </div>

            {/* Box 2: MMA Cage */}
            <div
              onClick={() => setSelectedType('cage')}
              className={`p-6 bg-[#161616] border cursor-pointer transition-all duration-300 relative ${
                selectedType === 'cage'
                  ? 'border-[#C9A24B] bg-[#1c1810] glow-gold'
                  : 'border-zinc-800 hover:border-zinc-600'
              }`}
              style={{
                clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
              }}
            >
              {selectedType === 'cage' && (
                <div className="absolute top-3 right-3 text-[#C9A24B] text-xl font-bold">✓</div>
              )}
              <div className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] mb-1">
                8-SIDED / 6-SIDED
              </div>
              <h3 className="text-2xl font-display text-white uppercase tracking-wide">
                CUSTOMIZE MMA CAGE
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Octagon or Hexagon geometry. Custom diameter, safety fence height, vinyl dipped mesh, and entry doors.
              </p>
            </div>
          </div>
        </div>

        {/* STEP 2: Detailed Specification Form */}
        <form onSubmit={handleSubmitCustomQuote} className="space-y-10">
          <div className="bg-[#141414] border border-zinc-800 p-6 sm:p-10 rounded space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E10B1F]">
                STEP 2: SPECIFICATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide mt-1">
                {selectedType === 'ring' ? 'BOXING RING CUSTOM SPECIFICATIONS' : 'MMA CAGE CUSTOM SPECIFICATIONS'}
              </h2>
            </div>

            {/* Form Fields for BOXING RING */}
            {selectedType === 'ring' && (
              <div className="space-y-6">
                {/* Elevation Type */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Elevation Type & Height
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Floor-Level (0 ft)', '1–2 ft Training / Event', '3 ft (≈100 cm) Pro Level'].map((elev) => (
                      <button
                        key={elev}
                        type="button"
                        onClick={() => setRingSpecs({ ...ringSpecs, elevation: elev })}
                        className={`p-3 text-xs font-semibold rounded border text-left transition-all ${
                          ringSpecs.elevation === elev
                            ? elev.includes('3 ft')
                              ? 'bg-[#C9A24B] text-black border-[#C9A24B] font-bold'
                              : 'bg-[#E10B1F] text-white border-[#E10B1F]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {elev}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Size Preset */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Ring Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['12×12 ft', '14×14 ft', '16×16 ft', '18×18 ft', '20×20 ft', '24×24 ft', '25.6×25.6 championship'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setRingSpecs({ ...ringSpecs, sizePreset: sz, customSize: '' })}
                        className={`px-3.5 py-2 text-xs font-semibold rounded border transition-all ${
                          ringSpecs.sizePreset === sz && !ringSpecs.customSize
                            ? 'bg-white text-black border-white font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Or enter custom size (e.g. 17×17 ft, 21×21 ft)"
                      value={ringSpecs.customSize}
                      onChange={(e) => setRingSpecs({ ...ringSpecs, customSize: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>
                </div>

                {/* Rope Colors & Canvas Color (Direct Text Inputs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Rope Wrapping Colors
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Black & Fight Red, All Black Stealth, Olympic Red/White/Blue..."
                      value={ringSpecs.ropeColors}
                      onChange={(e) => setRingSpecs({ ...ringSpecs, ropeColors: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Canvas / Mat Color
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deep Black (#0A0A0A), Fight Red, Charcoal Gray, Royal Blue..."
                      value={ringSpecs.canvasColor}
                      onChange={(e) => setRingSpecs({ ...ringSpecs, canvasColor: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>
                </div>

                {/* Corner Pads & Branding Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Corner Pads Configuration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Fight Red, 2 Deep Black or All 4 Black with Gold Logos..."
                      value={ringSpecs.cornerPadsColor}
                      onChange={(e) => setRingSpecs({ ...ringSpecs, cornerPadsColor: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Gym Logo on Canvas & Pads?
                    </label>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setRingSpecs({ ...ringSpecs, branding: true })}
                        className={`flex-1 py-2.5 text-xs font-bold rounded border ${
                          ringSpecs.branding
                            ? 'bg-[#C9A24B] text-black border-[#C9A24B]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        YES (Include Logo Branding)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRingSpecs({ ...ringSpecs, branding: false })}
                        className={`flex-1 py-2.5 text-xs font-bold rounded border ${
                          !ringSpecs.branding
                            ? 'bg-zinc-700 text-white border-zinc-600'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        NO (Standard Fighter Forge)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields for MMA CAGE */}
            {selectedType === 'cage' && (
              <div className="space-y-6">
                {/* Cage Shape & Elevation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Cage Geometry Shape
                    </label>
                    <select
                      value={cageSpecs.shape}
                      onChange={(e) => setCageSpecs({ ...cageSpecs, shape: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#C9A24B] outline-none"
                    >
                      <option value="Octagon (8-Sided)">Octagon (8-Sided) - UFC Championship Standard</option>
                      <option value="Hexagon (6-Sided)">Hexagon (6-Sided) - Space-Optimized</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Elevation Platform
                    </label>
                    <select
                      value={cageSpecs.elevation}
                      onChange={(e) => setCageSpecs({ ...cageSpecs, elevation: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#C9A24B] outline-none"
                    >
                      <option value="Floor">Floor</option>
                      <option value="Elevated">Elevated</option>
                      <option value="Championship">Championship</option>
                    </select>
                  </div>
                </div>

                {/* Diameter */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    Cage Diameter / Footprint
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['16 ft Diameter', '20 ft Diameter', '24 ft Pro Diameter', '30 ft Stadium Octagon'].map((dm) => (
                      <button
                        key={dm}
                        type="button"
                        onClick={() => setCageSpecs({ ...cageSpecs, diameter: dm, customDiameter: '' })}
                        className={`px-3.5 py-2 text-xs font-semibold rounded border transition-all ${
                          cageSpecs.diameter === dm && !cageSpecs.customDiameter
                            ? 'bg-[#C9A24B] text-black border-[#C9A24B] font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        {dm}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Or enter custom diameter (e.g. 18 ft, 22 ft, 27 ft)"
                      value={cageSpecs.customDiameter}
                      onChange={(e) => setCageSpecs({ ...cageSpecs, customDiameter: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#C9A24B] outline-none"
                    />
                  </div>
                </div>

                {/* Doors & Stairs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Security Access Doors
                    </label>
                    <select
                      value={cageSpecs.doors}
                      onChange={(e) => setCageSpecs({ ...cageSpecs, doors: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#C9A24B] outline-none"
                    >
                      <option value="1 Heavy Door">1 Heavy Steel Entry Door</option>
                      <option value="2 Doors (Fighter & Medic)">2 Doors (Fighter & Medic/Cutman Corners)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                      Access Stairs (For Elevated)
                    </label>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setCageSpecs({ ...cageSpecs, stairs: true })}
                        className={`flex-1 py-2.5 text-xs font-bold rounded border ${
                          cageSpecs.stairs
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        Include Stairs
                      </button>
                      <button
                        type="button"
                        onClick={() => setCageSpecs({ ...cageSpecs, stairs: false })}
                        className={`flex-1 py-2.5 text-xs font-bold rounded border ${
                          !cageSpecs.stairs
                            ? 'bg-zinc-700 text-white border-zinc-600'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        No Stairs
                      </button>
                    </div>
                  </div>
                </div>

                {/* =========================================================
                    STEP 3: BRANDING, LOGOS & AESTHETICS (MMA CAGES)
                    ========================================================= */}
                <div className="pt-8 mt-6 border-t border-zinc-800 space-y-8">
                  <div className="border-b border-zinc-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">
                      STEP 3: BRANDING, LOGOS & AESTHETICS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display text-white uppercase tracking-wide mt-1">
                      CUSTOM CAGE BRANDING, MAT GRAPHICS & COATING
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Tailor your fighting arena with custom canvas colors, high-impact vector sponsor logos, padded bumper guards, and heavy powder coat finishes.
                    </p>
                  </div>

                  {/* 1. Canvas Mat Customization */}
                  <div className="bg-[#121212] border border-zinc-800/90 p-5 sm:p-6 rounded space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                        01. CANVAS MAT CUSTOMIZATION
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Canvas Fabric Color */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Canvas Fabric Color
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { name: 'Matte Black (Standard)', color: '#0A0A0A' },
                            { name: 'Dark Slate Gray', color: '#334155' },
                            { name: 'Competition Blue', color: '#1E40AF' },
                            { name: 'Crimson Red', color: '#E10B1F' },
                            { name: 'Off-White', color: '#E2E8F0' },
                            { name: 'Custom PMS Color', isCustom: true }
                          ].map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => setCageSpecs({ ...cageSpecs, canvasColor: c.name })}
                              className={`p-2.5 text-xs font-semibold rounded border text-left flex items-center gap-2 transition-all ${
                                cageSpecs.canvasColor === c.name
                                  ? 'bg-[#C9A24B]/15 border-[#C9A24B] text-white shadow-[0_0_15px_rgba(201,162,75,0.2)]'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                              }`}
                            >
                              <span
                                className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                                style={{
                                  backgroundColor: c.color || 'transparent',
                                  backgroundImage: c.isCustom ? 'linear-gradient(135deg, red, yellow, green, blue)' : 'none'
                                }}
                              ></span>
                              <span className="truncate">{c.name.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>

                        {cageSpecs.canvasColor === 'Custom PMS Color' && (
                          <div className="pt-1">
                            <input
                              type="text"
                              placeholder="Enter Custom PMS or Hex Code (e.g. Pantone 186 C / #D90429)"
                              value={cageSpecs.customCanvasColor}
                              onChange={(e) => setCageSpecs({ ...cageSpecs, customCanvasColor: e.target.value })}
                              className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                            />
                          </div>
                        )}
                      </div>

                      {/* Center Canvas Logo & Layout */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Center Canvas Logo & Layout
                        </label>

                        {/* Toggle: Single Center Logo | Multi-Sponsor Layout */}
                        <div className="grid grid-cols-2 gap-2">
                          {['Single Center Logo', 'Multi-Sponsor Layout'].map((layout) => (
                            <button
                              key={layout}
                              type="button"
                              onClick={() => setCageSpecs({ ...cageSpecs, logoLayout: layout })}
                              className={`py-2 px-3 text-xs font-bold rounded border text-center transition-all ${
                                cageSpecs.logoLayout === layout
                                  ? 'bg-[#C9A24B] text-black border-[#C9A24B]'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {layout}
                            </button>
                          ))}
                        </div>

                        {/* Custom Dropzone (.png, .svg, .pdf, max 15MB) */}
                        <div className="relative border-2 border-dashed border-zinc-700 hover:border-[#C9A24B] rounded-lg p-4 text-center bg-black/40 transition-colors cursor-pointer group">
                          <input
                            type="file"
                            accept=".png,.svg,.pdf,.jpg,.webp"
                            onChange={(e) => {
                              const file = e.target.files && e.target.files[0];
                              if (file) {
                                if (file.size > 15 * 1024 * 1024) {
                                  alert('File exceeds 15MB size limit.');
                                  return;
                                }
                                setCageSpecs({ ...cageSpecs, centerLogoName: file.name });
                                setFiles(prev => [...prev.filter(f => f.name !== file.name), file].slice(0, 5));
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="space-y-1">
                            <div className="text-xl text-[#C9A24B] group-hover:scale-110 transition-transform">📁</div>
                            <div className="text-xs font-bold text-zinc-200">
                              {cageSpecs.centerLogoName ? (
                                <span className="text-[#C9A24B] flex items-center justify-center gap-1.5">
                                  <span>✓ {cageSpecs.centerLogoName}</span>
                                </span>
                              ) : (
                                <span>Drop Center Mat Logo (.PNG, .SVG, .PDF, Max 15MB)</span>
                              )}
                            </div>
                            <div className="text-[10px] text-zinc-500">
                              Vector format recommended for razor-sharp large format canvas sublimation.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Corner Pads & Top Rail Bumper Guard Padding */}
                  <div className="bg-[#121212] border border-zinc-800/90 p-5 sm:p-6 rounded space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                        02. CORNER PADS & TOP RAIL BUMPER PADDING
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Corner Pad Color Scheme */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Corner Pad Color Scheme
                        </label>
                        <select
                          value={cageSpecs.cornerPadColor}
                          onChange={(e) => setCageSpecs({ ...cageSpecs, cornerPadColor: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                        >
                          <option value="Classic Red/Blue/Black (Standard)">Classic Red/Blue/Black (Standard)</option>
                          <option value="All Matte Black">All Matte Black Stealth</option>
                          <option value="All Red">All Fight Red</option>
                          <option value="All Blue">All Competition Blue</option>
                          <option value="Custom Gym Colors">Custom Gym Colors</option>
                        </select>

                        {cageSpecs.cornerPadColor === 'Custom Gym Colors' && (
                          <input
                            type="text"
                            placeholder="Specify Corner Pad Colors (e.g. Gold & Matte Black, Neon Green)"
                            value={cageSpecs.customCornerPadColor}
                            onChange={(e) => setCageSpecs({ ...cageSpecs, customCornerPadColor: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                          />
                        )}

                        <div className="pt-1">
                          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                            Corner Pad Branding Print
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['No Print', 'Print Gym/Brand Logo'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setCageSpecs({ ...cageSpecs, cornerPadPrint: opt })}
                                className={`py-2 px-3 text-xs font-bold rounded border text-center transition-all ${
                                  cageSpecs.cornerPadPrint === opt
                                    ? 'bg-[#C9A24B] text-black border-[#C9A24B]'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Top Perimeter Rail Pad Color & Repeating Print */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Top Perimeter Rail Pad Color
                        </label>
                        <select
                          value={cageSpecs.topRailPadColor}
                          onChange={(e) => setCageSpecs({ ...cageSpecs, topRailPadColor: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                        >
                          <option value="Matte Black">Matte Black (High-Density Heavy Vinyl)</option>
                          <option value="Red">Fight Red</option>
                          <option value="Blue">Competition Blue</option>
                          <option value="Matching Canvas Color">Matching Canvas Color</option>
                        </select>

                        <div className="pt-1">
                          <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1.5">
                            Top Rail Repeating Logo Print
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['No Repeating Print', 'Add Repeating Brand/Sponsor Text'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setCageSpecs({ ...cageSpecs, topRailPrint: opt })}
                                className={`py-2 px-3 text-xs font-bold rounded border text-center transition-all ${
                                  cageSpecs.topRailPrint === opt
                                    ? 'bg-[#C9A24B] text-black border-[#C9A24B]'
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>

                          {cageSpecs.topRailPrint === 'Add Repeating Brand/Sponsor Text' && (
                            <div className="mt-2">
                              <input
                                type="text"
                                placeholder="e.g. FIGHT ACADEMY • PRO MMA LEAGUE • WARRIORS"
                                value={cageSpecs.topRailText}
                                onChange={(e) => setCageSpecs({ ...cageSpecs, topRailText: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Chain-Link Mesh & Frame Powder Coating */}
                  <div className="bg-[#121212] border border-zinc-800/90 p-5 sm:p-6 rounded space-y-5">
                    <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                        03. CHAIN-LINK MESH & FRAME POWDER COATING
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Vinyl-Coated Mesh Color */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Vinyl-Coated Mesh Color (Heavy 9-Gauge)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {['Heavy PVC Black (Standard)', 'Industrial Steel Gray', 'Custom PVC'].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setCageSpecs({ ...cageSpecs, meshColor: m })}
                              className={`p-2.5 text-xs font-semibold rounded border text-center transition-all ${
                                cageSpecs.meshColor === m
                                  ? 'bg-[#C9A24B] text-black border-[#C9A24B] font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {m.split(' ')[0]} {m.includes('Black') ? 'Black' : ''}
                            </button>
                          ))}
                        </div>

                        {cageSpecs.meshColor === 'Custom PVC' && (
                          <input
                            type="text"
                            placeholder="Specify Custom Mesh Color (e.g. Red PVC Dip, Blue PVC)"
                            value={cageSpecs.customMeshColor}
                            onChange={(e) => setCageSpecs({ ...cageSpecs, customMeshColor: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                          />
                        )}
                      </div>

                      {/* Structural Steel Frame / Post Powder Coating */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Steel Frame / Upright Post Powder Coating
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Gloss Black', 'Industrial Matte Black', 'High-Impact Red', 'Custom Powder Coat'].map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setCageSpecs({ ...cageSpecs, frameCoating: f })}
                              className={`p-2.5 text-xs font-semibold rounded border text-center transition-all ${
                                cageSpecs.frameCoating === f
                                  ? 'bg-[#C9A24B] text-black border-[#C9A24B] font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>

                        {cageSpecs.frameCoating === 'Custom Powder Coat' && (
                          <input
                            type="text"
                            placeholder="Specify Custom RAL / Finish (e.g. Stealth Charcoal, Metallic Gold)"
                            value={cageSpecs.customFrameCoating}
                            onChange={(e) => setCageSpecs({ ...cageSpecs, customFrameCoating: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4. Platform Skirt Branding (Conditional on Elevated Platform Selection) */}
                  {cageSpecs.elevation !== 'Floor' && (
                    <div className="bg-[#121212] border border-[#C9A24B]/30 p-5 sm:p-6 rounded space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
                          04. ELEVATED PLATFORM SKIRT BRANDING
                        </span>
                        <span className="text-[10px] bg-[#C9A24B]/20 text-[#C9A24B] px-2 py-0.5 rounded font-bold uppercase">
                          ELEVATED / CHAMPIONSHIP EXCLUSIVE
                        </span>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
                          Outer Base Perimeter Skirt
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Plain Heavy PVC Skirt',
                            'Custom Printed Sponsor/Event Banner Skirt'
                          ].map((skirt) => (
                            <button
                              key={skirt}
                              type="button"
                              onClick={() => setCageSpecs({ ...cageSpecs, platformSkirt: skirt })}
                              className={`p-3 text-xs font-semibold rounded border text-left transition-all ${
                                cageSpecs.platformSkirt === skirt
                                  ? 'bg-[#C9A24B] text-black border-[#C9A24B] font-bold'
                                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {skirt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Additional Notes & Arena Dimensions
              </label>
              <textarea
                rows="3"
                placeholder="Mention any custom post gusseting, ceiling height constraints, or venue requirements..."
                value={selectedType === 'ring' ? ringSpecs.additionalNotes : cageSpecs.additionalNotes}
                onChange={(e) => {
                  const val = e.target.value;
                  if (selectedType === 'ring') {
                    setRingSpecs({ ...ringSpecs, additionalNotes: val });
                  } else {
                    setCageSpecs({ ...cageSpecs, additionalNotes: val });
                  }
                }}
                className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
              ></textarea>
            </div>
          </div>

          {/* STEP 4: Photo & Logo Upload (Drag & Drop, up to 5) */}
          <div className="bg-[#141414] border border-zinc-800 p-6 sm:p-10 rounded space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">
                STEP 4: REFERENCE PHOTOS & LOGO UPLOAD
              </span>
              <h2 className="text-2xl font-display text-white uppercase tracking-wide mt-1">
                UPLOAD GYM LOGO OR REFERENCE DESIGNS
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Upload a reference photo or your logo and we'll quote on it. (Up to 5 images, JPG/PNG/WEBP, max 10MB each).
              </p>
            </div>

            {/* Upload Dropzone */}
            <div className="relative border-2 border-dashed border-zinc-700 hover:border-[#E10B1F] rounded-lg p-8 text-center transition-colors bg-black/40">
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 pointer-events-none">
                <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">
                  DRAG & DROP FILES HERE OR <span className="text-[#E10B1F]">BROWSE FILES</span>
                </div>
                <p className="text-xs text-zinc-500">
                  {files.length}/5 files selected. Supported: PNG, JPG, WEBP
                </p>
              </div>
            </div>

            {/* Preview Thumbnails */}
            {filePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {filePreviews.map((preview, idx) => (
                  <div key={idx} className="relative group rounded overflow-hidden border border-zinc-700 bg-black aspect-square">
                    <img src={preview} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-90 hover:opacity-100"
                    >
                      ✕
                    </button>
                    <span className="absolute bottom-1 left-1 bg-black/80 text-[10px] text-zinc-300 px-1.5 py-0.5 rounded truncate max-w-[85%]">
                      {files[idx]?.name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Fields */}
            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                STEP 5: DISPATCH CONTACT DETAILS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    Your Name / Academy *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                    City / Venue Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={contact.city}
                    onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-4 font-display text-lg tracking-widest uppercase glow-red transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'UPLOADING ASSETS & TRANSMITTING...' : 'REQUEST CUSTOM QUOTE ON WHATSAPP'}</span>
                <span className="text-xl">↗</span>
              </button>
              <p className="text-center text-xs text-zinc-500 mt-2">
                We will send your bespoke CAD blueprint & quotation directly to your WhatsApp.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
