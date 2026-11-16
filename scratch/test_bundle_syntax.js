const fs = require('fs');
const path = require('path');

const bundle = fs.readFileSync(path.join(__dirname, '../public/app.bundle.jsx'), 'utf8');

// Let's check Babel compilation if babel standalone is installed or via basic line inspection
console.log('Bundle length:', bundle.length);

// Let's check if there are unescaped exports or module.exports or require statements in the bundle!
const lines = bundle.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('export ') || line.includes('import ') || line.includes('module.exports') || line.includes('require(')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
