const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authentication");
const checkShopAdmin = require("../middleware/admins/authShopAdmin");
const { addProduct } = require("../controllers/product");

router.route("/manage/add").post(authenticate, checkShopAdmin, addProduct);

module.exports = router;
