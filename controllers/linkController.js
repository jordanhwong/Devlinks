const { parse } = require('dotenv');
const Link = require('../models/Link');
const validator = require('validator');

const createLink = async (req, res) => {
    try {
        const { title, url, tags } = req.body;
        if (!validator.isURL(url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        const newLink = new Link({ title, url, tags, userId: req.user.id });
        const saved = await newLink.save();
        res.status(201).json(saved);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }    
};

const getUserLinks = async (req, res) => {
    try {
        const { tag, title, page = 1, limit = 10 } = req.query;
        const filter = { userId: req.user.id };

        if (tag) {
            filter.tags = tag;
        }

        if (title) {
            filter.title = new RegExp(title, 'i');
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const [links, total] = await Promise.all([
            Link.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Link.countDocuments(filter)
        ]);

        res.json({
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            totalLinks: total,
            links
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteLink = async (req, res) => {
    try {
        const deleted = await Link.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Link not found or not authorized' });
        }

        res.json({ message: 'Link deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateLink = async (req, res) => {
    try {
        const { title, url, tags } = req.body;
        if (!validator.isURL(url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const updatedLink = await Link.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, url, tags },
            { new: true, runValidators: true }
        );

        if (!updatedLink) {
            return res.status(404).json({ error: 'Link not found or not authorized' });
        }

        res.json(updatedLink);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createLink, getUserLinks, deleteLink, updateLink };