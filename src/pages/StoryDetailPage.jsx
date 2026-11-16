import React, { useEffect, useState } from 'react';
import { getStoryBySlug, getRelatedStories, stories } from '../data/storiesData.js';
import { openWhatsApp } from '../utils/whatsapp.js';

export function StoryDetailPage({ slug, navigateTo, onOpenRentalModal }) {
  const story = getStoryBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (story) {
      document.title = `${story.metaTitle} | FIGHTER FORGE`;
    }
  }, [slug, story]);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[#E10B1F] text-5xl font-display">404</span>
          <h1 className="text-3xl font-display uppercase tracking-wide">Story Not Found</h1>
          <p className="text-zinc-400 text-sm">
            The combat sports story or arena engineering guide you are looking for does not exist or has been relocated.
          </p>
          <div>
            <button
              onClick={() => navigateTo('stories')}
              className="chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-8 py-3 font-display uppercase tracking-wider text-sm glow-red"
            >
              ← BROWSE ALL STORIES
            </button>
          </div>
        </div>
      </div>
    );
  }

  const related = getRelatedStories(story.slug, 3);

  const handleArticleConsult = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I was reading your technical story "${story.title}". I would like to consult with your engineering team regarding equipment and specifications.`
    );
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Convert markdown-style bold, bullet points, and tables to formatted elements
  const renderFormattedContent = (content) => {
    // If it's a table
    if (content.includes('|')) {
      const lines = content.trim().split('\n');
      const tableLines = lines.filter(l => l.trim().startsWith('|'));
      const textLinesBefore = [];
      const textLinesAfter = [];
      let isTable = false;
      let afterTable = false;

      lines.forEach(line => {
        if (line.trim().startsWith('|')) {
          isTable = true;
        } else if (!isTable) {
          textLinesBefore.push(line);
        } else {
          afterTable = true;
          textLinesAfter.push(line);
        }
      });

      const headerLine = tableLines[0];
      const dataRows = tableLines.slice(2); // Skip separator line

      const headers = headerLine ? headerLine.split('|').filter(c => c.trim().length > 0).map(c => c.trim()) : [];

      return (
        <div className="space-y-4">
          {textLinesBefore.length > 0 && (
            <div className="space-y-3 leading-relaxed">
              {textLinesBefore.map((p, pIdx) => renderParagraph(p, pIdx))}
            </div>
          )}

          <div className="overflow-x-auto my-6 border border-zinc-800 rounded-lg bg-[#111111] shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-300 font-display uppercase tracking-wider">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3.5 sm:p-4 text-white font-bold border-r border-zinc-800/60 last:border-r-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                {dataRows.map((row, rIdx) => {
                  const cells = row.split('|').filter(c => c.trim().length > 0).map(c => c.trim());
                  return (
                    <tr key={rIdx} className="hover:bg-zinc-900/40 transition-colors">
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="p-3.5 sm:p-4 border-r border-zinc-800/40 last:border-r-0 font-sans">
                          {renderInlineText(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {textLinesAfter.length > 0 && (
            <div className="space-y-3 leading-relaxed">
              {textLinesAfter.map((p, pIdx) => renderParagraph(p, pIdx))}
            </div>
          )}
        </div>
      );
    }

    // Standard paragraphs / bullet lists
    const paragraphs = content.split('\n\n');
    return (
      <div className="space-y-4 leading-relaxed">
        {paragraphs.map((p, pIdx) => renderParagraph(p, pIdx))}
      </div>
    );
  };

  const renderParagraph = (text, idx) => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    // Bullet list items
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const items = trimmed.split('\n');
      return (
        <ul key={idx} className="space-y-2.5 my-3 pl-2">
          {items.map((item, iIdx) => {
            const cleanItem = item.replace(/^[•\-]\s*/, '');
            return (
              <li key={iIdx} className="flex items-start gap-2.5 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <span className="text-[#E10B1F] mt-1.5 text-xs font-bold">▪</span>
                <span className="flex-1">{renderInlineText(cleanItem)}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered list items
    if (/^\d+\./.test(trimmed)) {
      const items = trimmed.split('\n');
      return (
        <ol key={idx} className="space-y-3 my-4 pl-2 list-none counter-reset">
          {items.map((item, iIdx) => {
            const match = item.match(/^(\d+)\.\s*(.*)/);
            if (!match) return <p key={iIdx}>{renderInlineText(item)}</p>;
            const num = match[1];
            const rest = match[2];
            return (
              <li key={iIdx} className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <span className="bg-zinc-900 border border-zinc-700 text-[#C9A24B] font-display text-xs w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {num}
                </span>
                <span className="flex-1">{renderInlineText(rest)}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Callout quote or notice
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '');
      return (
        <blockquote key={idx} className="border-l-4 border-[#E10B1F] bg-[#141414] p-4 sm:p-5 rounded-r my-4 text-zinc-200 text-sm sm:text-base italic">
          {renderInlineText(quoteText)}
        </blockquote>
      );
    }

    return (
      <p key={idx} className="text-zinc-300 text-sm sm:text-base leading-relaxed">
        {renderInlineText(trimmed)}
      </p>
    );
  };

  const renderInlineText = (text) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return <strong key={pIdx} className="text-white font-semibold">{inner}</strong>;
      }
      // Check for inline links e.g. [text](url)
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        const before = part.substring(0, linkMatch.index);
        const linkText = linkMatch[1];
        const linkUrl = linkMatch[2];
        const after = part.substring(linkMatch.index + linkMatch[0].length);
        return (
          <React.Fragment key={pIdx}>
            {before}
            <a
              href={linkUrl}
              onClick={(e) => {
                if (linkUrl.startsWith('/stories/')) {
                  e.preventDefault();
                  navigateTo(linkUrl.replace('/stories/', 'stories/'));
                } else if (linkUrl.startsWith('/')) {
                  e.preventDefault();
                  navigateTo(linkUrl.replace('/', ''));
                }
              }}
              className="text-[#E10B1F] underline hover:text-white transition-colors"
            >
              {linkText}
            </a>
            {after}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  return (
    <article className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Article Hero Banner */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="./assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              className="hover:text-white transition-colors"
            >
              HOME
            </a>
            <span>/</span>
            <a
              href="/stories"
              onClick={(e) => { e.preventDefault(); navigateTo('stories'); }}
              className="hover:text-white transition-colors"
            >
              STORIES
            </a>
            <span>/</span>
            <span className="text-[#E10B1F] truncate max-w-[200px] sm:max-w-xs">{story.category}</span>
          </nav>

          {/* Category & Read Time Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-[#E10B1F]/20 border border-[#E10B1F] text-[#E10B1F] px-3 py-1 rounded text-xs font-display tracking-widest uppercase font-bold">
              {story.category}
            </span>
            <span className="text-zinc-400 text-xs font-mono">
              ⏱ {story.readingTime}
            </span>
            <span className="text-zinc-600">•</span>
            <time dateTime={story.datePublished} className="text-zinc-400 text-xs font-mono">
              Published: {story.datePublished}
            </time>
            <span className="text-zinc-600">•</span>
            <span className="text-[#C9A24B] text-xs font-mono">
              Updated: {story.dateModified}
            </span>
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-tight">
            {story.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-zinc-800/80">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-[#E10B1F]">
              FF
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                By {story.author}
              </div>
              <div className="text-xs text-zinc-500">
                Verified Technical Knowledge • Combat Sports Arena Engineering
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Direct Answer Summary Box (Engineered for Answer Engines & Quick Takeaways) */}
        {story.directAnswer && (
          <aside className="p-6 sm:p-7 bg-[#141414] border-2 border-[#E10B1F]/40 rounded-lg shadow-[0_0_30px_rgba(225,11,31,0.1)] relative">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E10B1F] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-pulse"></span>
              DIRECT ANSWER SUMMARY
            </div>
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans">
              {story.directAnswer}
            </p>
          </aside>
        )}

        {/* Hero Image / Technical Blueprint Diagram */}
        <figure className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-[#0F0F0F] flex flex-col items-center justify-center shadow-2xl">
          <div className="w-full flex items-center justify-center p-2 sm:p-4 bg-black/60 min-h-[300px]">
            <img
              src={story.heroImage}
              alt={story.heroImageAlt}
              loading="eager"
              className="max-h-[820px] w-auto max-w-full object-contain rounded shadow transition-transform duration-300"
            />
          </div>
          <figcaption className="w-full bg-[#141414] px-4 py-3 text-xs text-zinc-300 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="font-semibold text-white">📐 {story.heroImageAlt}</span>
            <span className="text-[10px] text-[#C9A24B] uppercase tracking-wider font-bold bg-[#C9A24B]/10 px-2 py-0.5 rounded border border-[#C9A24B]/30 whitespace-nowrap">
              AUTHENTIC TECHNICAL SPECIFICATION
            </span>
          </figcaption>
        </figure>

        {/* Table of Contents */}
        {story.tableOfContents && story.tableOfContents.length > 0 && (
          <nav aria-label="Table of contents" className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-lg">
            <h3 className="text-sm font-display tracking-widest uppercase text-white mb-4 flex items-center gap-2">
              <span className="text-[#E10B1F]">☰</span> TABLE OF CONTENTS
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {story.tableOfContents.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    className="text-zinc-400 hover:text-[#E10B1F] transition-colors flex items-center gap-2 py-1"
                  >
                    <span className="text-[#C9A24B] text-[10px]">›</span>
                    <span className="truncate">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body Sections */}
        <div className="space-y-12">
          {story.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide border-b border-zinc-800 pb-3 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#E10B1F] inline-block"></span>
                <span>{section.heading}</span>
              </h2>
              {renderFormattedContent(section.content)}
            </section>
          ))}
        </div>

        {/* Interactive FAQ Section */}
        {story.faqList && story.faqList.length > 0 && (
          <section id="frequently-asked-questions" className="scroll-mt-28 pt-8 border-t border-zinc-800 space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#E10B1F] tracking-widest uppercase">
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide">
                COMMON COMBAT SPORTS QUESTIONS ANSWERED
              </h2>
            </div>

            <div className="space-y-3">
              {story.faqList.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-zinc-800 rounded-lg bg-[#111111] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white font-sans">
                      {faq.question}
                    </span>
                    <span className="text-[#E10B1F] text-lg font-bold shrink-0">
                      {openFaqIndex === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-black/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags Section */}
        <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mr-2">Topics:</span>
          {story.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#181410] to-[#141414] border border-[#C9A24B]/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#C9A24B]/20 text-[#C9A24B] uppercase tracking-wider">
              OFFICIAL ARENA CONSULTATION
            </div>
            <h3 className="text-xl sm:text-2xl font-display text-white uppercase tracking-wider">
              NEED CUSTOM ARENA BLUEPRINTS OR EQUIPMENT?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Our structural engineers fabricate official BFI-compliant boxing rings, UFC-standard octagons, and bespoke gym fight gear tailored for Indian combat facilities.
            </p>
          </div>
          <button
            onClick={handleArticleConsult}
            className="chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-7 py-4 text-xs font-display tracking-widest uppercase glow-gold whitespace-nowrap shrink-0"
          >
            CONSULT ON WHATSAPP ↗
          </button>
        </div>

        {/* Back to All Stories Button */}
        <div className="pt-4 flex items-center justify-between">
          <a
            href="/stories"
            onClick={(e) => { e.preventDefault(); navigateTo('stories'); }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
          >
            ← BACK TO ALL STORIES
          </a>

          <a
            href="/customize"
            onClick={(e) => { e.preventDefault(); navigateTo('customize'); }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-display tracking-widest uppercase text-[#E10B1F] hover:text-white transition-colors"
          >
            CUSTOMIZE YOUR RING / CAGE ↗
          </a>
        </div>

        {/* Related Stories Section */}
        {related && related.length > 0 && (
          <section className="pt-10 border-t border-zinc-800 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#E10B1F] tracking-widest uppercase">
                RECOMMENDED ARTICLES
              </span>
              <h3 className="text-2xl font-display text-white uppercase tracking-wide">
                RELATED STORIES & KNOWLEDGE
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relStory) => (
                <article
                  key={relStory.slug}
                  onClick={() => navigateTo(`stories/${relStory.slug}`)}
                  className="bg-[#141414] border border-zinc-800 hover:border-[#E10B1F] transition-all rounded-lg overflow-hidden cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-black">
                    <img
                      src={relStory.heroImage}
                      alt={relStory.heroImageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-[#E10B1F] font-bold uppercase tracking-wider">
                      {relStory.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="text-[10px] text-zinc-500 font-mono mb-1">
                        {relStory.datePublished} • {relStory.readingTime}
                      </div>
                      <h4 className="text-sm font-display text-white uppercase tracking-wide group-hover:text-[#E10B1F] transition-colors line-clamp-2">
                        {relStory.title}
                      </h4>
                    </div>

                    <span className="text-xs font-display tracking-widest text-[#E10B1F] group-hover:translate-x-1 transition-transform">
                      READ STORY →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
