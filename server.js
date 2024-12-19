// server.js - Node.js backend
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route to handle form submission
app.post('/scrape', async (req, res) => {
    const { businessQuery, locationQuery, topN } = req.body;

    if (topN > 500) {
        return res.status(400).json({ error: 'Top N results must be less than or equal to 500.' });
    }

    try {
        // Replace with your actual Google Function API endpoint
        const apiUrl = process.env.URL;
        const response = await axios.post(apiUrl, { businessQuery, locationQuery, topN });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

// Start the server

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
