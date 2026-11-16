const http = require('http');

console.log('Testing video endpoint...');

// Test 1: GET Home Page
http.get('http://localhost:3000/', res => {
  console.log('1. Home Page Status:', res.statusCode);
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const hasText = data.includes('Premium Boxing Rings & MMA Cages built to BFI and World Boxing standards');
    const hasVideo = data.includes('hero-bg-video.mp4');
    console.log('   Contains updated text:', hasText);
    console.log('   Contains video tag:', hasVideo);
  });
});

// Test 2: GET Video with Range header
setTimeout(() => {
  const req = http.request({
    host: 'localhost',
    port: 3000,
    path: '/assets/hero-bg-video.mp4',
    headers: { 'Range': 'bytes=0-1000' }
  }, res => {
    console.log('2. Video Stream Range Status (expect 206):', res.statusCode);
    console.log('   Content-Range:', res.headers['content-range']);
    console.log('   Content-Type:', res.headers['content-type']);
    res.on('data', () => {});
    res.on('end', () => console.log('   Video chunk streamed successfully!'));
  });
  req.end();
}, 600);
