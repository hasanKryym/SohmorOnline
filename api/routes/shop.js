const express = require("express");
const router = express.Router();

const { addShop, deleteShop } = require("../controllers/shop");
const authenticate = require("../middleware/authentication");
const checkSiteAdmin = require("../middleware/admins/authSiteAdmin");

router.route("/manage/add").post(authenticate, checkSiteAdmin, addShop);
router
  .route("/manage/delete/:id")
  .delete(authenticate, checkSiteAdmin, deleteShop);

module.exports = router;
