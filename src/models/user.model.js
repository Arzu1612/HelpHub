const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['C', 'AG', 'S', 'A'],
        default: 'C',
    },
    active: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);