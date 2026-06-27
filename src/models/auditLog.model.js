const mongoose = require('mongoose');

const auditLogsSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    action: {
        type: String,
        required: true,
    },
    entitytype: {
        type: String,
        required: true,
    },
    entityid: {
        type: Number,
        required: true
    },
    metadata: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('auditlog', auditLogsSchema);