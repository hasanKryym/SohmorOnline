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

module.exports = {
  updateCart,
  clearCart,
};
