const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  InternalServerError,
} = require("../errors/index");
const asyncWrapper = require("../middleware/async");
const Shop = require("../models/Shop");
const userPositions = require("../Enums/userEnums/positionsEnums");
const Domain = require("../models/Domain");

const addShop = asyncWrapper(async (req, res) => {
  const {
    name,
    description,
    image,
    products,
    sliderImages,
    address,
    phoneNumber,
    categories,
    domain,
  } = req.body;

  if (
    !name ||
    !description ||
    !address ||
    !phoneNumber ||
    !categories ||
    !domain
  ) {
    throw new BadRequestError("Required fields are missing.");
  }

  const shopData = {
    name,
    description,
    image,
    products,
    sliderImages,
    address,
    phoneNumber,
    categories,
    domain,
  };

  const newShop = await Shop.createShop(shopData);

  res
    .status(StatusCodes.CREATED)
    .json({ shop: newShop, success: true, message: "shop added successfully" });
});

const deleteShop = asyncWrapper(async (req, res) => {
  const { id: shopId } = req.params;

  if (!shopId) {
    throw new BadRequestError("Please provide the shop id");
  }

  const deletedShop = await Shop.deleteShop(shopId);

  if (deletedShop) {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Shop deleted successfully",
      deletedShop,
    });
  } else {
    throw new InternalServerError("Unable to delete shop");
  }
});

const getShops = asyncWrapper(async (req, res) => {
  const { search, domain } = req.query;
  const queryObject = {};

  if (domain) queryObject.domain = domain;
  if (search) {
    // Perform case-insensitive search across multiple fields
    queryObject.$or = [
      { name: { $regex: new RegExp(search, "i") } }, // The "i" flag makes the search case-insensitive, so it will match both upper and lower case letters
      { description: { $regex: new RegExp(search, "i") } },
      { categories: { $in: [new RegExp(search, "i")] } }, // Use $in operator for array field
    ];
  }

  const shops = await Shop.getShops(queryObject);

  if (!shops) throw new NotFoundError("no shops available");

  return res
    .status(StatusCodes.OK)
    .json({ success: true, shops, message: "shops retrieved successfully" });
});

const addDomain = asyncWrapper(async (req, res) => {
  const { name } = req.query;
  if (!name) throw new BadRequestError("please provide the name of the domain");

  const newDomain = await Domain.addDomain({ name });

  return res.status(StatusCodes.OK).json({ success: true, newDomain });
});

const getDomains = asyncWrapper(async (req, res) => {
  const domains = await Domain.getDomains();
  return res.status(StatusCodes.OK).json({
    success: true,
    domains,
    message: "domains retrieved successfully",
  });
});

module.exports = {
  addShop,
  deleteShop,
  getShops,
  addDomain,
  getDomains,
};
