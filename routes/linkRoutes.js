const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const auth = require('../middleware/authMiddleware');
const linkController = require('../controllers/linkController');
const {
    createLinkValidator,
    updateLinkValidator,
    getLinksValidator,
    deleteLinkValidator
} = require('../validators/linkValidator');
const validate = require('../middleware/validate');

router.use(auth);

router.post('/', validate(createLinkValidator), linkController.createLink);

router.get('/', validate(getLinksValidator), linkController.getUserLinks);

router.delete('/:id', validate(deleteLinkValidator), linkController.deleteLink);

router.put('/:id', validate(updateLinkValidator), linkController.updateLink);

module.exports = router;