import React from 'react';
import { siteConfig } from '../config/siteConfig.js';

export function ClientLogosMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const clientList = [...siteConfig.clients, ...siteConfig.clients];

  return (
    <div className="relative py-8 bg-[#0D0D0D] border-y border-zinc-800/80 overflow-hidden">

      {/* Header Row */}
      <div className="max-w-7xl mx-auto px-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="diagonal-slash-pair">
            <span></span>
            <span></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            TRUSTED BY ELITE ARENAS, CHAMPIONSHIP PROMOTIONS &amp; GOVT FEDERATIONS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-[#E10B1F] font-bold tracking-widest">
          <span>FACTORY DIRECT BUILDS</span>
          <span className="text-zinc-600">•</span>
          <span>NATIONWIDE DISPATCH</span>
        </div>
      </div>

      {/* Marquee Track — right to left */}
      <div className="flex overflow-hidden select-none mask-gradient-x">
        <div className="animate-marquee-left flex items-center gap-5 py-2">
          {clientList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 bg-[#161616] hover:bg-[#1f1f1f] border border-zinc-800 hover:border-[#E10B1F]/60 px-4 py-3 transition-all duration-200 cursor-default shrink-0 group"
              style={{
                clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
              }}
            >
              {/* Logo thumbnail */}
              <div className="w-12 h-12 bg-white rounded flex items-center justify-center shrink-0 border border-zinc-300 overflow-hidden">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                />
              </div>

              {/* Text block */}
              <div>
                <div className="font-display text-sm font-bold tracking-wider text-white group-hover:text-[#E10B1F] transition-colors whitespace-nowrap">
                  {client.name}
                </div>
                <div className="text-[11px] text-zinc-400 font-sans tracking-wide whitespace-nowrap mt-0.5">
                  {client.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
