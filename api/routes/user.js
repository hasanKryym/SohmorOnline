const express = require("express");
const { updateCart, clearCart, editUserData } = require("../controllers/user");
const router = express.Router();

router.route("/cart").patch(updateCart);
router.route("/cart/clear").delete(clearCart);
router.route("/manage/edit").patch(editUserData);

module.exports = router;
