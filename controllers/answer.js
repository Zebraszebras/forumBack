const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const QuestionModel = require("../models/question");
const AnswerModel = require("../models/answer");

const LIKE = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find the answer by ID
    const answer = await AnswerModel.findById(id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked the answer
    if (answer.liked_by.includes(user._id)) {
      return res.status(400).json({ error: "User already liked the answer" });
    }

    // Add the user ID to the liked_by array
    answer.liked_by.push(user._id);

    // Save the updated answer
    await answer.save();

    console.log(`User ${user.name} liked the answer ${answer._id}`);

    res.status(200).json({ message: `User ${user.name} liked the answer` });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to like answer" });
  }
};

const DISLIKE = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Find the answer by ID
    const answer = await AnswerModel.findById(id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already disliked the answer
    if (answer.disliked_by.includes(user._id)) {
      return res
        .status(400)
        .json({ error: "User already disliked the answer" });
    }

    // Add the user ID to the disliked_by array
    answer.disliked_by.push(user._id);

    // Save the updated answer
    await answer.save();

    console.log(`User ${user.name} disliked the answer ${answer._id}`);

    res.status(200).json({ message: `User ${user.name} disliked the answer` });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to dislike answer" });
  }
};

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
    console.log("error", error);
    res.status(500).json({ error: "Failed to update answer" });
  }
};

const DELETE_ANSWER = async (req, res) => {
  try {
    const { id } = req.params.id;

    // Find the answer by ID and delete it

    const answer = await AnswerModel.findByIdAndDelete(id);

    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to delete answer" });
  }
};

module.exports = {
  LIKE,
  DISLIKE,
  UPDATE_ANSWER,
  DELETE_ANSWER,
};
