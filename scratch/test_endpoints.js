const fs = require('fs');
const path = require('path');
const { MongoClient } = require('../node_modules/mongodb');

const uri = "mongodb+srv://nadeemsiddique0303_db_user:Loveyourself786@fighterforge.gaa4eew.mongodb.net/?retryWrites=true&w=majority";

async function verify() {
  console.log("Connecting to MongoDB Atlas to check collections...");
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("fighterforge");

  // 1. Simulate saving a custom ring quote with uploaded logo
  const customQuotesCol = db.collection('custom_quotes');
  const dummyQuote = {
    id: 'test_custom_' + Date.now(),
    type: 'ring',
    specs: {
      sizePreset: '20x20 ft',
      canvasColor: 'Matte Black',
      cornerPads: 'Classic Red/Blue/Black',
      ringElevation: 'Elevated 3ft Competition'
    },
    customer: {
      name: 'Test Coach Rahul',
      phone: '+91 9876543210',
      city: 'Mumbai',
      timeline: 'Within 30 Days',
      notes: 'Need BFI standard competition ring with custom center logo'
    },
    uploadedUrls: ['/uploads/sample_gym_logo.png'],
    uploadedFiles: [
      {
        originalName: 'gym_logo.png',
        storedFilename: 'sample_gym_logo.png',
        fileUrl: '/uploads/sample_gym_logo.png',
        contentType: 'image/png',
        sizeBytes: 1024,
        dataBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
      }
    ],
    createdAt: new Date().toISOString(),
    source: 'Fighter Forge Customizer Verification Test'
  };

  const res1 = await customQuotesCol.insertOne(dummyQuote);
  console.log("✓ Custom Quote inserted successfully! MongoDB ID:", res1.insertedId);

  // 2. Simulate saving a gear idea
  const gearIdeasCol = db.collection('gear_ideas');
  const dummyIdea = {
    id: 'test_gear_' + Date.now(),
    gearCategory: 'Pro Boxing Gloves (12-16oz)',
    name: 'Vikram Singh',
    phone: '+91 9123456789',
    city: 'Delhi',
    idea: 'Add metallic gold trim and multi-layer shock dispersing foam for heavy bag work.',
    createdAt: new Date().toISOString(),
    source: 'Home Page Co-create Gear Community Form'
  };

  const res2 = await gearIdeasCol.insertOne(dummyIdea);
  console.log("✓ Gear Idea inserted successfully! MongoDB ID:", res2.insertedId);

  // Read back from MongoDB Atlas
  const quotesCount = await customQuotesCol.countDocuments();
  const ideasCount = await gearIdeasCol.countDocuments();
  console.log(`\n========================================`);
  console.log(`📊 LIVE MONGODB ATLAS STATUS:`);
  console.log(`   Database: 'fighterforge'`);
  console.log(`   Collection 'custom_quotes': ${quotesCount} document(s)`);
  console.log(`   Collection 'gear_ideas':    ${ideasCount} document(s)`);
  console.log(`========================================\n`);

  const latestQuote = await customQuotesCol.findOne({ _id: res1.insertedId });
  console.log("Verified Latest Quote from Atlas:", {
    _id: latestQuote._id,
    customer: latestQuote.customer.name,
    type: latestQuote.type,
    fileCount: latestQuote.uploadedFiles.length,
    fileName: latestQuote.uploadedFiles[0].originalName
  });

  const latestIdea = await gearIdeasCol.findOne({ _id: res2.insertedId });
  console.log("Verified Latest Gear Idea from Atlas:", {
    _id: latestIdea._id,
    name: latestIdea.name,
    category: latestIdea.gearCategory,
    idea: latestIdea.idea
  });

  await client.close();
}

verify().catch(err => {
  console.error("Verification failed:", err);
  process.exit(1);
});
