const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '../public/app.bundle.js'), 'utf8');
try {
  new Function('React', 'ReactDOM', 'window', 'document', 'localStorage', code);
  console.log('PARSED SUCCESSFULLY! 100% VALID JAVASCRIPT SYNTAX.');
} catch(e) {
  console.error('PARSE ERROR:', e.message);
  process.exit(1);
}
