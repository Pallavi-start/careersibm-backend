const router = require("express").Router();

const {
  sendOTP,
  verifyOTP,
} = require("../controllers/userController");

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOTP);

module.exports = router;