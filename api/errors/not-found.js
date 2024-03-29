const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message ? message : "Not found");
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
