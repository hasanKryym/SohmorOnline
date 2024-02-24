const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
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

  res.status(StatusCodes.CREATED).json({ shop: newShop, success: true });
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Unable to delete shop" });
  }
});

const addDomain = asyncWrapper(async (req, res) => {
  const { name } = req.query;
  if (!name) throw new BadRequestError("please provide the name of the domain");

  const newDomain = await Domain.addDomain({ name });

  return res.status(StatusCodes.OK).json({ success: true, newDomain });
});

const getDomains = asyncWrapper(async (req, res) => {
  const domains = await Domain.getDomains();
  return res.status(StatusCodes.OK).json({ success: true, domains });
});

module.exports = {
  addShop,
  deleteShop,
  addDomain,
  getDomains,
};
