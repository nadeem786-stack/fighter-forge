const fs = require('fs');
const path = require('path');

const pdfPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded/media_1794774838723_dc1f3a36.pdf';
const outDir = 'C:/Users/Nadeem/.gemini/antigravity/scratch/fighter-forge/public/assets/pdf_images';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const buf = fs.readFileSync(pdfPath);
console.log('PDF read, size:', buf.length);

let count = 0;
let pos = 0;

while (pos < buf.length) {
  const start = buf.indexOf(Buffer.from([0xFF, 0xD8, 0xFF]), pos);
  if (start === -1) break;

  // Search for end of JPEG (0xFF, 0xD9)
  let end = buf.indexOf(Buffer.from([0xFF, 0xD9]), start + 3);
  if (end === -1) {
    pos = start + 3;
    continue;
  }

  // Check if there are other 0xFF, 0xD9 markers or if this is valid JPEG
  const imgData = buf.subarray(start, end + 2);
  if (imgData.length > 3000) {
    count++;
    const filename = `img_${count}.jpg`;
    fs.writeFileSync(path.join(outDir, filename), imgData);
    console.log(`Extracted ${filename}: ${imgData.length} bytes`);
  }
  pos = end + 2;
}

console.log('Total extracted JPEGs:', count);
