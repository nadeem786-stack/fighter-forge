const fs = require('fs');
const path = require('path');

const base = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded';
const dest = path.join(__dirname, '../public/assets');

const files = [
  { src: 'media_1794833758413_d8b80833.webp', dest: 'ring-floor-01.webp', label: '1st: Floor Boxing Ring' },
  { src: 'media_1794833758413_ae5b5e1d.webp', dest: 'ring-elevated-1-2ft.webp', label: '2nd: 1-2ft Boxing Ring' },
  { src: 'media_1794833758413_d15b4ec8.webp', dest: 'ring-championship-3ft.webp', label: '3rd: Competition Level Boxing Ring' },
  { src: 'media_1794833758416_827c03d7.webp', dest: 'home-boxing-rings-card.webp', label: '4th: Home Page Boxing Ring Card' }
];

files.forEach(f => {
  const srcPath = path.join(base, f.src);
  const destPath = path.join(dest, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const size = fs.statSync(destPath).size;
    console.log(`[COPIED] ${f.label} -> ${f.dest} (${size} bytes)`);
  } else {
    console.error(`[ERROR] File missing: ${srcPath}`);
  }
});

console.log('Finished copying all 4 ring images.');
