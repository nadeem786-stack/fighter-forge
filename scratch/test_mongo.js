const { MongoClient } = require('../node_modules/mongodb');

const uri = "mongodb+srv://nadeemsiddique0303_db_user:Loveyourself786@fighterforge.gaa4eew.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("✓ Successfully connected to MongoDB Atlas!");
    const db = client.db("fighterforge");
    const collections = await db.listCollections().toArray();
    console.log("Existing collections:", collections.map(c => c.name));
    
    // Test inserting a dummy ping and deleting it
    const testCol = db.collection('_test_connection');
    await testCol.insertOne({ ping: 'pong', time: new Date() });
    console.log("✓ Successfully inserted test document!");
    await testCol.drop();
    console.log("✓ Connection & write test verified!");
  } catch (err) {
    console.error("Connection error:", err.message);
  } finally {
    await client.close();
  }
}

run();
