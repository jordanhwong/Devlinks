const Link = require('../models/Link');

const createLink = async (req, res) => {
    try {
        const newLink = new Link({ ...req.body, userId: req.user.id });
        const saved = await newLink.save();
        res.status(201).json(saved);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }    
};

const getUserLinks = async (req, res) => {
    try {
        const links = await Link.find({ userId: req.user.id });
        res.json(links);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createLink, getUserLinks };