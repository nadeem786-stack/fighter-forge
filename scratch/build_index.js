const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const cssContent = fs.readFileSync(path.join(baseDir, 'src/styles/index.css'), 'utf8');

// Prefer compiled plain JS bundle over raw JSX
let bundleJsPath = path.join(baseDir, 'public/app.bundle.js');
let bundleJsContent = '';
if (fs.existsSync(bundleJsPath) && fs.statSync(bundleJsPath).size > 1000) {
  bundleJsContent = fs.readFileSync(bundleJsPath, 'utf8');
} else {
  // If not compiled yet, fallback to JSX
  bundleJsContent = fs.readFileSync(path.join(baseDir, 'public/app.bundle.jsx'), 'utf8');
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  
  <!-- SEO & Social Meta Tags -->
  <title>FIGHTER FORGE | Built for Champions — Boxing Rings & MMA Cages</title>
  <meta name="description" content="Official manufacturer of Pro Boxing Rings and Championship MMA Cages. Heavy-gauge structural steel, 3ft (100cm) Pro Competition platforms, and bespoke gym branding." />
  <meta name="keywords" content="boxing rings, mma cages, octagon, 3ft elevated ring, fight equipment, fighter forge, combat sports gear, ring manufacturer india" />
  <meta name="author" content="Fighter Forge Arena Equipment" />

  <!-- Open Graph / WhatsApp Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="FIGHTER FORGE — Built for Champions" />
  <meta property="og:description" content="Premium Boxing Rings & MMA Cages built to BFI and World Boxing standards. Manufactured for fighters, gyms, and pro events with heavy-gauge steel, competition-grade padding, and direct factory pricing." />
  <meta property="og:image" content="./assets/fighter-forge-horizontal.png" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="FIGHTER FORGE — Built for Champions" />
  <meta property="twitter:description" content="Premium Boxing Rings & MMA Cages built to BFI and World Boxing standards. Manufactured for fighters, gyms, and pro events with heavy-gauge steel, competition-grade padding, and direct factory pricing." />
  <meta property="twitter:image" content="./assets/fighter-forge-horizontal.png" />

  <!-- Favicon (User's Exact Shield Icon) -->
  <link rel="icon" type="image/png" href="./assets/fighter-forge-shield.png" />
  <link rel="apple-touch-icon" href="./assets/fighter-forge-shield.png" />

  <!-- Typography: Anton, Bebas Neue, Teko & Barlow -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Bebas+Neue&family=Teko:wght@500;600;700&display=swap" rel="stylesheet" />

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            fightRed: '#E10B1F',
            deepBlack: '#0A0A0A',
            charcoal: '#1A1A1A',
            steelGray: '#8C8C8C',
            forgeGold: '#C9A24B'
          },
          fontFamily: {
            display: ['"Bebas Neue"', 'Anton', 'sans-serif'],
            condensed: ['Teko', '"Bebas Neue"', 'sans-serif'],
            sans: ['Barlow', 'sans-serif']
          }
        }
      }
    };
  </script>

  <!-- Embedded Custom Stylesheet -->
  <style>
${cssContent}
  </style>

  <!-- React 18 & ReactDOM UMD (Local with Instant CDN Fallback) -->
  <script src="./react.production.min.js"></script>
  <script>
    if (!window.React) {
      document.write('<script src="https://unpkg.com/react@18/umd/react.production.min.js"><\\/script>');
    }
  </script>
  <script src="./react-dom.production.min.js"></script>
  <script>
    if (!window.ReactDOM) {
      document.write('<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\\/script>');
    }
  </script>
</head>
<body class="bg-[#0A0A0A] text-white">
  <!-- React App Root Container -->
  <div id="root">
    <!-- Initial Loading State (Replaced immediately when React mounts) -->
    <div id="initial-loading-fallback" style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #0A0A0A; font-family: 'Barlow', sans-serif; text-align: center; padding: 20px;">
      <div style="position: relative; width: 90px; height: 90px; margin-bottom: 24px;">
        <img src="./assets/fighter-forge-shield.png" alt="Fighter Forge Shield" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 0 20px rgba(225,11,31,0.6)); animation: pulse 2s infinite;" />
      </div>
      <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 3px; color: #FFFFFF; text-transform: uppercase; margin: 0;">
        FIGHTER FORGE
      </h1>
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 4px; color: #E10B1F; text-transform: uppercase; margin-top: 8px;">
        BUILT FOR CHAMPIONS • LOADING ARENA...
      </p>
      <div id="error-console" style="display: none; margin-top: 20px; max-width: 500px; padding: 12px; background: #1A1A1A; border: 1px solid #E10B1F; color: #FFAAAA; font-size: 12px; text-align: left; border-radius: 4px;"></div>
    </div>
  </div>

  <script>
    // Global Error Handler to display any issues clearly
    window.onerror = function(msg, url, line, col, error) {
      console.error('Fighter Forge Global Error:', msg, 'at', url, ':', line, col, error);
      var errDiv = document.getElementById('error-console');
      if (errDiv) {
        errDiv.style.display = 'block';
        errDiv.innerHTML = '<strong>Error loading:</strong> ' + msg + '<br><small>Line ' + line + (col ? (':' + col) : '') + (error && error.stack ? '<br>' + error.stack : '') + '</small>';
      }
    };
  </script>

  <!-- Complete Pre-Compiled Application Bundle (Pure JavaScript, Zero Babel Delay) -->
  <script>
${bundleJsContent}
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(baseDir, 'public/index.html'), htmlContent, 'utf8');
console.log('Successfully generated public/index.html. Total length:', htmlContent.length);
