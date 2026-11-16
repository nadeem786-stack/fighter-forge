const http = require('http');

const images = [
  { url: '/assets/accessories/accessory-01-canvas.jpg', desc: 'Canvas' },
  { url: '/assets/accessories/accessory-02-skirt.jpg', desc: 'Ring Skirt' },
  { url: '/assets/accessories/accessory-03-rope-spacer.jpg', desc: 'Rope Spacer' },
  { url: '/assets/accessories/accessory-04-wire.jpg', desc: 'Metal Rope Wire' },
  { url: '/assets/accessories/accessory-06-bent-corner-pads.jpg', desc: 'Special Bent Corner Pads' },
  { url: '/assets/accessories/accessory-07-buckle-covers.jpg', desc: 'Buckle Cover' },
  { url: '/assets/accessories/accessory-08-turnbuckle.jpg', desc: 'Turn Buckle' },
  { url: '/assets/accessories/accessory-09-rope-cover-handstitch.jpg', desc: 'Rope Cover Hand Stitch' },
  { url: '/assets/accessories/accessory-10-ring-stairs.jpg', desc: 'Ring Stairs' }
];

async function checkUrl(item) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${item.url}`, res => {
      let size = 0;
      res.on('data', chunk => size += chunk.length);
      res.on('end', () => {
        const ok = res.statusCode === 200 && size > 50000;
        console.log(`[${ok ? 'PASS' : 'FAIL'}] ${item.desc}: status=${res.statusCode}, size=${size} bytes, type=${res.headers['content-type']}`);
        resolve(ok);
      });
    }).on('error', err => {
      console.log(`[FAIL] ${item.desc}: error=${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('--- VERIFYING 9 ACCESSORY IMAGES ON SERVER ---');
  let allPass = true;
  for (const img of images) {
    const pass = await checkUrl(img);
    if (!pass) allPass = false;
  }
  console.log('All images verified:', allPass ? 'YES (100% PASS)' : 'NO');
}

run();
