const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    caccountid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientaccount'
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    priority: {
        type: String,
        enum: ['low', 'normal', 'high', 'urgent'],
        default: 'normal',
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resloved', 'closed', 'reopened'],
        default: 'open'
    },
    assignagent: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('ticket', ticketSchema);