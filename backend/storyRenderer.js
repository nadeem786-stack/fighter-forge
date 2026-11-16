/**
 * FIGHTER FORGE — SERVER-SIDE HTML STORY RENDERER
 * 
 * Generates pre-rendered, semantic HTML for /stories and /stories/:slug.
 * Ensures search engines (Googlebot) and AI Answer Engines (GPTBot, ClaudeBot,
 * PerplexityBot) receive 100% complete text, schemas, and meta tags in the raw HTML.
 */

const fs = require('fs');
const path = require('path');
const { stories, getStoryBySlug, getRelatedStories } = require('../src/data/storiesData.js');

const ROOT_DIR = path.join(__dirname, '..');
const cssPath = path.join(ROOT_DIR, 'src', 'styles', 'index.css');
const bundlePath = path.join(ROOT_DIR, 'public', 'app.bundle.js');

let cachedCss = '';
let cachedBundle = '';

function getCss() {
  if (!cachedCss && fs.existsSync(cssPath)) {
    cachedCss = fs.readFileSync(cssPath, 'utf8');
  }
  return cachedCss;
}

function getBundle() {
  if (!cachedBundle && fs.existsSync(bundlePath)) {
    cachedBundle = fs.readFileSync(bundlePath, 'utf8');
  }
  return cachedBundle;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMarkdownToHtml(content) {
  if (!content) return '';

  // If table exists
  if (content.includes('|')) {
    const lines = content.trim().split('\n');
    const tableLines = lines.filter(l => l.trim().startsWith('|'));
    const nonTableBefore = [];
    const nonTableAfter = [];
    let inTable = false;

    lines.forEach(l => {
      if (l.trim().startsWith('|')) {
        inTable = true;
      } else if (!inTable) {
        nonTableBefore.push(l);
      } else {
        nonTableAfter.push(l);
      }
    });

    let html = '';
    if (nonTableBefore.length > 0) {
      html += formatMarkdownToHtml(nonTableBefore.join('\n\n'));
    }

    if (tableLines.length >= 2) {
      const headerCells = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const dataRows = tableLines.slice(2);

      html += `<div class="overflow-x-auto my-6 border border-zinc-800 rounded-lg bg-[#111111]">
        <table class="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr class="bg-zinc-900 border-b border-zinc-800 text-zinc-300 font-display uppercase tracking-wider">
              ${headerCells.map(h => `<th class="p-3 sm:p-4 text-white font-bold border-r border-zinc-800/60 last:border-r-0">${formatInlineText(h)}</th>`).join('')}
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800 text-zinc-300">
            ${dataRows.map(row => {
              const cells = row.split('|').filter(c => c.trim()).map(c => c.trim());
              return `<tr class="hover:bg-zinc-900/40 transition-colors">
                ${cells.map(c => `<td class="p-3 sm:p-4 border-r border-zinc-800/40 last:border-r-0 font-sans">${formatInlineText(c)}</td>`).join('')}
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
    }

    if (nonTableAfter.length > 0) {
      html += formatMarkdownToHtml(nonTableAfter.join('\n\n'));
    }

    return html;
  }

  // Standard paragraphs
  const paragraphs = content.split('\n\n');
  return paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';

    // Bullet list
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const items = trimmed.split('\n');
      return `<ul class="space-y-2.5 my-3 pl-2">
        ${items.map(item => {
          const clean = item.replace(/^[•\-]\s*/, '');
          return `<li class="flex items-start gap-2.5 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <span class="text-[#E10B1F] mt-1.5 text-xs font-bold">▪</span>
            <span class="flex-1">${formatInlineText(clean)}</span>
          </li>`;
        }).join('')}
      </ul>`;
    }

    // Numbered list
    if (/^\d+\./.test(trimmed)) {
      const items = trimmed.split('\n');
      return `<ol class="space-y-3 my-4 pl-2 list-none">
        ${items.map(item => {
          const match = item.match(/^(\d+)\.\s*(.*)/);
          if (!match) return `<p>${formatInlineText(item)}</p>`;
          return `<li class="flex items-start gap-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <span class="bg-zinc-900 border border-zinc-700 text-[#C9A24B] font-display text-xs w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 font-bold">${match[1]}</span>
            <span class="flex-1">${formatInlineText(match[2])}</span>
          </li>`;
        }).join('')}
      </ol>`;
    }

    // Callout
    if (trimmed.startsWith('>')) {
      const quote = trimmed.replace(/^>\s*/, '');
      return `<blockquote class="border-l-4 border-[#E10B1F] bg-[#141414] p-4 rounded-r my-4 text-zinc-200 text-sm sm:text-base italic">${formatInlineText(quote)}</blockquote>`;
    }

    return `<p class="text-zinc-300 text-sm sm:text-base leading-relaxed mb-4">${formatInlineText(trimmed)}</p>`;
  }).join('');
}

function formatInlineText(text) {
  let str = text;
  // Bold **text**
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  // Links [text](url)
  str = str.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#E10B1F] underline hover:text-white transition-colors">$1</a>');
  return str;
}

/**
 * Render /stories listing page HTML
 */
function renderStoriesListingHtml() {
  const css = getCss();
  const bundle = getBundle();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Combat Sports Stories & Arena Engineering | FIGHTER FORGE</title>
  <meta name="description" content="Technical blueprints, construction guides, gear buying guides, and arena news for MMA cages, boxing rings, and combat athletes in India." />
  <link rel="canonical" href="https://fighterforge.in/stories" />

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Combat Sports Stories & Arena Engineering | FIGHTER FORGE" />
  <meta property="og:description" content="Technical blueprints, construction guides, gear buying guides, and arena news for MMA cages, boxing rings, and combat athletes in India." />
  <meta property="og:url" content="https://fighterforge.in/stories" />
  <meta property="og:image" content="https://fighterforge.in/assets/fighter-forge-horizontal.png" />
  <meta property="twitter:card" content="summary_large_image" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/assets/fighter-forge-shield.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Bebas+Neue&family=Teko:wght@500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${css}</style>
  <script src="/react.production.min.js"></script>
  <script>if (!window.React) document.write('<script src="https://unpkg.com/react@18/umd/react.production.min.js"><\\/script>');</script>
  <script src="/react-dom.production.min.js"></script>
  <script>if (!window.ReactDOM) document.write('<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\\/script>');</script>

  <!-- JSON-LD CollectionPage Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Combat Sports Stories, Blueprints & Arena News",
    "description": "Technical blueprints, construction guides, gear buying guides, and arena news for MMA cages, boxing rings, and combat athletes in India.",
    "url": "https://fighterforge.in/stories",
    "publisher": {
      "@type": "Organization",
      "name": "Fighter Forge",
      "logo": "https://fighterforge.in/assets/fighter-forge-horizontal.png"
    },
    "hasPart": [
      ${stories.map(s => `{
        "@type": "Article",
        "headline": ${JSON.stringify(s.title)},
        "url": "https://fighterforge.in/stories/${s.slug}",
        "datePublished": "${s.datePublished}"
      }`).join(',\n      ')}
    ]
  }
  </script>
</head>
<body class="bg-[#0A0A0A] text-white">
  <div id="root">
    <!-- Server-Side Pre-rendered Content -->
    <main class="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <section class="py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F]">
        <div class="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" class="text-xs uppercase text-zinc-500 mb-2">
            <a href="/" class="hover:text-white">HOME</a> / <span class="text-[#E10B1F]">STORIES</span>
          </nav>
          <h1 class="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white">
            STORIES, BLUEPRINTS & COMBAT NEWS
          </h1>
          <p class="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl">
            Technical guides on MMA cage construction, regulation boxing rings, gear maintenance, combat science, and upcoming international fight cards.
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${stories.map(story => `
            <article class="bg-[#141414] border border-zinc-800 hover:border-[#E10B1F] rounded-lg overflow-hidden flex flex-col justify-between">
              <a href="/stories/${story.slug}" class="flex-1 flex flex-col justify-between">
                <div class="relative h-56 w-full overflow-hidden bg-black">
                  <img src="${story.heroImage.startsWith('/') ? story.heroImage : '/' + story.heroImage.replace(/^\.\//, '')}" alt="${escapeHtml(story.heroImageAlt)}" width="600" height="338" class="w-full h-full object-cover" loading="lazy" />
                  <div class="absolute top-3 left-3 bg-black/85 px-2.5 py-1 rounded text-[10px] font-bold text-[#E10B1F] uppercase">${story.category}</div>
                  <div class="absolute top-3 right-3 bg-black/85 px-2 py-0.5 rounded text-[10px] text-zinc-400 font-mono">${story.readingTime}</div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div class="text-[11px] text-zinc-500 font-mono mb-1.5">${story.datePublished} • by ${story.author}</div>
                    <h2 class="text-xl font-display text-white uppercase tracking-wide leading-snug">${story.title}</h2>
                    <p class="text-xs text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">${story.excerpt}</p>
                  </div>
                  <div class="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span class="text-xs font-display tracking-widest text-[#E10B1F]">READ FULL STORY →</span>
                  </div>
                </div>
              </a>
            </article>
          `).join('')}
        </div>
      </div>
    </main>
  </div>

  <script>
${bundle}
  </script>
</body>
</html>`;
}

/**
 * Render individual /stories/:slug article page HTML
 */
function renderStoryDetailHtml(story) {
  const css = getCss();
  const bundle = getBundle();
  const related = getRelatedStories(story.slug, 3);

  // Structured Data Schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": story.title,
    "description": story.metaDescription,
    "image": `https://fighterforge.in${story.heroImage.replace(/^\./, '')}`,
    "datePublished": story.datePublished,
    "dateModified": story.dateModified,
    "author": {
      "@type": "Organization",
      "name": story.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fighter Forge",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fighterforge.in/assets/fighter-forge-horizontal.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fighterforge.in/stories/${story.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fighterforge.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Stories",
        "item": "https://fighterforge.in/stories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": story.title,
        "item": `https://fighterforge.in/stories/${story.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": story.faqList.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  
  <!-- Primary Meta Tags -->
  <title>${escapeHtml(story.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(story.metaDescription)}" />
  <link rel="canonical" href="https://fighterforge.in/stories/${story.slug}" />

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(story.metaTitle)}" />
  <meta property="og:description" content="${escapeHtml(story.metaDescription)}" />
  <meta property="og:image" content="https://fighterforge.in${story.heroImage.replace(/^\./, '')}" />
  <meta property="og:url" content="https://fighterforge.in/stories/${story.slug}" />
  <meta property="article:published_time" content="${story.datePublished}" />
  <meta property="article:modified_time" content="${story.dateModified}" />
  <meta property="article:section" content="${escapeHtml(story.category)}" />

  <!-- Twitter Card -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="${escapeHtml(story.metaTitle)}" />
  <meta property="twitter:description" content="${escapeHtml(story.metaDescription)}" />
  <meta property="twitter:image" content="https://fighterforge.in${story.heroImage.replace(/^\./, '')}" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/assets/fighter-forge-shield.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Bebas+Neue&family=Teko:wght@500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>${css}</style>
  <script src="/react.production.min.js"></script>
  <script>if (!window.React) document.write('<script src="https://unpkg.com/react@18/umd/react.production.min.js"><\\/script>');</script>
  <script src="/react-dom.production.min.js"></script>
  <script>if (!window.ReactDOM) document.write('<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\\/script>');</script>

  <!-- JSON-LD Structured Data: Article -->
  <script type="application/ld+json">
  ${JSON.stringify(articleSchema, null, 2)}
  </script>

  <!-- JSON-LD Structured Data: Breadcrumbs -->
  <script type="application/ld+json">
  ${JSON.stringify(breadcrumbSchema, null, 2)}
  </script>

  <!-- JSON-LD Structured Data: FAQPage -->
  <script type="application/ld+json">
  ${JSON.stringify(faqSchema, null, 2)}
  </script>
</head>
<body class="bg-[#0A0A0A] text-white">
  <div id="root">
    <!-- Server-Side Pre-rendered Article for Search Engines & LLMs -->
    <article class="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <header class="py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F]">
        <div class="max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" class="text-xs uppercase text-zinc-500 mb-4 flex items-center gap-2">
            <a href="/" class="hover:text-white">HOME</a> / 
            <a href="/stories" class="hover:text-white">STORIES</a> / 
            <span class="text-[#E10B1F]">${escapeHtml(story.category)}</span>
          </nav>

          <div class="flex items-center gap-3 mb-4">
            <span class="bg-[#E10B1F]/20 border border-[#E10B1F] text-[#E10B1F] px-3 py-1 rounded text-xs font-bold uppercase">${story.category}</span>
            <span class="text-zinc-400 text-xs font-mono">⏱ ${story.readingTime}</span>
            <span class="text-zinc-600">•</span>
            <time dateTime="${story.datePublished}" class="text-zinc-400 text-xs font-mono">Published: ${story.datePublished}</time>
            <span class="text-zinc-600">•</span>
            <span class="text-[#C9A24B] text-xs font-mono">Updated: ${story.dateModified}</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-tight">
            ${story.title}
          </h1>

          <div class="flex items-center gap-3 mt-6 pt-6 border-t border-zinc-800">
            <div class="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-[#E10B1F]">FF</div>
            <div>
              <div class="text-sm font-semibold text-white">By ${story.author}</div>
              <div class="text-xs text-zinc-500">Verified Technical Knowledge • Combat Sports Arena Engineering</div>
            </div>
          </div>
        </div>
      </header>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <!-- Direct Answer Summary -->
        <aside class="p-6 sm:p-7 bg-[#141414] border-2 border-[#E10B1F]/40 rounded-lg">
          <div class="text-xs font-bold uppercase tracking-widest text-[#E10B1F] mb-2">DIRECT ANSWER SUMMARY</div>
          <p class="text-zinc-200 text-sm sm:text-base leading-relaxed font-sans">${story.directAnswer}</p>
        </aside>

        <!-- Hero Blueprint Image -->
        <figure class="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-[#0D0D0D] shadow-2xl flex flex-col items-center">
          <div class="w-full flex justify-center bg-black/40 py-2">
            <img src="${story.heroImage.startsWith('/') ? story.heroImage : '/' + story.heroImage.replace(/^\.\//, '')}" alt="${escapeHtml(story.heroImageAlt)}" width="1200" height="900" class="max-h-[820px] w-auto max-w-full object-contain mx-auto" loading="eager" />
          </div>
          <figcaption class="w-full p-3 bg-zinc-900/90 border-t border-zinc-800 text-xs text-zinc-400 font-mono text-center">${escapeHtml(story.heroImageAlt)}</figcaption>
        </figure>

        <!-- Table of Contents -->
        <nav aria-label="Table of contents" class="p-6 bg-zinc-900/60 border border-zinc-800 rounded-lg">
          <h3 class="text-sm font-display tracking-widest uppercase text-white mb-4">TABLE OF CONTENTS</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            ${story.tableOfContents.map(item => `
              <li><a href="#${item.id}" class="text-zinc-400 hover:text-[#E10B1F] py-1 block">› ${escapeHtml(item.title)}</a></li>
            `).join('')}
          </ul>
        </nav>

        <!-- Article Sections -->
        <div class="space-y-12">
          ${story.sections.map(sec => `
            <section id="${sec.id}" class="space-y-4">
              <h2 class="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide border-b border-zinc-800 pb-3">
                ${escapeHtml(sec.heading)}
              </h2>
              ${formatMarkdownToHtml(sec.content)}
            </section>
          `).join('')}
        </div>

        <!-- FAQ Section -->
        <section id="frequently-asked-questions" class="pt-8 border-t border-zinc-800 space-y-6">
          <h2 class="text-2xl sm:text-3xl font-display text-white uppercase tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div class="space-y-4">
            ${story.faqList.map(faq => `
              <div class="border border-zinc-800 rounded-lg p-5 bg-[#111111]">
                <h3 class="text-base font-semibold text-white font-sans mb-2">${escapeHtml(faq.question)}</h3>
                <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">${escapeHtml(faq.answer)}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Related Stories -->
        <section class="pt-10 border-t border-zinc-800 space-y-6">
          <h3 class="text-2xl font-display text-white uppercase tracking-wide">RELATED STORIES & KNOWLEDGE</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${related.map(rel => `
              <article class="bg-[#141414] border border-zinc-800 rounded-lg overflow-hidden">
                <a href="/stories/${rel.slug}" class="block">
                  <div class="h-36 w-full overflow-hidden bg-black">
                    <img src="${rel.heroImage.startsWith('/') ? rel.heroImage : '/' + rel.heroImage.replace(/^\.\//, '')}" alt="${escapeHtml(rel.heroImageAlt)}" width="400" height="225" class="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div class="p-4 space-y-2">
                    <span class="text-[10px] text-[#E10B1F] font-bold uppercase">${rel.category}</span>
                    <h4 class="text-sm font-display text-white uppercase line-clamp-2">${escapeHtml(rel.title)}</h4>
                    <span class="text-xs text-[#E10B1F]">READ STORY →</span>
                  </div>
                </a>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- Back Link -->
        <div class="pt-4">
          <a href="/stories" class="text-xs sm:text-sm font-display tracking-widest uppercase text-zinc-400 hover:text-white">
            ← BACK TO ALL STORIES
          </a>
        </div>
      </div>
    </article>
  </div>

  <script>
${bundle}
  </script>
</body>
</html>`;
}

module.exports = {
  renderStoriesListingHtml,
  renderStoryDetailHtml
};
