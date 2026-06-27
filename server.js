require('dotenv').config();

const app = require('./src/app');

const dbConnection = require('./src/config/db');

dbConnection();

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))