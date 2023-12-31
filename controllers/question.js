const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");

const CREATE_QUESTION = async (req, res) => {
  try {
    const { question_text } = req.body;

    // Create a new question
    const question = new QuestionModel({
      question_text,
      asked_by: req.userId,
      answers_ids: [],
    });

    // Save the question to the database
    await question.save();

    //sitas klausimas yra uzduotas sito userio
    const user = await UserModel.findById(req.userId);
    user.asked_questions_ids.push(question.id);
    await user.save();

    res.status(200).json({ question });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ error: "Failed to create a question" });
  }
};

const DELETE_QUESTION = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting question:", id);

    // Find the question by ID and delete it
    const question = await QuestionModel.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    if (question.asked_by && question.asked_by.toString() !== req.userId) {
      return res
        .status(400)
        .json({ error: "Only owner can delete a question" });
    }
    await question.deleteOne();

    const user = await UserModel.findById(req.userId);
    const questionIndex = user.asked_questions_ids.indexOf(question._id);
    if (questionIndex > -1) {
      user.asked_questions_ids.splice(questionIndex, 1);
    } else {
      console.log(
        `Question ${id} not found in user ${user.name} asked questions ${user.asked_questions_ids}`
      );
    }

    await user.save();

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
};

const ANSWER_ONE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answerText = req.body.answer_text; // Get the answer text from the request body

    if (!answerText) {
      return res.status(400).json({ error: "Answer text is required" });
    }

    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = new AnswerModel({
      answer_text: answerText, // Assign the answer text to the answer model
      answered_by: req.userId,
      liked_by: [],
      disliked_by: [],
    });

    await answer.save();
    question.answers_ids.push(answer._id);
    await question.save();

    res.status(200).json({ answer });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ error: "Failed to answer a question" });
  }
};

const QUESTION = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await QuestionModel.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    console.log("ERR", error);
    res.status(500).json({ error: "Failed to get the question" });
  }
};

const ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    res.status(200).json({ questions });
  } catch (error) {
    console.log("ERR", err);
    res.status(500).json({ error: "Failed to get questions" });
  }
};

const QUESTION_ANSWERS = async (req, res) => {
  const { id } = req.params;
  const question = await QuestionModel.findById(id).populate("answers_ids");
  const answers = question.answers_ids.map((answer) => ({
    _id: answer._id,
    answer_text: answer.answer_text,
    answered_by: answer.answered_by,
  }));
  res.status(200).json(answers);
};

//noriu matyti prie klausimo visus jo atsakymus
const ANSWERED_QUESTIONS = async (req, res) => {
  try {
    const answeredQuestions = await QuestionModel.find({
      answered: true,
    }).populate("answers_ids");

    const formattedQuestions = answeredQuestions.map((question) => {
      const answers = question.answers_ids.map((answer) => answer.answer_text);
      return {
        question: question.question_text,
        answers: answers,
      };
    });

    console.log(formattedQuestions); // Log the formatted questions to the console

    res.status(200).json({ questions: formattedQuestions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get answered questions" });
  }
};

module.exports = {
  CREATE_QUESTION,
  DELETE_QUESTION,
  ANSWER_ONE_QUESTION,
  QUESTION,
  QUESTION_ANSWERS,
  ALL_QUESTIONS,
  ANSWERED_QUESTIONS,
};
