require('dotenv').config(); // Load environment variables
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Get the URI from .env

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
        return client; // Return the client for further use
    } catch (error) {
        console.error("Connection error:", error);
        throw error; // Propagate the error
    }
}

module.exports = connectToDatabase; // Export the function