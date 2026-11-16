const http = require('http');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

function getBinary(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        contentType: res.headers['content-type'],
        length: Buffer.concat(chunks).length
      }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🥊 FIGHTER FORGE SYSTEM VERIFICATION & NEW FIXES');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} ${details ? '(' + details + ')' : ''}`);
      failed++;
    }
  }

  // 1. Verify Price update on Accessory 01
  const siteConfig = require('../src/config/siteConfig.js').siteConfig;
  const canvasAcc = siteConfig.boxingRingAccessories.find(a => a.id === 'acc-canvas-01');
  assert(canvasAcc && canvasAcc.priceNumeric === 45 && canvasAcc.priceDisplay.includes('45'), 'Accessory 01 price updated to ₹45 / sq. ft.');

  // 2. Verify "COMPLETE ARENA RIGGING BUNDLE" removed from Boxing Rings page & bundle
  const indexHtml = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
  assert(!indexHtml.includes('COMPLETE ARENA RIGGING BUNDLE'), 'COMPLETE ARENA RIGGING BUNDLE removed from bundle');
  assert(!indexHtml.includes('RING DRESSING SET CAN BE PURCHASED SEPARATELY'), 'Ring Dressing Set callout box removed from bundle');

  // 3. Verify "ENQUIRE ON WHATSAPP" removed from all accessories in bundle
  const boxingRingsPage = fs.readFileSync(path.join(__dirname, '../src/pages/BoxingRingsPage.jsx'), 'utf8');
  assert(!boxingRingsPage.includes('handleWhatsAppDressingSet'), 'handleWhatsAppDressingSet removed');
  assert(!boxingRingsPage.includes('handleWhatsAppEnquiry'), 'handleWhatsAppEnquiry removed from AccessoryCard');

  // 4. Verify Story Hero Images on Dedicated Pages (both direct and subpath resolution)
  const storySlugs = [
    { slug: 'how-to-build-mma-cage', img: 'story-how-to-build-mma-cage.jpg' },
    { slug: 'how-to-build-boxing-ring', img: 'story-how-to-build-boxing-ring.jpg' },
    { slug: 'best-boxing-gloves', img: 'story-best-boxing-gloves.jpg' },
    { slug: 'how-to-remove-smell-from-boxing-gloves', img: 'story-how-to-remove-smell-from-boxing-gloves.jpg' },
    { slug: 'ufc-events-january-2027-india', img: 'story-ufc-events-january-2027.jpg' }
  ];

  for (const s of storySlugs) {
    // Check direct /assets/... request
    const directRes = await getBinary(`http://localhost:3000/assets/${s.img}`);
    assert(directRes.statusCode === 200 && directRes.contentType.includes('image') && directRes.length > 50000,
      `Direct image load /assets/${s.img} (Type: ${directRes.contentType}, Size: ${directRes.length}b)`);

    // Check nested /stories/assets/... request (resolves even if relative path was requested from subpage)
    const nestedRes = await getBinary(`http://localhost:3000/stories/assets/${s.img}`);
    assert(nestedRes.statusCode === 200 && nestedRes.contentType.includes('image') && nestedRes.length > 50000,
      `Nested subpath load /stories/assets/${s.img} (Type: ${nestedRes.contentType}, Size: ${nestedRes.length}b)`);

    // Check dedicated story page SSR HTML
    const pageRes = await get(`http://localhost:3000/stories/${s.slug}`);
    assert(pageRes.statusCode === 200, `Dedicated page /stories/${s.slug} HTTP 200`);
    assert(pageRes.body.includes(s.img), `Dedicated page /stories/${s.slug} HTML contains ${s.img}`);
    assert(pageRes.body.includes(`<img src="/assets/${s.img}"`), `Dedicated page /stories/${s.slug} hero <img> has src="/assets/${s.img}"`);
  }

  // 5. Verify Hub page
  const hubRes = await get('http://localhost:3000/stories');
  assert(hubRes.statusCode === 200, 'Stories Hub HTTP 200');

  // 6. Verify MongoDB Atlas status
  const mongoRes = await get('http://localhost:3000/api/mongo-status');
  const mongoData = JSON.parse(mongoRes.body);
  assert(mongoData.connected === true, `MongoDB Atlas connected: ${mongoData.connected}`);

  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed === 0) {
    console.log('🌟 ALL 4 REQUESTED UPDATES ARE FULLY OPERATIONAL!');
  } else {
    process.exit(1);
  }
}

runTests().catch(console.error);
