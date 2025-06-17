const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const newLink = new Link({ ...req.body, userId: req.user.id });
    const saved = await newLink.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.id });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;