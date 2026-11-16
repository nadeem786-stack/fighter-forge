const http = require('http');

const list = [
  '/assets/ring-floor-01.webp',
  '/assets/ring-elevated-1-2ft.webp',
  '/assets/ring-championship-3ft.webp',
  '/assets/home-boxing-rings-card.webp'
];

async function check(p) {
  return new Promise(res => {
    http.get(`http://localhost:3000${p}`, r => {
      let len = 0;
      r.on('data', c => len += c.length);
      r.on('end', () => {
        console.log(`[STATUS ${r.statusCode}] ${p} (${len} bytes, type: ${r.headers['content-type']})`);
        res(r.statusCode === 200 && len > 10000);
      });
    }).on('error', e => {
      console.error(`[ERR] ${p}: ${e.message}`);
      res(false);
    });
  });
}

(async () => {
  for (const item of list) {
    await check(item);
  }
})();
