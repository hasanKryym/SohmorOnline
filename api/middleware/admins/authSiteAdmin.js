const userPositions = require("../../Enums/userEnums/positionsEnums");
const { UnauthenticatedError, InternalServerError } = require("../../errors");

const checkSiteAdmin = (req, res, next) => {
  try {
    if (req.user.role.position !== userPositions.SITE_ADMIN)
      throw new UnauthenticatedError(
        "only site admin have access to this route"
      );

    next();
  } catch (error) {
    throw new UnauthenticatedError(error);
  }
};

module.exports = checkSiteAdmin;
