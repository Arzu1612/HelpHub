const { body } = require('express-validator');

module.exports.ticketValidate = [
    body('title')
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 150 })
    .withMessage('Title is required!'),

    body('category')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Valid category is required!'),

    body('priority')
    .trim()
    .notEmpty()
    .isLowercase()
    .isIn(['low', 'normal', 'high', 'urgent'])
    .withMessage('Valid Priority required!'),

    body('description')
    .trim()
    .notEmpty()
    .isLength({ min: 10 })
    .withMessage('Valid description required!'),
];