const { StatusCodes } = require("http-status-codes");
const { BadRequestError, InternalServerError } = require("../errors");
const asyncWrapper = require("../middleware/async");
const Product = require("../models/Product");
const Shop = require("../models/Shop");

const addProduct = asyncWrapper(async (req, res) => {
  const { name, description, price, rating, offer, image } = req.body;

  const shopId = req.user.role.shop;

  if (!name || !description || !price || !image)
    throw new BadRequestError("Required fields are missing.");

  const productData = {
    name,
    description,
    price,
    rating,
    offer: offer || 0,
    image,
  };

  const newProduct = await Product.addProduct(productData, shopId);

  return res
    .status(StatusCodes.CREATED)
    .json({ product: newProduct, success: true });
});

module.exports = {
  addProduct,
};
