const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const statRoutes = require('./routes/stats');
const customizationRoutes = require('./routes/customization');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/customization', customizationRoutes);

// Health check endpoint
app.get('/api', (req, res) => res.json({ message: 'MKR Store API is running on Vercel!' }));
app.get('/', (req, res) => res.send('MKR Store API is running'));

// Only listen on port during local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// CRITICAL FOR VERCEL SERVERLESS
module.exports = app;