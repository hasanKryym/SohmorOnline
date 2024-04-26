const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const asyncWrapper = require("../middleware/async");
const User = require("../models/User");

const updateCart = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const { cart } = req.body;

  if (!userId || !cart) throw new BadRequestError("Please provide Cart data");

  const updatedCart = await User.updateCart(userId, cart);

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: "cart updated successfully", updatedCart });
});

const clearCart = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const response = await User.clearCart(userId);
  return res.status(StatusCodes.OK).json(response);
});

const editUserData = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const { userData } = req.body;
  if (!userData) throw new BadRequestError("please provide userData");

  const existingUserName = await User.findOne({
    name: userData.name,
  });
  if (existingUserName) {
    throw new BadRequestError("username already exists");
  }

  const response = await User.editUserData(userId, userData);
  return res.status(StatusCodes.OK).json(response);
});

const editUserFav = asyncWrapper(async (req, res) => {
  const { newFavorites } = req.body;
  const userId = req.user.userId;
  if (!newFavorites) throw new BadRequestError("please provide newFavorites");

  const response = await User.editFavorites(userId, newFavorites);
  return res
    .status(
      response.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR
    )
    .json(response);
});

module.exports = {
  updateCart,
  clearCart,
  editUserData,
  editUserFav,
};
