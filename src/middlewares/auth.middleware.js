const jwt = require('../utils/jwt');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const clientAccountModel = require('../models/clientAccount.model');

const getHeaderToken = (req) => {
    const headertoken = req.headers.authorization;

    if (typeof headertoken !== 'string' || headertoken == null || !headertoken.startsWith('Bearer ')) {
        return null;
    }
    const token = headertoken.split(" ")[1];
    return token;
}

module.exports.requireAuth = async(req, res, next) => {
    const token = getHeaderToken(req);
    if (token == null) {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }
    const decode = jwt.verifyToken(token);
    req.user = decode;

    next();
};

module.exports.requireAdminAuth = (req, res, next) => {

    if (typeof req.user == 'undefined' || req.user == null || typeof req.user.role == 'undefined' || req.user.role == null || req.user.role != 'A') {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }
    next();
};

module.exports.requireAdminOrClientAuth = (req, res, next) => {

    if (typeof req.user == 'undefined' || req.user == null || typeof req.user.role == 'undefined' || req.user.role == null || (req.user.role != 'A' && req.user.role != 'C')) {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }
    next();
};

module.exports.requireClientAuth = async(req, res, next) => {

    if (typeof req.user == 'undefined' || req.user == null || typeof req.user.role == 'undefined' || req.user.role == null || req.user.role != 'C') {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }

    const userData = await clientAccountModel.findOne({ uid: req.user.id, verified: '1' }).populate('uid', 'active');

    if (userData == null || userData.length == 0 || userData.uid.active == '0') {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }
    next();
};

module.exports.requireAdminOrSupervisorAuth = (req, res, next) => {

    if (typeof req.user == 'undefined' || req.user == null || typeof req.user.role == 'undefined' || req.user.role == null || (req.user.role != 'A' && req.user.role != 'S')) {
        return next(new ApiError(403, 'FORBIDDEN', 'Authentication required!'));
    }
    next();
};