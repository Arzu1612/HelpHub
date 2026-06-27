const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db Connected');
    } catch {
        console.log('Error while Db connection');
        process.exit(1);
    }
}

module.exports = dbConnection;