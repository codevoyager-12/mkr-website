const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const db = require('../config/db');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
});

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
          { folder: 'mkr_store_reviews' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });

      return cloudinaryUrl;
    } catch (cloudinaryErr) {
      console.warn('Cloudinary upload failed, falling back to Base64 Data URL:', cloudinaryErr.message);
    }
  }

  const mime = file.mimetype || 'image/png';
  const base64 = file.buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

// GET all customer reviews
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reviews ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Fetch reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch customer reviews' });
  }
});

// POST add customer review (Admin)
router.post('/', (req, res, next) => {
  upload.single('screenshot')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Screenshot file exceeds maximum allowed size of 3 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Image upload error.' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { customer_name, rating, review_text, screenshot_url: textUrl } = req.body;

    if (!customer_name || !review_text) {
      return res.status(400).json({ error: 'Customer name and review text are required.' });
    }

    let screenshot_url = '';
    if (req.file) {
      screenshot_url = await handleImageUpload(req.file);
    } else if (textUrl && textUrl.trim() !== '') {
      screenshot_url = textUrl.trim();
    }

    const [result] = await db.query(
      'INSERT INTO reviews (customer_name, rating, review_text, screenshot_url) VALUES (?, ?, ?, ?)',
      [customer_name, parseFloat(rating) || 5.0, review_text, screenshot_url]
    );

    res.status(201).json({ message: 'Review added successfully', id: result.insertId });
  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ error: err.message || 'Failed to add review' });
  }
});

// DELETE review by ID (Admin)
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Delete review error:', err);
    res.status(500).json({ error: err.message || 'Failed to delete review' });
  }
});

module.exports = router;
