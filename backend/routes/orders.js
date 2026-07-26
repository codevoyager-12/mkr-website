const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { sendOrderNotification } = require('../utils/mailer');

// CREATE order
router.post('/', async (req, res) => {
  try {
    const { customer_name, phone, address, city, items, plate_text, plate_color, total } = req.body;

    if (!customer_name || !phone || !address || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await db.query(
      `INSERT INTO orders (customer_name, phone, address, city, items, plate_text, plate_color, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_name, phone, address, city || '', JSON.stringify(items), plate_text || null, plate_color || null, total]
    );

    const orderId = result.insertId;

    // Send email notification (don't block the response if it fails)
    try {
      await sendOrderNotification(req.body, orderId);
    } catch (mailErr) {
      console.error('Email failed to send:', mailErr.message);
    }

    res.status(201).json({ orderId, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET order by id (for confirmation page)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;