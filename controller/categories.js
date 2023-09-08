const Categories = require("../models/categories");

const AddCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) {
      return res.status(400).json({ message: "category_name is required" });
    }

    const existingCategory = await Categories.findOne({ category_name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: `${category_name} already added` });
    }

    const newCategory = new Categories({
      category_name,
    });
    await newCategory.save();

    res.status(201).json({
      data: newCategory,
      message: "Category successfully added",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find();

    if (categories.length > 0) {
      res.status(200).json({
        data: categories,
      });
    } else {
      res.status(200).json({ message: "Categories not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  AddCategory,
  GetAllCategories,
};
