const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  category_name: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("categories", categoriesSchema);
