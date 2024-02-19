const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const asyncWrapper = require("../middleware/async");
const Shop = require("../models/Shop");
const { checkSiteAdmin } = require("../middleware/admins/authSiteAdmin");
const userPositions = require("../Enums/userEnums/positionsEnums");

const addShop = asyncWrapper(async (req, res) => {
  //   if (!isSiteAdmin(req.user))
  //     throw new UnauthenticatedError(
  //       "Only site admins have access to this route"
  //     );

  if (req.user.role.position !== userPositions.SITE_ADMIN)
    throw new UnauthenticatedError(
      "Only site admins have access to this route"
    );

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

module.exports = {
  addShop,
};
