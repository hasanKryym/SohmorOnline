const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  InternalServerError,
  UnauthenticatedError,
} = require("../errors");
const asyncWrapper = require("../middleware/async");
const Product = require("../models/Product");
const Shop = require("../models/Shop");

const addProduct = asyncWrapper(async (req, res) => {
  const { name, description, price, rating, offer, image, categories } =
    req.body;

  const shopId = req.user.role.shop;

  if (!shopId)
    throw new UnauthenticatedError("only admins have access to this route");

  if (!name || !description || !price || !image || !categories)
    throw new BadRequestError("Required fields are missing.");

  const productData = {
    name,
    description,
    price,
    rating,
    offer: offer || 0,
    image,
    categories,
  };

  const newProduct = await Product.addProduct(productData, shopId);

  return res
    .status(StatusCodes.CREATED)
    .json({ product: newProduct, success: true });
});

module.exports = {
  addProduct,
};
