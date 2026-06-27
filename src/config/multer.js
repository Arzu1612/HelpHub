const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'src', 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = 'attechment_' + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
})

module.exports = storage;