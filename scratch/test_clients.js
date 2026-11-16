const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const bundle = fs.readFileSync(path.join(root, 'public/app.bundle.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const siteConfig = fs.readFileSync(path.join(root, 'src/config/siteConfig.js'), 'utf8');
const marquee = fs.readFileSync(path.join(root, 'src/components/ClientLogosMarquee.jsx'), 'utf8');

console.log('--- CHECKING CLIENT LOGOS ---');
console.log('bundle contains APEX COMBAT CLUB:', bundle.includes('APEX COMBAT CLUB'));
console.log('bundle contains SAI / Sports Authority:', bundle.includes('Sports Authority'));
console.log('index.html contains APEX COMBAT CLUB:', indexHtml.includes('APEX COMBAT CLUB'));
console.log('index.html contains SAI / Sports Authority:', indexHtml.includes('Sports Authority'));
console.log('marquee has shortName/fullName:', marquee.includes('shortName'));
console.log('siteConfig has APEX COMBAT CLUB:', siteConfig.includes('APEX COMBAT CLUB'));
