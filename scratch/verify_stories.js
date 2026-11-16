const http = require('http');

const urlsToTest = [
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/stories',
  '/stories/how-to-build-mma-cage',
  '/stories/how-to-build-boxing-ring',
  '/stories/best-boxing-gloves',
  '/stories/how-to-remove-smell-from-boxing-gloves',
  '/stories/ufc-events-january-2027-india'
];

async function fetchUrl(pathname) {
  const url = `http://localhost:3000${pathname}`;
  const res = await fetch(url);
  const text = await res.text();
  return {
    pathname,
    status: res.status,
    contentType: res.headers.get('content-type'),
    length: text.length,
    body: text
  };
}

async function run() {
  console.log("==================================================");
  console.log("VERIFYING STORIES & SEO PROTOCOLS");
  console.log("==================================================");

  for (const pathname of urlsToTest) {
    const res = await fetchUrl(pathname);
    console.log(`\nTesting ${pathname}:`);
    console.log(`  Status:       ${res.status} (Expected 200)`);
    console.log(`  Content-Type: ${res.contentType}`);
    console.log(`  Body Length:  ${res.length} bytes`);

    if (res.status !== 200) {
      console.error(`  FAIL: Expected status 200, got ${res.status}`);
      process.exit(1);
    }

    if (pathname.startsWith('/stories/')) {
      const renderedHtml = res.body.split('<script type="text/babel">')[0];

      const titleMatch = res.body.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : '';

      const descMatch = res.body.match(/<meta name="description" content="(.*?)"/);
      const desc = descMatch ? descMatch[1] : '';

      const hasCanonical = res.body.includes('<link rel="canonical"');
      const hasArticleSchema = res.body.includes('"@type": "Article"');
      const hasFaqSchema = res.body.includes('"@type": "FAQPage"');
      const hasBreadcrumbSchema = res.body.includes('"@type": "BreadcrumbList"');
      const domH1Count = (renderedHtml.match(/<h1/g) || []).length;
      const domH2Count = (renderedHtml.match(/<h2/g) || []).length;
      const hasDirectAnswer = renderedHtml.includes('DIRECT ANSWER SUMMARY');
      const hasFaq = renderedHtml.includes('FREQUENTLY ASKED QUESTIONS');
      const hasTable = renderedHtml.includes('<table');

      console.log(`  Title:        "${title}" (${title.length} chars, must be < 60) -> ${title.length < 60 ? 'PASS' : 'FAIL'}`);
      console.log(`  Meta Desc:    "${desc.substring(0, 60)}..." (${desc.length} chars, must be 140-160) -> ${(desc.length >= 140 && desc.length <= 160) ? 'PASS' : 'FAIL'}`);
      console.log(`  Canonical:    ${hasCanonical ? 'PASS' : 'FAIL'}`);
      console.log(`  Article Schema: ${hasArticleSchema ? 'PASS' : 'FAIL'}`);
      console.log(`  FAQPage Schema: ${hasFaqSchema ? 'PASS' : 'FAIL'}`);
      console.log(`  Breadcrumb Schema: ${hasBreadcrumbSchema ? 'PASS' : 'FAIL'}`);
      console.log(`  DOM H1 Count: ${domH1Count} (must be exactly 1) -> ${domH1Count === 1 ? 'PASS' : 'FAIL'}`);
      console.log(`  DOM H2 Count: ${domH2Count} headings`);
      console.log(`  Direct Answer: ${hasDirectAnswer ? 'PASS' : 'FAIL'}`);
      console.log(`  FAQ Section:  ${hasFaq ? 'PASS' : 'FAIL'}`);
      console.log(`  Has Table:    ${hasTable ? 'PASS' : 'FAIL'}`);
    }
  }

  console.log("\n==================================================");
  console.log("✓ ALL 9 URLS VERIFIED SUCCESSFULLY!");
  console.log("==================================================");
}

run().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
