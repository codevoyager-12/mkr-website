const express = require('express');
const router = express.Router();
const db = require('../config/db');

const DEFAULT_SETTINGS = {
  base_price: 3600,
  gel_finish_price: 500,
  plate_colors: [
    { name: "Yellow MKR Edition", bg: "#f1c40f", border: "#d4af37", text: "#000000" },
    { name: "Jet Black", bg: "#0d0d0d", border: "#d4af37", text: "#f1d97a" },
    { name: "Gold Edition", bg: "#d4af37", border: "#f5d76e", text: "#000000" },
    { name: "Classic White", bg: "#f5f5f5", border: "#cccccc", text: "#111111" },
    { name: "Silver Metallic", bg: "#c0c0c0", border: "#ffffff", text: "#000000" },
  ],
  text_colors: [
    { name: "Black", color: "#000000" },
    { name: "Gold", color: "#d4af37" },
    { name: "White", color: "#ffffff" },
    { name: "Silver", color: "#e0e0e0" },
    { name: "Red", color: "#d62828" },
  ],
  extra_options: [
    { id: "gel_finish", label: "3D Gel Acrylic Embossing", price: 500 }
  ],
};

// GET customization settings
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customization_settings WHERE id = 1');
    if (rows.length === 0) {
      return res.json(DEFAULT_SETTINGS);
    }
    const settings = rows[0];
    res.json({
      base_price: Number(settings.base_price) || 3600,
      gel_finish_price: Number(settings.gel_finish_price) || 500,
      plate_colors: typeof settings.plate_colors === 'string' ? JSON.parse(settings.plate_colors) : settings.plate_colors,
      text_colors: typeof settings.text_colors === 'string' ? JSON.parse(settings.text_colors) : settings.text_colors,
      extra_options: typeof settings.extra_options === 'string' ? JSON.parse(settings.extra_options) : settings.extra_options,
    });
  } catch (err) {
    console.error('Fetch customization settings error:', err);
    res.status(500).json({ error: 'Failed to fetch customization settings' });
  }
});

// PUT update customization settings (Admin)
router.put('/', async (req, res) => {
  try {
    const { base_price, gel_finish_price, plate_colors, text_colors, extra_options } = req.body;

    const basePriceNum = parseFloat(base_price) || 3600;
    const gelPriceNum = parseFloat(gel_finish_price) || 500;
    const plateColorsJson = JSON.stringify(plate_colors || DEFAULT_SETTINGS.plate_colors);
    const textColorsJson = JSON.stringify(text_colors || DEFAULT_SETTINGS.text_colors);
    const extraOptionsJson = JSON.stringify(extra_options || DEFAULT_SETTINGS.extra_options);

    await db.query(
      `INSERT INTO customization_settings (id, base_price, gel_finish_price, plate_colors, text_colors, extra_options)
       VALUES (1, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE base_price = ?, gel_finish_price = ?, plate_colors = ?, text_colors = ?, extra_options = ?`,
      [
        basePriceNum,
        gelPriceNum,
        plateColorsJson,
        textColorsJson,
        extraOptionsJson,
        basePriceNum,
        gelPriceNum,
        plateColorsJson,
        textColorsJson,
        extraOptionsJson,
      ]
    );

    res.json({ message: 'Customization settings updated successfully' });
  } catch (err) {
    console.error('Update customization settings error:', err);
    res.status(500).json({ error: err.message || 'Failed to update customization settings' });
  }
});

module.exports = router;
