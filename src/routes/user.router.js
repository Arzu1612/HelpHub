const userValidation = require('../validators/user.validator');
const sanitize = require('../utils/sanitize');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

const sanitizeMiddleware = (req, res, next) => {
    const reqBody = req.body;

    Object.entries(reqBody).forEach(([key, value]) => {
        if (key == 'name') {
            req.body[key] = sanitize(value);
        }
    });

    next();
}

router.post('/register', sanitizeMiddleware, userValidation.regiseterValidation, userController.registerUser);
router.post('/login', userValidation.loginValidation, userController.loginUser);
router.get('/me', authMiddleware.requireAuth, userController.authUserDetails);

module.exports = router;