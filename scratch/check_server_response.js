const http = require('http');

http.get('http://localhost:3000/boxing-rings', res => {
  console.log('HTTP Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('HTML Length:', data.length);
    console.log('Contains defaultSize 25.6x25.6:', data.includes('defaultSize: "25.6×25.6 ft Competition"'));
  });
}).on('error', err => {
  console.error('Request Error:', err.message);
});
