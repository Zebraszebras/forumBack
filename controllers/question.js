const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");


// Controller for creating a question
const createQuestion = async (req, res) => {
  try {
    const { question_text } = req.body;

    // Create a new question
    const question = new QuestionModel({
      question_text,
    });

    // Save the question to the database
    await question.save();

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a question" });
  }
};

// Controller for getting all questions
const getAllQuestions = async (req, res) => {
  try {
    // Find all questions
    const questions = await QuestionModel.find();

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: "Failed to get questions" });
  }
};

// Controller for getting a question by ID
const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the question by ID
    const question = await QuestionModel.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: "Failed to get question" });
  }
};

// Controller for updating a question
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_text } = req.body;

    // Find the question by ID and update its question_text
    const question = await QuestionModel.findByIdAndUpdate(
      id,
      { question_text },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ error: "Failed to update question" });
  }
};

// Controller for deleting a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the question by ID and delete it
    const question = await QuestionModel.findByIdAndDelete(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
