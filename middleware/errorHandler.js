const { AppError } = require('./errors');

module.exports = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            error: err.isOperational ? undefined : err.stack
        });
    } else {
        res.status(500).json({
            message: 'An internal server error occurred.',
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};