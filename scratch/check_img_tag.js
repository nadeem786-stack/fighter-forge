const http = require('http');

http.get('http://localhost:3000/stories/how-to-build-mma-cage', res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    const matches = b.match(/<img[^>]+>/g) || [];
    matches.forEach(m => {
      if (m.includes('story-')) console.log('IMG TAG:', m);
    });
  });
});
