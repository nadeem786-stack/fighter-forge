const fs = require('fs');
const path = require('path');

const base = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded';
const dest = path.join(__dirname, '../public/assets/accessories');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

const map = [
  { src: 'media_1794828916003_e9f9329d.jpg', dest: 'accessory-08-turnbuckle.jpg', desc: '1st: Turn Buckle' },
  { src: 'media_1794828916008_a20d135a.jpg', dest: 'accessory-01-canvas.jpg', desc: '2nd: Canvas' },
  { src: 'media_1794828916017_8d80cb44.jpg', dest: 'accessory-03-rope-spacer.jpg', desc: '3rd: Rope Spacer' },
  { src: 'media_1794828916028_d978f9c3.jpg', dest: 'accessory-02-skirt.jpg', desc: '4th: Ring Skirt' },
  { src: 'media_1794828916037_8786bec6.jpg', dest: 'accessory-09-rope-cover-handstitch.jpg', desc: '5th: Rope Cover' },
  { src: 'media_1794828916047_c59e0871.jpg', dest: 'accessory-06-bent-corner-pads.jpg', desc: '6th: Special Corner Pads' },
  { src: 'media_1794828916054_1b0a1d77.jpg', dest: 'accessory-07-buckle-covers.jpg', desc: '7th: Turnbuckle Cover' },
  { src: 'media_1794828916062_329c32d4.jpg', dest: 'accessory-10-ring-stairs.jpg', desc: '8th: Stairs' },
  { src: 'media_1794828916074_26af2c62.jpg', dest: 'accessory-04-wire.jpg', desc: '9th: Metal Rope' }
];

map.forEach(item => {
  const srcPath = path.join(base, item.src);
  const destPath = path.join(dest, item.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const size = fs.statSync(destPath).size;
    console.log(`[OK] ${item.desc} (${item.src}) -> ${item.dest} (${size} bytes)`);
  } else {
    console.error(`[ERROR] File missing: ${srcPath}`);
  }
});

console.log('Finished copying all 9 accessory images.');
