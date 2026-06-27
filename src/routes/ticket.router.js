const ticketValidator = require('../validators/ticket.valdator');
const sanitize = require('../utils/sanitize');
const authMiddleware = require('../middlewares/auth.middleware');
const ticketController = require('../controllers/ticket.controller');
const express = require('express');
const router = express.Router();

const sanitizeMiddleware = (req, res, next) => {
    const reqBody = req.body;

    Object.entries(reqBody).forEach(([key, value]) => {
        req.body[key] = sanitize(value);
    });

    next();
}


router.post('/', authMiddleware.requireAuth, authMiddleware.requireClientAuth, sanitizeMiddleware, ticketValidator.ticketValidate, ticketController.addTicket)
router.patch('/:id/assign', authMiddleware.requireAuth, authMiddleware.requireAdminOrSupervisorAuth, ticketController.assignTicket)


module.exports = router;