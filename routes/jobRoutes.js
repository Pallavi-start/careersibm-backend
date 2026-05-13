const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// CREATE JOB
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 debug check

    const job = await Job.create(req.body);
    res.status(201).json(job);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;