const asyncWrapper = require("../middleware/async");
const { StatusCodes } = require("http-status-codes");
const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrder = asyncWrapper(async (req, res) => {
  const userId = req.user.userId;
  const { cart } = req.body;

  try {
    // Fetch the price for each product in the cart
    const productsWithPrice = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found with id: ${item.product}`);
        }
        return {
          productId: product._id,
          shopId: item.shop,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );

    // Create the order
    const response = await Order.createOrder(userId, productsWithPrice);

    return res
      .status(
        response.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json(response);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = { createOrder };
