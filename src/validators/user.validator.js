const { body } = require('express-validator');

module.exports.regiseterValidation = [
    body('name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('User is required!'),

    body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Valid Email is required!'),

    body('password')
    .trim()
    .notEmpty()
    .matches(/^(?=.*[a-zA-Z](?=.*[\d]))\S{8,}$/)
    .withMessage('Password must be a minimum of 8 characters with atleast one letter and one number'),
];

module.exports.loginValidation = [
    body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Valid Email is required!'),

    body('password')
    .trim()
    .notEmpty()
    .matches(/^(?=.*[a-zA-Z](?=.*[\d]))\S{8,}$/)
    .withMessage('Password must be a minimum of 8 characters with atleast one letter and one number'),
]