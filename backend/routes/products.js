const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const db = require('../config/db'); // Adjust path to your database configuration if needed

// 1. Configure Cloudinary using Vercel Environment Variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Set up Multer Storage to send uploads directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mkr_store_products', // Creates a folder in your Cloudinary Media Library
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage: storage });

// 3. GET All Products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 4. GET Single Product by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Fetch product error:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 5. POST New Product (Uploads image to Cloudinary)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Cloudinary automatically returns the live HTTPS URL in req.file.path
    const image_url = req.file ? req.file.path : '';

    const [result] = await db.query(
      'INSERT INTO products (name, price, description, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, category, image_url]
    );

    res.status(201).json({ message: 'Product added successfully', id: result.insertId });
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// 6. PUT Update Product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    if (req.file) {
      // If a new image was uploaded to Cloudinary
      const image_url = req.file.path;
      await db.query(
        'UPDATE products SET name = ?, price = ?, description = ?, category = ?, image_url = ? WHERE id = ?',
        [name, price, description, category, image_url, id]
      );
    } else {
      // If image was left unchanged
      await db.query(
        'UPDATE products SET name = ?, price = ?, description = ?, category = ? WHERE id = ?',
        [name, price, description, category, id]
      );
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 7. DELETE Product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;