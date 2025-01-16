require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const { createMemeCoin, getTrendingCoins } = require('./services/memecoinService');

// Routes
app.post('/create', async (req, res) => {
    try {
        const data = await createMemeCoin(req.body);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/trending', async (req, res) => {
    try {
        const data = await getTrendingCoins();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
