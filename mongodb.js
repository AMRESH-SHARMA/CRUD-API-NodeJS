const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri ="mongodb://localhost:27017";
const databaseName = "DT";
const client = new MongoClient(uri);

async function dbConnect() {
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection("Events");
  }
  module.exports = dbConnect;
