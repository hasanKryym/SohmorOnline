const express = require("express");
const router = express.Router();

const {
  addShop,
  deleteShop,
  addDomain,
  getDomains,
  getShops,
  addCategory,
  getCategories,
  editShop,
  shopActivation,
  addRegistrationRequest,
  changeRequestStatus,
  getRegistrationRequests,
  editCategory,
} = require("../controllers/shop");
const authenticate = require("../middleware/authentication");
const checkSiteAdmin = require("../middleware/admins/authSiteAdmin");
const checkShopAdmin = require("../middleware/admins/authShopAdmin");

router.route("/manage/add").post(authenticate, checkSiteAdmin, addShop);
router.route("/manage/edit").patch(authenticate, checkShopAdmin, editShop);
router
  .route("/manage/delete/:id")
  .delete(authenticate, checkSiteAdmin, deleteShop);

router.route("/").get(getShops);

router.route("/manage/addDomain").post(authenticate, checkSiteAdmin, addDomain);
router.route("/domains").get(getDomains);

router
  .route("/manage/addCategory")
  .post(authenticate, checkShopAdmin, addCategory);
router.route("/categories").get(getCategories);
router
  .route("/manage/editCategory")
  .patch(authenticate, checkShopAdmin, editCategory);

router.route("/activation").patch(authenticate, checkSiteAdmin, shopActivation);

router
  .route("/requests")
  .post(addRegistrationRequest)
  .patch(authenticate, checkSiteAdmin, changeRequestStatus)
  .get(authenticate, checkSiteAdmin, getRegistrationRequests);

module.exports = router;
