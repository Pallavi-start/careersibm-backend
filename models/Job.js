const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  location: String,
  skills: String,
  company: String,
  salary: String,
  experience: String,
});

module.exports = mongoose.model("Job", jobSchema);