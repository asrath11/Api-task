function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      res.status(err.statusCode || 500).json({
        status: 'failed',
        message: err.message || 'Internal Server Error',
      });
    });
  };
}

module.exports = asyncHandler;
