const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

function cleanCode(content) {
  // Remove import statements
  let cleaned = content.replace(/^import\s+.*?;\s*$/gm, '');
  cleaned = cleaned.replace(/^import\s+[\s\S]*?from\s+['"].*?['"];?\s*$/gm, '');
  // Remove export keywords but keep declarations
  cleaned = cleaned.replace(/^export\s+default\s+/gm, '');
  cleaned = cleaned.replace(/^export\s+(async\s+function|function|const|let|var|class)\s+/gm, '$1 ');
  cleaned = cleaned.replace(/^export\s+\{[^}]*\};?\s*$/gm, '');
  return cleaned;
}

const filesInOrder = [
  // 1. Config & Data
  path.join(baseDir, 'src/config/siteConfig.js'),
  path.join(baseDir, 'src/data/storiesData.js'),
  // 2. Utils
  path.join(baseDir, 'src/utils/whatsapp.js'),
  path.join(baseDir, 'src/utils/api.js'),
  // 3. Context
  path.join(baseDir, 'src/context/CartContext.jsx'),
  // 4. Components
  path.join(baseDir, 'src/components/ClientLogosMarquee.jsx'),
  path.join(baseDir, 'src/components/SloganMarquee.jsx'),
  path.join(baseDir, 'src/components/ElevationDiagram.jsx'),
  path.join(baseDir, 'src/components/ProductCard.jsx'),
  path.join(baseDir, 'src/components/QuickViewModal.jsx'),
  path.join(baseDir, 'src/components/Toast.jsx'),
  path.join(baseDir, 'src/components/GearCommunityModal.jsx'),
  path.join(baseDir, 'src/components/EventRentalModal.jsx'),
  path.join(baseDir, 'src/components/LoadingScreen.jsx'),
  path.join(baseDir, 'src/components/Navbar.jsx'),
  path.join(baseDir, 'src/components/Footer.jsx'),
  path.join(baseDir, 'src/components/FloatingWhatsApp.jsx'),
  // 5. Pages
  path.join(baseDir, 'src/pages/HomePage.jsx'),
  path.join(baseDir, 'src/pages/BoxingRingsPage.jsx'),
  path.join(baseDir, 'src/pages/MmaCagesPage.jsx'),
  path.join(baseDir, 'src/pages/CartEnquiryPage.jsx'),
  path.join(baseDir, 'src/pages/CustomizePage.jsx'),
  path.join(baseDir, 'src/pages/StoriesPage.jsx'),
  path.join(baseDir, 'src/pages/StoryDetailPage.jsx'),
  // 6. App
  path.join(baseDir, 'src/App.jsx')
];

let bundleContent = `
/**
 * FIGHTER FORGE — COMPLETE APPLICATION BUNDLE
 * Built for Champions
 */

const { useState, useEffect, useContext, createContext } = React;
`;

filesInOrder.forEach(file => {
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    const cleaned = cleanCode(raw);
    bundleContent += `\n// --- MODULE: ${path.basename(file)} ---\n` + cleaned + '\n';
  } else {
    console.error('Missing file:', file);
    process.exit(1);
  }
});

// Add mount logic at the end
bundleContent += `
// --- MOUNT APPLICATION ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
`;

// Ensure assets preserve matching quotes if converted
bundleContent = bundleContent.replace(/(['"])\/assets\//g, '$1./assets/');

fs.writeFileSync(path.join(baseDir, 'public/app.bundle.jsx'), bundleContent, 'utf8');
console.log('Successfully generated public/app.bundle.jsx. Total length:', bundleContent.length);
