const fs = require('fs');
const path = require('path');

const base = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded';
const dest = path.join(__dirname, '../public/assets/clients');

const map = [
  { src: 'media_1794919510048_5c316131.webp', dest: 'client-wako-india.webp', label: 'WAKO India' },
  { src: 'media_1794919510048_94f63fc7.webp', dest: 'client-aiba-world-boxing.webp', label: 'AIBA Women World Boxing' },
  { src: 'media_1794919510049_db10f9d8.webp', dest: 'client-train-high-gym.webp', label: 'Train High Gym' },
  { src: 'media_1794919510052_fcd7f05a.webp', dest: 'client-shiv-naresh.webp', label: 'Shiv-Naresh' },
  { src: 'media_1794919510052_e4c0fa89.webp', dest: 'client-trenz.webp', label: 'Trenz' },
  { src: 'media_1794919510053_bf0725e2.webp', dest: 'client-rajasthan-boxing.webp', label: 'Rajasthan Boxing Association' },
  { src: 'media_1794919510055_5ae46e43.webp', dest: 'client-crpf.webp', label: 'CRPF' },
  { src: 'media_1794919510055_8863f52e.webp', dest: 'client-sai-sports-authority-india.webp', label: 'SAI' }
];

map.forEach(item => {
  const srcPath = path.join(base, item.src);
  const destPath = path.join(dest, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`[OK] ${item.label} (${fs.statSync(destPath).size} bytes)`);
  } else {
    console.error(`Missing: ${srcPath}`);
  }
});

console.log('Copied all client logos.');
