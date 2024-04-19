const express = require("express");
const { createOrder, getOrders, updateOrder } = require("../controllers/order");
const checkShopAdmin = require("../middleware/admins/authShopAdmin");
const router = express.Router();

router
  .route("/")
  .post(createOrder)
  .get(getOrders)
  .patch(checkShopAdmin, updateOrder);

module.exports = router;
