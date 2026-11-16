const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '../public/app.bundle.js');
const bundle = fs.readFileSync(bundlePath, 'utf8');

const idx = bundle.indexOf('ring-elevated-pro-03');
const snippet = bundle.substring(idx, idx + 800);
console.log(snippet);
