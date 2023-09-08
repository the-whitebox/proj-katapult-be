const Questions = require("../models/questions");

const AddQuestions = async (req, res) => {
  try {
    const { question, category, question_type } = req.body;
    if (!question) {
      return res.status(400).json({ message: "question is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }
    if (!question_type) {
      return res.status(400).json({ message: "question_type is required" });
    }

    const existingQuestion = await Questions.findOne({ question });
    if (existingQuestion) {
      return res.status(400).json({ message: `${question} already added` });
    }

    const newQuestion = new Questions({
      question,
      category,
      question_type,
    });
    await newQuestion.save();

    res.status(201).json({
      data: newQuestion,
      message: "Question successfully added",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllQuestions = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const questions = await Questions.find(query);
    if (questions.length > 0) {
      res.status(200).json({
        data: questions,
      });
    } else {
      res.status(200).json({ message: "Questions not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  AddQuestions,
  GetAllQuestions,
};
