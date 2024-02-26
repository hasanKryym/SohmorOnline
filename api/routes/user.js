const express = require("express");
const { updateCart } = require("../controllers/user");
const router = express.Router();

router.route("/cart").post(updateCart);

module.exports = router;
