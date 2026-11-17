const fs = require('fs');
const p = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const mv = JSON.parse(fs.readFileSync('./node_modules/mongodb/package.json', 'utf8')).version;
p.dependencies = p.dependencies || {};
p.dependencies['mongodb'] = '^' + mv;
fs.writeFileSync('./package.json', JSON.stringify(p, null, 2));
console.log('Added mongodb@' + mv + ' to package.json dependencies');
