const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const auth = require('../middleware/authMiddleware');
const linkController = require('../controllers/linkController');

router.use(auth);

router.post('/', linkController.createLink);

router.get('/', linkController.getUserLinks);

module.exports = router;