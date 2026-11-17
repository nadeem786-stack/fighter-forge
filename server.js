/**
 * FIGHTER FORGE — UNIFIED NODE SERVER WITH MONGODB ATLAS & SEO SSR PRE-RENDERING
 * 
 * Serves the React frontend + handles:
 * - /stories & /stories/:slug (Server-Side Pre-rendered HTML for Googlebot, GPTBot, ClaudeBot, etc.)
 * - /sitemap.xml, /robots.txt, /llms.txt (Search & AI Crawler protocols)
 * - /api/custom-enquiry (Boxing Rings & MMA Cages customization + uploaded files -> MongoDB Atlas)
 * - /api/gear-ideas (Home page co-create gear ideas -> MongoDB Atlas)
 * - /api/rentals & /api/enquiries (Local JSON storage)
 * - /api/mongo-status (Live MongoDB Atlas connection & collection status)
 * 
 * Run with: agy-node server.js or node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const envPath = path.join(ROOT_DIR, '.env');

// Load environment variables from .env if present
if (fs.existsSync(envPath)) {
  try {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
        if (key && !process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  } catch (e) {
    console.error('Error reading .env file:', e.message);
  }
}

const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(ROOT_DIR, 'backend', 'uploads');
const DATA_DIR = path.join(ROOT_DIR, 'backend', 'data');

// Stories & Pre-Rendering
const { stories, getStoryBySlug } = require('./src/data/storiesData.js');
const { renderStoriesListingHtml, renderStoryDetailHtml } = require('./backend/storyRenderer.js');

// MongoDB Atlas Configuration
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nadeemsiddique0303_db_user:Loveyourself786654@fighterforge.gaa4eew.mongodb.net/?retryWrites=true&w=majority";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "fighterforge";

let mongoClient = null;
let mongoDb = null;
let isMongoConnected = false;

// Ensure storage directories exist
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Safe uncaught exception handling
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.error('[UNHANDLED REJECTION]:', reason);
});

// Connect to MongoDB Atlas
async function initMongoDB() {
  try {
    const { MongoClient } = require('./node_modules/mongodb');
    mongoClient = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    await mongoClient.connect();
    mongoDb = mongoClient.db(MONGO_DB_NAME);
    isMongoConnected = true;
    console.log(`\n======================================================`);
    console.log(`🍃 MONGODB ATLAS CONNECTED SUCCESSFULLY!`);
    console.log(`   Cluster:  fighterforge.gaa4eew.mongodb.net`);
    console.log(`   Database: ${MONGO_DB_NAME}`);
    console.log(`   Target Collections: 'custom_quotes', 'gear_ideas'`);
    console.log(`======================================================\n`);
  } catch (err) {
    console.error(`⚠ MongoDB connection failed (${err.message}). Local fallback enabled.`);
    isMongoConnected = false;
  }
}

initMongoDB();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

function appendJsonRecord(filename, record) {
  const filepath = path.join(DATA_DIR, filename);
  let data = [];
  try {
    if (fs.existsSync(filepath)) {
      data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    data = [];
  }
  data.push(record);
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`Error saving local backup ${filename}:`, e.message);
  }
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // ==========================================
  // SEO & CRAWLER STATIC PROTOCOLS
  // ==========================================

  // GET /sitemap.xml
  if (req.method === 'GET' && (pathname === '/sitemap.xml' || pathname === '/sitemap')) {
    const sitemapPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
    fs.readFile(sitemapPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Sitemap not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // GET /robots.txt
  if (req.method === 'GET' && pathname === '/robots.txt') {
    const robotsPath = path.join(ROOT_DIR, 'public', 'robots.txt');
    fs.readFile(robotsPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Robots.txt not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // GET /llms.txt
  if (req.method === 'GET' && pathname === '/llms.txt') {
    const llmsPath = path.join(ROOT_DIR, 'public', 'llms.txt');
    fs.readFile(llmsPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('llms.txt not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // ==========================================
  // SEO SERVER-SIDE PRE-RENDERED STORIES
  // ==========================================

  // GET /stories (Stories Hub with Pre-rendered HTML)
  if (req.method === 'GET' && (pathname === '/stories' || pathname === '/stories/')) {
    try {
      const html = renderStoriesListingHtml();
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    } catch (renderErr) {
      console.error('Error rendering stories hub:', renderErr.message);
    }
  }

  // GET /stories/:slug (Individual Story with Full Pre-rendered Article & Schemas)
  if (req.method === 'GET' && pathname.startsWith('/stories/')) {
    const slug = pathname.replace(/^\/stories\//, '').replace(/\/+$/, '');
    const story = getStoryBySlug(slug);
    if (story) {
      try {
        const html = renderStoryDetailHtml(story);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      } catch (renderErr) {
        console.error(`Error rendering story ${slug}:`, renderErr.message);
      }
    }
  }

  // ==========================================
  // API ROUTING
  // ==========================================

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      brand: 'FIGHTER FORGE',
      server: 'Node Server with MongoDB Atlas & SEO SSR',
      mongoConnected: isMongoConnected
    }));
    return;
  }

  // GET /api/mongo-status
  if (req.method === 'GET' && pathname === '/api/mongo-status') {
    (async () => {
      let customQuotesCount = 0;
      let gearIdeasCount = 0;
      if (isMongoConnected && mongoDb) {
        try {
          customQuotesCount = await mongoDb.collection('custom_quotes').countDocuments();
          gearIdeasCount = await mongoDb.collection('gear_ideas').countDocuments();
        } catch (e) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        connected: isMongoConnected,
        database: MONGO_DB_NAME,
        collections: {
          custom_quotes: customQuotesCount,
          gear_ideas: gearIdeasCount
        }
      }));
    })();
    return;
  }

  // POST /api/custom-enquiry (Custom Build for Boxing Rings & MMA Cages with Uploads -> MongoDB Atlas)
  if (req.method === 'POST' && pathname === '/api/custom-enquiry') {
    const contentType = req.headers['content-type'] || '';
    
    // Multipart form data (User uploaded photos/logos + specs + customer details)
    if (contentType.includes('multipart/form-data')) {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        try {
          const buffer = Buffer.concat(chunks);
          const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          const boundary = boundaryMatch ? (boundaryMatch[1] || boundaryMatch[2]) : null;

          let type = 'ring';
          let specs = {};
          let customer = {};
          const uploadedUrls = [];
          const uploadedFiles = [];

          if (boundary) {
            const parts = buffer.toString('binary').split('--' + boundary);
            parts.forEach(part => {
              if (part.includes('name="type"')) {
                const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
                if (val) type = val.trim();
              }
              if (part.includes('name="specs"')) {
                const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
                try { specs = JSON.parse(val); } catch (e) {}
              }
              if (part.includes('name="customer"')) {
                const val = part.split('\r\n\r\n')[1]?.split('\r\n')[0];
                try { customer = JSON.parse(val); } catch (e) {}
              }
              if (part.includes('filename="')) {
                const filenameMatch = part.match(/filename="([^"]+)"/);
                if (filenameMatch) {
                  const origName = filenameMatch[1];
                  const cleanName = `${Date.now()}_${path.basename(origName)}`;
                  const fileHeaderEnd = part.indexOf('\r\n\r\n') + 4;
                  const fileContent = part.substring(fileHeaderEnd, part.length - 2);
                  const fileBuffer = Buffer.from(fileContent, 'binary');
                  
                  // Save to local uploads disk
                  const dest = path.join(UPLOADS_DIR, cleanName);
                  fs.writeFileSync(dest, fileBuffer);
                  
                  const fileExt = path.extname(origName).toLowerCase();
                  const mime = MIME_TYPES[fileExt] || 'application/octet-stream';
                  const base64Data = fileBuffer.toString('base64');
                  const dataUrl = `data:${mime};base64,${base64Data}`;

                  uploadedUrls.push(`/uploads/${cleanName}`);
                  uploadedFiles.push({
                    originalName: origName,
                    storedFilename: cleanName,
                    fileUrl: `/uploads/${cleanName}`,
                    contentType: mime,
                    sizeBytes: fileBuffer.length,
                    dataBase64: dataUrl
                  });
                }
              }
            });
          }

          const record = {
            id: 'custom_' + Date.now(),
            type,
            specs,
            customer,
            uploadedUrls,
            uploadedFiles,
            createdAt: new Date().toISOString(),
            source: 'Website Customizer Form'
          };

          // Save to MongoDB Atlas (custom_quotes collection)
          let mongoInsertedId = null;
          if (isMongoConnected && mongoDb) {
            try {
              const col = mongoDb.collection('custom_quotes');
              const insertRes = await col.insertOne(record);
              mongoInsertedId = insertRes.insertedId;
              console.log(`🍃 [MONGODB ATLAS] Saved custom quote for ${customer?.name || 'Client'} (${type}) with ID: ${mongoInsertedId}`);
            } catch (mErr) {
              console.error('⚠ Failed to save custom quote to MongoDB:', mErr.message);
            }
          }

          appendJsonRecord('custom_quotes.json', record);
          console.log(`[CUSTOM ARENA QUOTE SAVED] ${customer?.name} - ${type} (${uploadedFiles.length} files attached)`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            uploadedUrls,
            mongoSaved: !!mongoInsertedId,
            mongoId: mongoInsertedId,
            recordId: record.id
          }));
        } catch (err) {
          console.error('Error handling custom enquiry:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    // JSON fallback
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'custom_' + Date.now(),
          ...payload,
          createdAt: new Date().toISOString(),
          source: 'Website Customizer Form (JSON)'
        };

        let mongoInsertedId = null;
        if (isMongoConnected && mongoDb) {
          try {
            const col = mongoDb.collection('custom_quotes');
            const insertRes = await col.insertOne(record);
            mongoInsertedId = insertRes.insertedId;
            console.log(`🍃 [MONGODB ATLAS] Saved custom quote (JSON) with ID: ${mongoInsertedId}`);
          } catch (mErr) {
            console.error('⚠ Failed to save to MongoDB:', mErr.message);
          }
        }

        appendJsonRecord('custom_quotes.json', record);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, mongoSaved: !!mongoInsertedId, mongoId: mongoInsertedId, uploadedUrls: [] }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
      }
    });
    return;
  }

  // POST /api/gear-ideas (Home Page Gear Community Co-create Form -> MongoDB Atlas)
  if (req.method === 'POST' && pathname === '/api/gear-ideas') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'gear_' + Date.now(),
          gearCategory: payload.gearCategory || 'General Combat Gear',
          name: payload.name || '',
          phone: payload.phone || '',
          city: payload.city || '',
          idea: payload.idea || '',
          createdAt: new Date().toISOString(),
          source: 'Home Page Co-create Gear Community Form'
        };

        let mongoInsertedId = null;
        if (isMongoConnected && mongoDb) {
          try {
            const col = mongoDb.collection('gear_ideas');
            const insertRes = await col.insertOne(record);
            mongoInsertedId = insertRes.insertedId;
            console.log(`🍃 [MONGODB ATLAS] Saved Gear Idea from ${record.name} (${record.gearCategory}) with ID: ${mongoInsertedId}`);
          } catch (mErr) {
            console.error('⚠ Failed to save gear idea to MongoDB:', mErr.message);
          }
        }

        appendJsonRecord('gear_ideas.json', record);
        console.log(`[GEAR IDEA SAVED] Category: ${record.gearCategory} from ${record.name}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          mongoSaved: !!mongoInsertedId,
          mongoId: mongoInsertedId
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request' }));
      }
    });
    return;
  }

  // POST /api/enquiries (Cart Enquiry Checkout -> Local JSON Only)
  if (req.method === 'POST' && pathname === '/api/enquiries') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'enq_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          ...payload,
          savedAt: new Date().toISOString()
        };
        appendJsonRecord('enquiries.json', record);
        console.log(`[ENQUIRY SAVED] ${record.customer?.name} - ${record.items?.length} items`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, enquiry: record }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/enquiries (List Saved Enquiries)
  if (req.method === 'GET' && pathname === '/api/enquiries') {
    const filepath = path.join(DATA_DIR, 'enquiries.json');
    let items = [];
    if (fs.existsSync(filepath)) {
      try { items = JSON.parse(fs.readFileSync(filepath, 'utf8')); } catch (e) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ enquiries: items }));
    return;
  }

  // POST /api/rentals (Event Rental Enquiry -> Local JSON Only)
  if (req.method === 'POST' && pathname === '/api/rentals') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const record = {
          id: 'rental_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
          ...payload,
          savedAt: new Date().toISOString()
        };
        appendJsonRecord('rentals.json', record);
        console.log(`[RENTAL ENQUIRY SAVED] ${record.contactName || record.name || 'Client'} - ${record.eventType || 'Event Arena'}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, rental: record }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // GET /api/rentals (List Saved Rental Enquiries)
  if (req.method === 'GET' && pathname === '/api/rentals') {
    const filepath = path.join(DATA_DIR, 'rentals.json');
    let items = [];
    if (fs.existsSync(filepath)) {
      try { items = JSON.parse(fs.readFileSync(filepath, 'utf8')); } catch (e) {}
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rentals: items }));
    return;
  }

  // ==========================================
  // STATIC FILE SERVING & SPA FALLBACK
  // ==========================================
  let relativePath = pathname === '/' ? '/public/index.html' : pathname;

  if (relativePath.includes('/assets/')) {
    relativePath = '/public' + relativePath.substring(relativePath.indexOf('/assets/'));
  } else if (relativePath.startsWith('/uploads/')) {
    relativePath = '/backend' + relativePath;
  } else if (path.extname(relativePath) && fs.existsSync(path.join(ROOT_DIR, 'public', path.basename(relativePath)))) {
    relativePath = '/public/' + path.basename(relativePath);
  }

  let filePath = path.join(ROOT_DIR, relativePath);

  if (!path.extname(filePath)) {
    filePath = path.join(ROOT_DIR, 'public', 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(ROOT_DIR, 'public', 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Video streaming with Range header support for smooth playback
    if (ext === '.mp4') {
      const range = req.headers.range;
      const fileSize = stats.size;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        });
        fileStream.pipe(res);
        return;
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
          'Accept-Ranges': 'bytes'
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

// ==========================================
// LOCAL DEV: start server normally
// VERCEL: export handler for serverless
// ==========================================
if (require.main === module) {
  // Running directly with node server.js (local dev)
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🥊 FIGHTER FORGE RUNNING WITH MONGODB ATLAS & SSR STORIES`);
    console.log(`======================================================`);
    console.log(`Local PC:      http://localhost:${PORT}`);
    console.log(`Stories Hub:   http://localhost:${PORT}/stories`);
    console.log(`Sitemap:       http://localhost:${PORT}/sitemap.xml`);
    console.log(`Robots.txt:    http://localhost:${PORT}/robots.txt`);
    console.log(`LLMs.txt:      http://localhost:${PORT}/llms.txt`);
    console.log(`API Health:    http://localhost:${PORT}/api/health`);
    console.log(`Mongo Status:  http://localhost:${PORT}/api/mongo-status`);
    console.log(`======================================================\n`);
  });
} else {
  // Running on Vercel serverless — export the request handler
  module.exports = (req, res) => server.emit('request', req, res);
}
