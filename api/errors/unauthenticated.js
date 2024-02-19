const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message ? message : "Authentication invalid");
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
