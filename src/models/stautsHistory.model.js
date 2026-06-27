const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ticket'
    },
    fromstatus: {
        type: String,
        enum: ['open', 'in_progress', 'resloved', 'closed', 'reopened'],
    },
    tostatus: {
        type: String,
        required: true,
        enum: ['open', 'in_progress', 'resloved', 'closed', 'reopened'],
        default: 'open'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
}, { timestamps: true });

module.exports = mongoose.model('statushistory', statusHistorySchema);