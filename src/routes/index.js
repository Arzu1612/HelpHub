const userRouter = require('./user.router');
const clientAccountRouter = require('./clientaccount.router');
const tickerRouter = require('./ticket.router');
const express = require('express');
const router = express.Router();

router.use('/auth/', userRouter);
router.use('/tickets/', tickerRouter);
router.use('/clients/', clientAccountRouter);

module.exports = router;