import React, { useState } from 'react';
import { stories } from '../data/storiesData.js';

export function StoriesPage({ navigateTo, onOpenRentalModal }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Training Facilities',
    'Gear Guides',
    'Gear Care',
    'Events'
  ];

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Header Banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="./assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              className="hover:text-white transition-colors"
            >
              HOME
            </a>
            <span>/</span>
            <span className="text-[#E10B1F]">STORIES & ARENA SCIENCE</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#E10B1F] uppercase mb-2">
            <span className="diagonal-slash scale-75"></span>
            <span>COMBAT SPORTS KNOWLEDGE BASE & TECHNICAL GUIDES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-none">
            STORIES, BLUEPRINTS & COMBAT NEWS
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Technical guides on MMA cage construction, regulation boxing rings, gear maintenance, combat science, and upcoming international fight cards.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.slug}
              className="bg-[#141414] border border-zinc-800 hover:border-[#E10B1F] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(225,11,31,0.2)] rounded-lg"
              style={{
                clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)'
              }}
            >
              <a
                href={`/stories/${story.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(`stories/${story.slug}`);
                }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Hero Image */}
                <div className="relative h-56 w-full overflow-hidden bg-black">
                  <img
                    src={story.heroImage}
                    alt={story.heroImageAlt}
                    width="600"
                    height="338"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 border border-zinc-700 px-2.5 py-1 rounded text-[10px] font-bold text-[#E10B1F] uppercase tracking-wider">
                    {story.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/85 px-2 py-0.5 rounded text-[10px] text-zinc-400 font-mono">
                    {story.readingTime}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] text-zinc-500 font-mono mb-1.5">
                      {story.datePublished} • by {story.author.replace('Team', '')}
                    </div>
                    <h2 className="text-xl font-display text-white tracking-wide uppercase group-hover:text-[#E10B1F] transition-colors leading-snug">
                      {story.title}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {story.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-display tracking-widest text-[#E10B1F] group-hover:translate-x-1 transition-transform">
                      READ STORY →
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
