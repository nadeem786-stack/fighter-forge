const { siteConfig } = require('../src/config/siteConfig.js');
const { stories } = require('../src/data/storiesData.js');
console.log('Boxing Ring Accessories count:', siteConfig.boxingRingAccessories.length);
siteConfig.boxingRingAccessories.forEach(a => console.log(' -', a.id, ':', a.title, ':', a.priceDisplay));
console.log('\nStories:');
stories.forEach(s => console.log(' -', s.slug, '->', s.heroImage));

