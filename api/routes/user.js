const express = require("express");
const {
  updateCart,
  clearCart,
  editUserData,
  editUserFav,
} = require("../controllers/user");
const router = express.Router();

router.route("/cart").patch(updateCart);
router.route("/cart/clear").delete(clearCart);
router.route("/manage/edit").patch(editUserData);
router.route("/fav").patch(editUserFav);

module.exports = router;
