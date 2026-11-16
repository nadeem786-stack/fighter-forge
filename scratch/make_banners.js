const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

const storiesArt = [
  {
    name: 'story-how-to-build-mma-cage.svg',
    category: 'TRAINING FACILITIES',
    title: 'HOW TO BUILD AN MMA CAGE',
    subtitle: 'STRUCTURAL STEEL • OCTAGON GEOMETRY • VINYL MESH',
    badge: 'ENGINEERING BLUEPRINT',
    accent: '#E10B1F',
    icon: '⬡'
  },
  {
    name: 'story-how-to-build-boxing-ring.svg',
    category: 'TRAINING FACILITIES',
    title: 'HOW TO BUILD A BOXING RING',
    subtitle: 'BFI SPECIFICATIONS • 4-ROPE RIGGING • CANVAS TENSION',
    badge: 'CHAMPIONSHIP SPEC',
    accent: '#C9A24B',
    icon: '◻'
  },
  {
    name: 'story-best-boxing-gloves.svg',
    category: 'GEAR GUIDES',
    title: 'BEST BOXING GLOVES BUYER GUIDE',
    subtitle: 'OZ WEIGHT MATRIX • LEATHER VS SYNTHETIC • SPARRING VS BAG',
    badge: 'EQUIPMENT LAB',
    accent: '#E10B1F',
    icon: '🥊'
  },
  {
    name: 'story-how-to-remove-smell-from-boxing-gloves.svg',
    category: 'GEAR CARE',
    title: 'HOW TO REMOVE GLOVE SMELL',
    subtitle: 'BACTERIA SCIENCE • BAKING SODA • 5-MIN AFTER-TRAINING ROUTINE',
    badge: 'HYGIENE PROTOCOL',
    accent: '#3B82F6',
    icon: '✨'
  },
  {
    name: 'story-ufc-events-january-2027.svg',
    category: 'EVENTS & NEWS',
    title: 'UFC EVENTS: JANUARY 2027',
    subtitle: 'DALLAS FIGHT NIGHT • UFC 336 TORONTO • INDIA IST BROADCAST',
    badge: 'ARENA CALENDAR',
    accent: '#E10B1F',
    icon: '⚔'
  }
];

storiesArt.forEach(art => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="grad-${art.accent.replace('#','')}" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${art.accent}" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#141414" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="1"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222222" stroke-width="1" opacity="0.6"/>
    </pattern>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#A0A0A0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect width="1200" height="630" fill="url(#grad-${art.accent.replace('#','')})"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Chamfer Border -->
  <polygon points="24,24 1176,24 1176,606 24,606" fill="none" stroke="#2A2A2A" stroke-width="2"/>
  <polygon points="30,30 1170,30 1170,600 30,600" fill="none" stroke="${art.accent}" stroke-width="1" opacity="0.4"/>

  <!-- Top Brand Tag -->
  <g transform="translate(60, 75)">
    <rect x="0" y="0" width="180" height="32" rx="4" fill="#0F0F0F" stroke="#333333" stroke-width="1"/>
    <text x="14" y="21" fill="#E10B1F" font-family="'Barlow', sans-serif" font-weight="900" font-size="12" letter-spacing="3">FIGHTER FORGE</text>
  </g>

  <!-- Category Badge -->
  <g transform="translate(255, 75)">
    <rect x="0" y="0" width="220" height="32" rx="4" fill="${art.accent}" fill-opacity="0.15" stroke="${art.accent}" stroke-width="1.5"/>
    <text x="16" y="21" fill="${art.accent}" font-family="'Barlow', sans-serif" font-weight="800" font-size="12" letter-spacing="2">${art.category}</text>
  </g>

  <!-- Big Watermark Icon -->
  <text x="1000" y="440" font-size="280" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.03" font-family="sans-serif">${art.icon}</text>

  <!-- Main Headline -->
  <text x="60" y="270" fill="#FFFFFF" font-family="'Bebas Neue', 'Anton', sans-serif" font-size="68" letter-spacing="2" font-weight="bold">
    ${art.title}
  </text>

  <!-- Red Accent Divider Line -->
  <rect x="60" y="300" width="120" height="5" fill="${art.accent}"/>

  <!-- Subtitle -->
  <text x="60" y="360" fill="#D4D4D8" font-family="'Barlow', sans-serif" font-size="20" font-weight="600" letter-spacing="3">
    ${art.subtitle}
  </text>

  <!-- Bottom Details Bar -->
  <g transform="translate(60, 500)">
    <rect x="0" y="0" width="1080" height="60" rx="6" fill="#141414" stroke="#262626" stroke-width="1"/>
    
    <text x="25" y="36" fill="${art.accent}" font-family="'Barlow', sans-serif" font-weight="800" font-size="13" letter-spacing="2">
      TAG: ${art.badge}
    </text>

    <text x="320" y="36" fill="#888888" font-family="'Barlow', sans-serif" font-weight="600" font-size="13" letter-spacing="1">
      AUTHOR: FIGHTER FORGE ARENA LABS
    </text>

    <text x="780" y="36" fill="#C9A24B" font-family="'Barlow', sans-serif" font-weight="700" font-size="13" letter-spacing="2">
      COMBAT KNOWLEDGE BASE →
    </text>
  </g>
</svg>`;

  const outPath = path.join(assetsDir, art.name);
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log('Created placeholder banner:', art.name);
});
