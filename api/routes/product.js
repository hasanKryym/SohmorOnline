const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authentication");
const checkShopAdmin = require("../middleware/admins/authShopAdmin");
const {
  addProduct,
  getProducts,
  deleteProducts,
  editProduct,
  addReview,
  getReview,
  getProductsById,
  getProductReviews,
} = require("../controllers/product");

router.route("/manage/add").post(authenticate, checkShopAdmin, addProduct);
router.route("/manage/edit").patch(authenticate, checkShopAdmin, editProduct);
router
  .route("/manage/delete")
  .delete(authenticate, checkShopAdmin, deleteProducts);
router.route("/").get(getProducts);
router.route("/getById").post(getProductsById);

router.route("/review").post(authenticate, addReview);
router.route("/review").get(authenticate, getReview);
router.route("/reviews").get(authenticate, getProductReviews);

module.exports = router;
