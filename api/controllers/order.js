const asyncWrapper = require("../middleware/async");
const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");

const createOrder = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const { cart } = req.body;
  // Prepare the products array for the order
  const products = cart.map((item) => ({
    productId: item.product,
    shopId: item.shop,
    price: item.price, // Assuming the price is already included in the cart item
    quantity: item.quantity,
  }));

  const response = await Order.createOrder(userId, products);

  return res
    .status(
      response.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR
    )
    .json(response);
});

module.exports = { createOrder };
