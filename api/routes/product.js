const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authentication");
const checkShopAdmin = require("../middleware/admins/authShopAdmin");
const {
  addProduct,
  getProducts,
  deleteProducts,
} = require("../controllers/product");

router.route("/manage/add").post(authenticate, checkShopAdmin, addProduct);
router
  .route("/manage/delete")
  .delete(authenticate, checkShopAdmin, deleteProducts);
router.route("/").get(getProducts);

module.exports = router;
