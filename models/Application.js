const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

  fullName: String,

  email: String,

  phone: String,

  address: String,

  skills: String,

  experience: String,

  resume: String,

  documents: [String]

});

module.exports =
mongoose.model(
  "Application",
  applicationSchema
);