const router = require("express").Router();
const { loginUser } = require("../controllers/login.controller");

router.post("/login-user", loginUser);

module.exports = router;