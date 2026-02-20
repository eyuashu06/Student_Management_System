// middleware/asyncHandler.js
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((error) => {
                console.error('Async Handler caught:', error);
                next(error);  // Pass error to Express error handler
            });
    };
};

module.exports = asyncHandler;