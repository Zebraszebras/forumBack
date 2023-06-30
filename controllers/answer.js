const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");

const CREATE_ANSWER = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { answer_text } = req.body;

    // Create a new answer
    const answer = new AnswerModel({
      answer_text,
    });

    // Save the answer to the database
    await answer.save();

    // Find the question and update its answers_id array
    const question = await QuestionModel.findById(questionId);
    question.answers_id.push(answer._id);
    await question.save();

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Failed to create an answer" });
  }
};


const GET_ALL_ANSWERS_FOR_QUESTION = async (req, res) => {
  try {
    const { questionId } = req.params;

    const answers = await Answer.find({ questionId });

    res.status(200).json(answers);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to retrieve answers" });
  }
};

// Controller for getting an answer by ID
const GET_ANSWER = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the answer by ID
    const answer = await AnswerModel.findById(id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Failed to get answer" });
  }
};

// Controller for updating an answer
const UPDATE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer_text } = req.body;

    // Find the answer by ID and update its answer_text
    const answer = await AnswerModel.findByIdAndUpdate(
      id,
      { answer_text },
      { new: true }
    );

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Failed to update answer" });
  }
};

// Controller for deleting an answer
const DELETE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the answer by ID and delete it
    const answer = await AnswerModel.findByIdAndDelete(id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete answer" });
  }
};

module.exports = {
  CREATE_ANSWER,
  GET_ALL_ANSWERS_FOR_QUESTION,
  GET_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
};
