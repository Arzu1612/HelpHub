const jwt = require('jsonwebtoken');

module.exports.genrateToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
    return token;
};

module.exports.verifyToken = (token) => {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
}