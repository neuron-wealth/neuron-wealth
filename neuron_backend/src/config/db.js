const mongoose = require("mongoose");
const env = require("./env");

let isConnected = false;

async function connectDB() {
  if (!env.mongoUri) {
    console.warn("[MongoDB] MONGO_URI is not defined. Falling back to the local JSON store.");
    return false;
  }

  try {
    const conn = await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
    isConnected = true;
    console.log(`[MongoDB] Connected to host: ${conn.connection.host} / database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error(`[MongoDB] Connection error: ${error.message}`);
    console.warn("[MongoDB] Tip: verify Network Access (IP allow list) in MongoDB Atlas.");
    return false;
  }
}

function hasDB() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = { connectDB, hasDB };
