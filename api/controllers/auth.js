const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const asyncWrapper = require("../middleware/async");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password, address, number } = req.body;
  if (!name || !email || !password || !address || !number)
    throw new BadRequestError("Please provide name, email, and password");

  const userData = { name, email, password, address, number };
  const { user, token } = await User.register(userData);

  return res.status(StatusCodes.CREATED).json({
    token,
    user: { id: user._id, name: user.name },
    success: true,
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("please provide email and password");

  const { user, token } = await User.login(email, password);

  return res.status(StatusCodes.OK).json({
    user,
    token,
    success: true,
    message: "Logged in successfully",
  });
});

module.exports = {
  register,
  login,
};
