const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
const authenticate = require("../middleware/authentication");
const { StatusCodes } = require("http-status-codes");

router.post("/register", register);
router.post("/login", login);
router.get("/", authenticate, async (req, res) => {
  const user_id = req.user;
  if (user_id)
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "user is autharized",
    });

  return res.status(StatusCodes.FORBIDDEN).json({
    success: false,
    message: "user is unautharized",
  });
});

module.exports = router;
