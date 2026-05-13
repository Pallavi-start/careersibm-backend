const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json({ msg: "Admin not found" });

  if (admin.password !== password)
    return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign({ id: admin._id }, "SECRET_KEY", {
    expiresIn: "1d"
  });

  res.json({ token });
});

module.exports = router;