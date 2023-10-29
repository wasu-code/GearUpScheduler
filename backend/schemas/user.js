const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
