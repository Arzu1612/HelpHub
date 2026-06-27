const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { asyncHandler } = require('../utils/asyncHandler');
const clientAccountModel = require('../models/clientAccount.model');
const jwt = require('../utils/jwt');

const bcryptRound = process.env.BCRYPT_ROUND;

module.exports.registerUser = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const reqBody = req.body;
    if (!errors.isEmpty()) {
        return next(new ApiError(400, 'INVALID_INFO', errors.array().map(error => error.msg).join(',')));
    }

    const isUserExists = await userModel.findOne({ email: reqBody.email });
    if (isUserExists != null) {
        return next(new ApiError(409, 'INVALID_INFO', 'User already exists!'));
    }

    let role = 'C';
    if (typeof reqBody.admin_secret_key != 'undefined' && reqBody.admin_secret_key != null && reqBody.admin_secret_key === process.env.ADMIN_SECRET) {
        role = 'A';
    } else if (typeof reqBody.staff_registration != 'undefined' && reqBody.staff_registration === true) {
        if (typeof reqBody.invitation_code != 'string' || reqBody.invitation_code == null || (reqBody.invitation_code !== process.env.AGENT_INVITATION_CODE && reqBody.invitation_code !== process.env.SUPERVISOR_INVITATION_CODE)) {
            return next(new ApiError(400, 'INVALID_INFO', 'Valid invitation code required for internal staff registration!'));
        }
        if (reqBody.invitation_code === process.env.AGENT_INVITATION_CODE) {
            role = 'AG';
        } else {
            role = 'S';
        }
    }

    const userObj = {};
    userObj.name = reqBody.name;
    userObj.email = reqBody.email;
    userObj.password = await bcrypt.hash(reqBody.password, Number(bcryptRound));
    userObj.role = role;

    const regUser = await userModel.create(userObj);

    if (role == 'C') {
        const clientaccountObj = {
            uid: regUser._id,
            companyname: reqBody.name,
        }
        const regClientAccount = await clientAccountModel.create(clientaccountObj);
    }

    res.status(201).json({
        success: true,
        data: {
            id: regUser._id,
            name: regUser.name,
            email: regUser.email
        }
    });
});

module.exports.loginUser = asyncHandler(async(req, res, next) => {
    const errors = validationResult(req);
    const reqBody = req.body;
    if (!errors.isEmpty()) {
        return next(new ApiError(400, 'INVALID_INFO', errors.array().map(error => error.msg).join(',')));
    }

    const isUserExists = await userModel.findOne({ email: reqBody.email.toLowerCase(), active: '1' }).select('+password');

    if (isUserExists == null) {
        return next(new ApiError(401, 'UNAUTHORISED', 'Invalid email or password!'));
    }

    const isValidPass = await bcrypt.compare(reqBody.password, isUserExists.password);
    if (!isValidPass) {
        return next(new ApiError(401, 'UNAUTHORISED', 'Invalid email or password!'));
    }

    const token = jwt.genrateToken(isUserExists);
    res.status(200).json({
        success: true,
        data: {
            id: isUserExists._id,
            name: isUserExists.name,
            email: isUserExists.email,
            token: token
        }
    });
});

module.exports.authUserDetails = asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const UserDetails = await userModel.findById(userId);

    res.status(200).json({
        success: true,
        data: {
            id: UserDetails._id,
            name: UserDetails.name,
            email: UserDetails.email,
        }
    });
})