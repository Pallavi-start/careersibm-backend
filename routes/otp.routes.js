const router = require("express").Router();
const { verifyOtpUser } = require("../controllers/otp.controller");

router.post("/verify-otp-user", verifyOtpUser);

module.exports = router;