const fs = require('fs');

const pdfPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded/media_1794774838723_dc1f3a36.pdf';
const buf = fs.readFileSync(pdfPath);
const str = buf.toString('latin1');

// Match all /Subtype /Image
let regex = /\/Subtype\s*\/Image/g;
let match;
let count = 0;
while ((match = regex.exec(str)) !== null) {
  count++;
  const context = str.substring(Math.max(0, match.index - 100), Math.min(str.length, match.index + 200));
  console.log(`Image ${count} at ${match.index}:`, context.replace(/\r?\n/g, ' '));
}
console.log('Total image objects in PDF:', count);
