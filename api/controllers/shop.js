const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const asyncWrapper = require("../middleware/async");
const Shop = require("../models/Shop");
const userPositions = require("../Enums/userEnums/positionsEnums");

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
  } = req.body;

  if (!name || !description || !address || !phoneNumber || !categories) {
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

  // Handle any errors here
  // console.error(error);
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   success: false,
  //   message: "An error occurred while deleting the shop",
  // });
});

module.exports = {
  addShop,
  deleteShop,
};
