const fs = require('fs');
const buf = fs.readFileSync('C:/Users/Nadeem/.gemini/antigravity/brain/1d6c31d3-482d-4bdc-bccc-0f097b6cd944/.user_uploaded/media_1794774838723_dc1f3a36.pdf');
const str = buf.toString('latin1');

// Look for 'SPACER' or 'METAL'
console.log('SPACER:', str.indexOf('SPACER'));
console.log('METAL:', str.indexOf('METAL'));
console.log('BUCKLE:', str.indexOf('BUCKLE'));
console.log('STAIRS:', str.indexOf('STAIRS'));
