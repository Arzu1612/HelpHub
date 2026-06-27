const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['ticket', 'article'],
        default: 'ticket'
    },
    active: {
        type: String,
        enum: ['1', '0'],
        default: '1'
    }
}, { timestamps: true });

module.exports = mongoose.model('category', categorySchema);