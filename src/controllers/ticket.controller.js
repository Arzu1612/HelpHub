const ticketModel = require('../models/ticket.model');
const userModel = require('../models/user.model');
const clientAccountModel = require('../models/clientAccount.model');
const statusHistoryModel = require('../models/stautsHistory.model');
const categoryModel = require('../models/category.model');
const ApiError = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');
const { validationResult } = require('express-validator');


module.exports.addTicket = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const reqBody = req.body;

    if (!errors.isEmpty()) {
        return next(new ApiError(400, 'INVALID_INFO', errors.array().map(error => error.msg).join(',')));
    }

    const userData = await clientAccountModel.findOne({ uid: req.user.id, verified: '1' }).populate('uid', 'active');

    if (userData == null || userData.length == 0 || userData.uid.active == '0') {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }


    let categoryObj = {
        name: req.body.category,
        type: 'ticket',
        active: '1'
    }
    const cateData = await categoryModel.create(categoryObj);


    let ticketObj = {
        caccountid: req.user.id,
        categoryid: cateData._id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: 'open'
    };

    const ticketData = await ticketModel.create(ticketObj);

    const historyObj = {
        ticketId: ticketObj._id,
        fromstatus: 'open',
        tostatus: 'open',
        uid: req.user.id
    };

    const statusHistoryData = await statusHistoryModel.create(historyObj);

    res.status(201).json({
        success: true,
        data: {
            ticketData
        }
    })
});

module.exports.assignTicket = asyncHandler(async(req, res, next) => {
    const agentId = req.body.agent;
    const ticketId = req.params.id;

    if (typeof ticketId == 'undefined' || typeof agentId == 'undefined' || ticketId == '' || agentId == '' || ticketId == ':id') {
        return next(new ApiError(400, 'INVSLID_INFO', 'Valid ticket and agent id required!'));
    }

    const userData = await userModel.findOne({ _id: agentId, active: '1' });

    if (userData == null) {
        return next(new ApiError(400, 'INVSLID_INFO', 'Valid agent id is required!'));
    }

    const isTicketExists = await ticketModel.findById(ticketId);
    if (isTicketExists == null) {
        return next(new ApiError(400, 'INVSLID_INFO', 'Valid ticket id is required!'));

    }

    const updateTicket = await ticketModel.findByIdAndUpdate(ticketId, { assignagent: agentId });

    const ticketData = await ticketModel.findById(ticketId);

    res.status(200).json({
        suceess: true,
        data: {
            ticketData
        }
    })
});





// module.exports.getTickets = asyncHandler(async(req, res, next) => {
//     let { page = 1, limit = 10, company, verify } = req.query;

//     page = parseInt(page);
//     limit = parseInt(limit);
//     const skip = (page - 1) * limit;


// });