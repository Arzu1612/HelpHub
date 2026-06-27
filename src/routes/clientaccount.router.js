const clientAccountRouter = require('../controllers/clientaccount.contoller');
const authMiddleware = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/', authMiddleware.requireAuth, authMiddleware.requireAdminAuth, clientAccountRouter.getClientAccount);
router.get('/:id', authMiddleware.requireAuth, authMiddleware.requireAdminOrClientAuth, clientAccountRouter.getClientAccountById);
router.patch('/:id/verify', authMiddleware.requireAuth, authMiddleware.requireAdminAuth, clientAccountRouter.verifyClientAccount);
router.patch('/:id/deactivate', authMiddleware.requireAuth, authMiddleware.requireAdminAuth, clientAccountRouter.deactivateClientAccount);

module.exports = router;