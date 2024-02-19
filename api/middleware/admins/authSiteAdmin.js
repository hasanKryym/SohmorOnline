const { userPositions } = require("../../Enums/userEnums/positionsEnums");

const checkSiteAdmin = (user) => {
  console.log(user);
  return user.role.position === userPositions.SITE_ADMIN;
};

module.exports = checkSiteAdmin;
