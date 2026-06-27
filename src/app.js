const errorMiddleWare = require('./middlewares/error.middleware');
const apiRouter = require('./routes/index');
const path = require('path');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'uploads')));

app.use('/api/', apiRouter);

app.use(errorMiddleWare);
module.exports = app;