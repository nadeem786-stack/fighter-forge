const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Nadeem/.gemini/antigravity/scratch/fighter-forge/public/assets/pdf_images';
const files = fs.readdirSync(dir);

function getJpegDimensions(buffer) {
  let offset = 0;
  if (buffer.readUInt16BE(0) !== 0xFFD8) return null;
  offset += 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xFF) return null;
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      return { width, height };
    }
    const len = buffer.readUInt16BE(offset);
    offset += len;
  }
  return null;
}

files.forEach(f => {
  const buf = fs.readFileSync(path.join(dir, f));
  const dims = getJpegDimensions(buf);
  console.log(f, buf.length, dims ? `${dims.width}x${dims.height}` : 'unknown');
});
