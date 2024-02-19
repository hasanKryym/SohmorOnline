const express = require("express");
const router = express.Router();

const { addShop } = require("../controllers/shop");
const authenticate = require("../middleware/authentication");

router.route("/manage/add").post(authenticate, addShop);

module.exports = router;
