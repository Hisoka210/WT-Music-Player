const express = require('express');
const connectToDatabase = require('./connect'); // Import the connect function
const path = require('path'); // Import path module
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from the root directory

// Define a route to get data from MongoDB
app.get('/api/data', async (req, res) => {
    const client = await connectToDatabase(); // Call the connect function

    try {
        const database = client.db('sample_mflix'); // Replace with your database name
        const collection = database.collection('Users'); // Replace with your collection name
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        await client.close(); // Close the client connection
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the index.html file from the root directory
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});