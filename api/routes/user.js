const express = require("express");
const { updateCart, clearCart } = require("../controllers/user");
const router = express.Router();

router.route("/cart").patch(updateCart);
router.route("/cart/clear").delete(clearCart);

module.exports = router;
