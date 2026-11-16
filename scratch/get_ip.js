const os = require('os');

const nets = os.networkInterfaces();
const results = [];

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
    if (net.family === familyV4Value && !net.internal) {
      results.push({ name, address: net.address });
    }
  }
}

console.log('--- LOCAL IP ADDRESSES ---');
results.forEach(r => console.log(`${r.name}: http://${r.address}:3000`));
