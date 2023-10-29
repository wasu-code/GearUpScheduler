const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  date: Date,
  user_id: String,
  type: String,
});

module.exports = mongoose.model("Visit", visitSchema);
