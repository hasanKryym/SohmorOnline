const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, success: false });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ err, success: false });
};

module.exports = errorHandlerMiddleware;
