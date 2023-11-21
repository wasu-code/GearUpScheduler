const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  day: { type: String, required: true },
  startTime: { type: Number, required: true },
  duration: { type: Number, required: true },
  user_id: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Visit", visitSchema);
