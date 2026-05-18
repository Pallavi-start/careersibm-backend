const express = require("express");
const jwt = require("jsonwebtoken");

const Employee = require("../models/Employee");

const router = express.Router();

// Employee Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check Employee
    const employee = await Employee.findOne({
      email,
    });

    if (!employee) {
      return res.status(400).json({
        message: "Employee not found",
      });
    }

    // Simple Password Check
    if (password !== employee.password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: employee._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Response
    res.status(200).json({
      message: "Employee Login Success",
      token,
      employee,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;