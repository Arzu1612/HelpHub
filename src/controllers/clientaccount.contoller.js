const clientAccountModel = require('../models/clientAccount.model');
const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { asyncHandler } = require('../utils/asyncHandler');

module.exports.getClientAccount = asyncHandler(async(req, res, next) => {
    let { page = 1, limit = 10, company, verify } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    let filterObj = {};
    if (typeof company != 'undefined' && company != '') {
        filterObj.companyname = company;
    }
    if (typeof verified != 'undefined' && verified != '') {
        filterObj.verified = verify;
    }

    const clientAccountData = await clientAccountModel.find(filterObj).skip(skip).limit(limit).populate('uid', "name email").lean();

    if (clientAccountData == null) {
        res.status(204).json();
    } else {
        res.status(200).json({
            success: true,
            data: {
                clientAccountData
            }
        })
    }
});

module.exports.getClientAccountById = asyncHandler(async(req, res, next) => {
    const clientAccountId = req.params.id;

    let clientAccountData = null;
    if (req.user.role == 'C') {
        clientAccountData = await clientAccountModel.find({ _id: clientAccountId, uid: req.user.id }).populate('uid', "id name email").lean();
        if (clientAccountData == null || clientAccountData.length == 0) {
            return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
        }
    } else {
        clientAccountData = await clientAccountModel.findById(clientAccountId).populate('uid', "id name email").lean();
    }

    if (clientAccountData == null || clientAccountData.length == 0) {
        res.status(204).json();
    } else {
        res.status(200).json({
            success: true,
            data: {
                clientAccountData
            }
        })
    }
});

module.exports.verifyClientAccount = asyncHandler(async(req, res, next) => {
    const clientAccountId = req.params.id;

    const clientAccountData = await clientAccountModel.findOneAndUpdate({ _id: clientAccountId, verified: '0' }, { verified: '1' }, { new: true });

    if (clientAccountData == null) {
        res.status(204).json();
    } else {
        res.status(200).json({
            success: true,
            data: {
                clientAccountData
            }
        })
    }
});

module.exports.deactivateClientAccount = asyncHandler(async(req, res, next) => {
    const clientAccountId = req.params.id;

    const clientAccountData = await clientAccountModel.findOneAndUpdate({ _id: clientAccountId, verified: '1' }, { verified: '0' }, { new: true });


    if (clientAccountData == null) {
        res.status(204).json();
    } else {
        res.status(200).json({
            success: true,
            data: {
                clientAccountData
            }
        })
    }
});