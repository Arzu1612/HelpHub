module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERN_SERVER_ERROR';
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success: false,
        data: {
            code: code,
            message: message
        }
    })
};