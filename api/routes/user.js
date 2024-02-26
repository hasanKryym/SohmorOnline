const express = require("express");
const { updateCart } = require("../controllers/user");
const router = express.Router();

router.route("/cart").patch(updateCart);

module.exports = router;
