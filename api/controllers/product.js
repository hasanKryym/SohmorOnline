const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  InternalServerError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const asyncWrapper = require("../middleware/async");
const Product = require("../models/Product");
const { Shop } = require("../models/Shop");

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

  return res.status(StatusCodes.CREATED).json({
    product: newProduct,
    success: true,
    message: "product added successfully",
  });
});

const editProduct = asyncWrapper(async (req, res) => {
  const { productId } = req.query;
  const { product } = req.body;
  if (!productId || !product)
    throw new BadRequestError(
      "Please provide the productId and the updated product"
    );

  const updatedProduct = await Product.editProduct(productId, product);

  return res.status(StatusCodes.OK).json({
    updatedProduct,
    message: "Product Updated successfully",
    success: true,
  });
});

const deleteProducts = asyncWrapper(async (req, res) => {
  const shopId = req.user.role.shop;
  if (!shopId)
    throw new UnauthenticatedError("only admins have access to this route");

  const { productsToDelete } = req.body;

  if (!productsToDelete)
    throw new BadRequestError("please provide the products to be deleted");

  const response = await Product.deleteProducts(productsToDelete, shopId);

  if (response) return res.status(StatusCodes.OK).json(response);
});

const getProducts = asyncWrapper(async (req, res) => {
  const {
    _id,
    search,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
    categories,
    shopId,
  } = req.query;

  const queryParameters = {};
  let products = [];
  if (shopId) {
    // Fetch products based on shopId
    const shop = await Shop.findById(shopId);
    if (!shop) {
      throw new NotFoundError("Shop not found");
    }

    queryParameters._id = { $in: shop.products };
    // If _id is provided, add it to the query parameters
    if (_id) {
      // Check if the specified _id exists in the shop's products array
      if (!shop.products.includes(_id)) {
        throw new NotFoundError("Product not found in this shop");
      }
      queryParameters._id = _id;
    }
  } else {
    throw new BadRequestError("please provide the shopId");
  }

  if (search) {
    queryParameters.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
    ];
  }

  if (minPrice || maxPrice) {
    queryParameters.price = {};
    if (minPrice) queryParameters.price.$gte = minPrice;
    if (maxPrice) queryParameters.price.$lte = maxPrice;
  }

  if (minRating || maxRating) {
    queryParameters.rating = {};
    if (minRating) queryParameters.rating.$gte = minRating;
    if (maxRating) queryParameters.rating.$lte = maxRating;
  }

  if (categories) {
    queryParameters.categories = { $in: categories };
  }
  products = await Product.getProducts(queryParameters);

  // Handle case where no products are found
  if (!products || products.length === 0) {
    throw new NotFoundError("No products found");
  }

  return res.status(StatusCodes.OK).json({
    success: true,
    products,
    message: "Products retrieved successfully",
  });
});

module.exports = {
  addProduct,
  getProducts,
  editProduct,
  deleteProducts,
};
