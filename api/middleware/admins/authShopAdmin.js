const userPositions = require("../../Enums/userEnums/positionsEnums");
const { UnauthenticatedError, InternalServerError } = require("../../errors");

const checkShopAdmin = (req, res, next) => {
  try {
    if (req.user.role.position !== userPositions.SHOP_ADMIN)
      throw new UnauthenticatedError(
        "Only shop admin have access to this route"
      );

    next();
  } catch (error) {
    throw new UnauthenticatedError(error);
  }
};

module.exports = checkShopAdmin;
