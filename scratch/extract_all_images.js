const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const pdfPath = 'C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded/media_1794774838723_dc1f3a36.pdf';
const buf = fs.readFileSync(pdfPath);
const outDir = 'C:/Users/Nadeem/.gemini/antigravity/scratch/fighter-forge/public/assets/extracted';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Parse objects
const str = buf.toString('latin1');
const objRegex = /(\d+)\s+(\d+)\s+obj\s*<<([\s\S]*?)>>\s*(?:stream\r?\n([\s\S]*?)\r?\nendstream)?/g;
let match;
let count = 0;

while ((match = objRegex.exec(str)) !== null) {
  const objNum = match[1];
  const dict = match[3];
  
  if (dict.includes('/Subtype /Image') || dict.includes('/Subtype/Image')) {
    count++;
    const widthMatch = dict.match(/\/Width\s+(\d+)/);
    const heightMatch = dict.match(/\/Height\s+(\d+)/);
    const filterMatch = dict.match(/\/Filter\s*(\/[A-Za-z0-9]+)/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 0;
    const height = heightMatch ? parseInt(heightMatch[1]) : 0;
    const filter = filterMatch ? filterMatch[1] : '';

    console.log(`Obj ${objNum}: ${width}x${height}, Filter: ${filter}`);

    // Find stream binary location accurately in buffer
    const streamTag = `\nstream\r\n`;
    const streamTag2 = `\nstream\n`;
    let streamStart = buf.indexOf(streamTag, match.index);
    let offset = streamTag.length;
    if (streamStart === -1 || streamStart > match.index + dict.length + 50) {
      streamStart = buf.indexOf(streamTag2, match.index);
      offset = streamTag2.length;
    }
    if (streamStart === -1) continue;

    const streamDataStart = streamStart + offset;
    const endstreamPos = buf.indexOf('endstream', streamDataStart);
    if (endstreamPos === -1) continue;

    const streamBytes = buf.subarray(streamDataStart, endstreamPos);

    if (filter === '/DCTDecode') {
      fs.writeFileSync(path.join(outDir, `obj_${objNum}_${width}x${height}.jpg`), streamBytes);
      console.log(`  -> Saved JPG obj_${objNum}_${width}x${height}.jpg`);
    } else if (filter === '/FlateDecode') {
      try {
        const decompressed = zlib.inflateSync(streamBytes);
        console.log(`  -> Decompressed Flate: ${decompressed.length} bytes`);
        // If it's RGB or Gray image
        fs.writeFileSync(path.join(outDir, `obj_${objNum}_${width}x${height}.raw`), decompressed);
      } catch (e) {
        console.log(`  -> Decompress error:`, e.message);
      }
    }
  }
}

console.log('Total images found:', count);
