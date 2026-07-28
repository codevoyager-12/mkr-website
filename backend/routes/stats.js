const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET site stats
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM site_stats WHERE id = 1');
    if (rows.length === 0) {
      return res.json({
        satisfied_customers: '5000+',
        plates_manufactured: '10000+',
        average_rating: '4.9★',
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Fetch stats error:', err);
    res.status(500).json({ error: 'Failed to fetch site statistics' });
  }
});

// PUT update site stats (Admin)
router.put('/', async (req, res) => {
  try {
    const { satisfied_customers, plates_manufactured, average_rating } = req.body;

    if (!satisfied_customers || !plates_manufactured || !average_rating) {
      return res.status(400).json({ error: 'All stat fields are required.' });
    }

    await db.query(
      `INSERT INTO site_stats (id, satisfied_customers, plates_manufactured, average_rating)
       VALUES (1, ?, ?, ?)
       ON DUPLICATE KEY UPDATE satisfied_customers = ?, plates_manufactured = ?, average_rating = ?`,
      [
        satisfied_customers,
        plates_manufactured,
        average_rating,
        satisfied_customers,
        plates_manufactured,
        average_rating,
      ]
    );

    res.json({ message: 'Site statistics updated successfully' });
  } catch (err) {
    console.error('Update stats error:', err);
    res.status(500).json({ error: err.message || 'Failed to update site statistics' });
  }
});

module.exports = router;
