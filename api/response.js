const response = (statusCode, jsonResponse) => {
  return res.status(statusCode).json(jsonResponse);
};

module.exports = response;
