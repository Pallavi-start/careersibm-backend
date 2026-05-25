const express = require("express");
const router = express.Router();

const auth = require("../middleware/userMiddleware");
const profileController = require("../controllers/profileController");

// CREATE or UPDATE PROFILE
router.post("/", auth, profileController.createProfile);

// GET LOGGED-IN USER PROFILE
router.get("/me", auth, profileController.getProfile);

module.exports = router;