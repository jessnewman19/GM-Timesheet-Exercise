const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.StatusCode || 500;
  err.status = err.status || "ERROR";
  sendDevError(err, res);
  next();
};
