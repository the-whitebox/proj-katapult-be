const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  fullname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  score: { type: Object },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", usersSchema);
