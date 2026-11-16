const fs = require('fs');
const path = require('path');

function saveRawRgbAsBmp(rawBuf, width, height, smaskBuf, outPath) {
  // 24-bit or 32-bit BMP
  const hasAlpha = smaskBuf && smaskBuf.length === width * height;
  const bpp = hasAlpha ? 32 : 24;
  const rowBytes = Math.floor((bpp * width + 31) / 32) * 4;
  const imageSize = rowBytes * height;
  const fileSize = 54 + imageSize;

  const header = Buffer.alloc(54);
  // BM
  header.write('BM', 0);
  header.writeUInt32LE(fileSize, 2);
  header.writeUInt32LE(54, 10); // offset
  header.writeUInt32LE(40, 14); // DIB header size
  header.writeInt32LE(width, 18);
  header.writeInt32LE(height, 22); // bottom-up
  header.writeUInt16LE(1, 26); // planes
  header.writeUInt16LE(bpp, 28);
  header.writeUInt32LE(0, 30); // uncompressed
  header.writeUInt32LE(imageSize, 34);

  const bmpData = Buffer.alloc(imageSize);

  for (let y = 0; y < height; y++) {
    // BMP is bottom to top
    const srcY = height - 1 - y;
    const dstRowOffset = y * rowBytes;

    for (let x = 0; x < width; x++) {
      const srcIdx = (srcY * width + x) * 3;
      if (srcIdx + 2 < rawBuf.length) {
        const r = rawBuf[srcIdx];
        const g = rawBuf[srcIdx + 1];
        const b = rawBuf[srcIdx + 2];

        if (hasAlpha) {
          const a = smaskBuf[srcY * width + x];
          const dstIdx = dstRowOffset + x * 4;
          bmpData[dstIdx] = b;
          bmpData[dstIdx + 1] = g;
          bmpData[dstIdx + 2] = r;
          bmpData[dstIdx + 3] = a;
        } else {
          const dstIdx = dstRowOffset + x * 3;
          bmpData[dstIdx] = b;
          bmpData[dstIdx + 1] = g;
          bmpData[dstIdx + 2] = r;
        }
      }
    }
  }

  fs.writeFileSync(outPath, Buffer.concat([header, bmpData]));
  console.log(`Saved BMP: ${outPath} (${width}x${height}, bpp: ${bpp})`);
}

const dir = 'C:/Users/Nadeem/.gemini/antigravity/scratch/fighter-forge/public/assets/extracted';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.raw'));

files.forEach(f => {
  const m = f.match(/obj_(\d+)_(\d+)x(\d+)\.raw/);
  if (m) {
    const objNum = m[1];
    const width = parseInt(m[2]);
    const height = parseInt(m[3]);
    const raw = fs.readFileSync(path.join(dir, f));
    if (raw.length === width * height * 3) {
      // Check for smask
      let smask = null;
      // Look for smask file if any
      saveRawRgbAsBmp(raw, width, height, smask, path.join(dir, `obj_${objNum}_${width}x${height}.bmp`));
    }
  }
});
