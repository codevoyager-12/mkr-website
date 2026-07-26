const express = require('express');
const router = express.Router();
const db = require('../config/db');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// GET all products, optional ?category=plate|apparel
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({ error: 'Name, price, and image are required.' });
    }

    const image_url = `/uploads/${req.file.filename}`;
    const sql = 'INSERT INTO products (name, category, description, price, image_url) VALUES (?, ?, ?, ?, ?)';

    const [result] = await db.query(sql, [name, category || 'plate', description, price, image_url]);

    res.status(201).json({
      id: result.insertId,
      name,
      category: category || 'plate',
      description,
      price,
      image_url,
    });
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product (with optional new image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const { id } = req.params;

    const [existingRows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (existingRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const existing = existingRows[0];

    let image_url = existing.image_url;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;

      const oldFilePath = path.join(__dirname, '..', existing.image_url);
      fs.unlink(oldFilePath, (err) => {
        if (err) console.warn('Could not delete old image:', err.message);
      });
    }

    const sql = `UPDATE products 
                 SET name = ?, category = ?, description = ?, price = ?, image_url = ? 
                 WHERE id = ?`;
    await db.query(sql, [
      name ?? existing.name,
      category ?? existing.category,
      description ?? existing.description,
      price ?? existing.price,
      image_url,
      id,
    ]);

    res.json({ id, name, category, description, price, image_url });
  } catch (err) {
    console.error('DB Update Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const filePath = path.join(__dirname, '..', rows[0].image_url);
    fs.unlink(filePath, (err) => {
      if (err) console.warn('Could not delete image file:', err.message);
    });

    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('DB Delete Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;