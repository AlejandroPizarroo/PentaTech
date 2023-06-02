const express = require("express");
const router = express.Router();
const importDateSchema = require("../models/importDate")

router.get('/newest-update', async (req, res) => {
    try {
      const newestObject = await importDateSchema.findOne().sort({ date: -1 });
      res.json({date: newestObject.date});
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;

