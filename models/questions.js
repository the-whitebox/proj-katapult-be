const mongoose = require("mongoose");

const questionsSchema = mongoose.Schema({
  question: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  question_type: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("questions", questionsSchema);
