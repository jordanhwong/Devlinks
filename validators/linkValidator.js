const { body, query, param } = require('express-validator');

exports.createLinkValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('url')
        .notEmpty().withMessage('URL is required')
        .isURL({ require_protocol: true }).withMessage('URL must be valid')
];

exports.updateLinkValidator = [
    param('id').isMongoId().withMessage('Invalid link ID'),
    body('title').optional().isString(),
    body('url').optional().isURL().withMessage('Invalid URL'),
    body('tags').optional().isArray().withMessage('Tags must be an array')
];

exports.getLinksValidator = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
    query('tag').optional().isString(),
    query('title').optional().isString()
];

exports.deleteLinkValidator = [
    param('id').isMongoId().withMessage('Invalid link ID'),
];