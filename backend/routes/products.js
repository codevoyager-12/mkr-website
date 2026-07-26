const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const db = require('../config/db');

// Memory storage for Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB file size limit
});

// Helper function to process uploaded image file
async function handleImageUpload(file) {
  if (!file) return null;

  const hasCloudinary =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (hasCloudinary) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
        api_key: process.env.CLOUDINARY_API_KEY.trim(),
        api_secret: process.env.CLOUDINARY_API_SECRET.trim(),
      });

      const cloudinaryUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'mkr_store_products' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });

      return cloudinaryUrl;
    } catch (cloudinaryErr) {
      console.warn(
        'Cloudinary upload failed (signature or credentials issue), falling back to Base64 Data URL:',
        cloudinaryErr.message
      );
    }
  }

  // Base64 fallback when Cloudinary is missing or fails signature check
  const mime = file.mimetype || 'image/png';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

// 1. GET All Products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.query('SELECT * FROM products ORDER BY id DESC');
    res.json(products);
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. GET Single Product by ID
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

// 3. POST New Product
router.post('/', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image file exceeds maximum allowed size of 3 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Image upload error.' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { name, price, description, category, image_url: textImageUrl } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Product name and price are required.' });
    }

    let image_url = '';
    if (req.file) {
      if (req.file.size > 3 * 1024 * 1024) {
        return res.status(400).json({ error: 'Image size must be less than 3 MB.' });
      }
      image_url = await handleImageUpload(req.file);
    } else if (textImageUrl && textImageUrl.trim() !== '') {
      image_url = textImageUrl.trim();
    } else {
      image_url = '/uploads/number_plate.png';
    }

    const [result] = await db.query(
      'INSERT INTO products (name, price, description, category, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, parseFloat(price) || 0, description || '', category || 'plate', image_url]
    );

    res.status(201).json({ message: 'Product added successfully', id: result.insertId });
  } catch (err) {
    console.error('Add product error:', err);
    res.status(500).json({ error: err.message || 'Failed to add product' });
  }
});

// 4. PUT Update Product
router.put('/:id', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Image file exceeds maximum allowed size of 3 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Image upload error.' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, image_url: textImageUrl } = req.body;

    let newImageUrl = null;
    if (req.file) {
      if (req.file.size > 3 * 1024 * 1024) {
        return res.status(400).json({ error: 'Image size must be less than 3 MB.' });
      }
      newImageUrl = await handleImageUpload(req.file);
    } else if (textImageUrl && textImageUrl.trim() !== '') {
      newImageUrl = textImageUrl.trim();
    }

    if (newImageUrl) {
      await db.query(
        'UPDATE products SET name = ?, price = ?, description = ?, category = ?, image_url = ? WHERE id = ?',
        [name, parseFloat(price) || 0, description || '', category || 'plate', newImageUrl, id]
      );
    } else {
      await db.query(
        'UPDATE products SET name = ?, price = ?, description = ?, category = ? WHERE id = ?',
        [name, parseFloat(price) || 0, description || '', category || 'plate', id]
      );
    }

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ error: err.message || 'Failed to update product' });
  }
});

// 5. DELETE Product
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: err.message || 'Failed to delete product' });
  }
});

module.exports = router;