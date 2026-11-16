const http = require('http');
const fs = require('fs');
const path = require('path');

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

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function verifyCornerPadsSlider() {
  console.log('====================================================');
  console.log('🥊 FIGHTER FORGE CORNER PADS MULTI-IMAGE VERIFICATION');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name} ${details ? '(' + details + ')' : ''}`);
      failed++;
    }
  }

  // 1. Verify siteConfig has 12 images
  const siteConfig = require('../src/config/siteConfig.js').siteConfig;
  const padAcc = siteConfig.boxingRingAccessories.find(a => a.id === 'acc-corner-pads-05');
  assert(padAcc && padAcc.images && padAcc.images.length === 12, `Corner Pads SKU has 12 images configured (Found: ${padAcc?.images?.length})`);

  // 2. Verify all 12 images return HTTP 200 and image mime type
  for (let i = 0; i < padAcc.images.length; i++) {
    const rawPath = padAcc.images[i].replace(/^\.\//, '/');
    const url = `http://localhost:3000${rawPath}`;
    try {
      const res = await getBinary(url);
      assert(res.statusCode === 200 && res.contentType.includes('image') && res.length > 5000,
        `Image ${i + 1}/12 loads via HTTP: ${path.basename(rawPath)} (Size: ${res.length}b, Type: ${res.contentType})`);
    } catch (e) {
      assert(false, `Image ${i + 1}/12 loads: ${rawPath}`, e.message);
    }
  }

  // 3. Verify bundle contains slider logic
  const bundle = fs.readFileSync(path.join(__dirname, '../public/app.bundle.js'), 'utf8');
  assert(bundle.includes('activeImgIndex') && bundle.includes('handleNextImage') && bundle.includes('handlePrevImage'),
    'Bundle contains interactive next/prev slider handlers');
  assert(bundle.includes('CLICK RIGHT'), 'Bundle contains click-right prompt hint');

  // 4. Verify Boxing Rings Page HTTP 200
  const pageRes = await get('http://localhost:3000/boxing-rings');
  assert(pageRes.statusCode === 200, 'Boxing Rings Page HTTP 200');

  console.log('\n====================================================');
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed === 0) {
    console.log('🌟 CORNER PADS 12-IMAGE SLIDER IS 100% OPERATIONAL!');
  } else {
    process.exit(1);
  }
}

verifyCornerPadsSlider().catch(console.error);
