const mongoose = require('mongoose');

const clientAccountSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companyname: {
        type: String,
        required: true,
    },
    billingreference: {
        type: String,
    },
    verified: {
        type: String,
        enum: ['1', '0'],
        default: '0'
    }
}, { timestamps: true });

module.exports = mongoose.model('clientaccount', clientAccountSchema);