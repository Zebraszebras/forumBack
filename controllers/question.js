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
      answers_ids:[]
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

/*// Controller for getting all questions
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
};*/

// Controller for deleting a question
const DELETE_QUESTION = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting question:", id);

    // Find the question by ID and delete it
    const question = await QuestionModel.findByIdAndDelete(id);
console.log("question", question);
    const user = await UserModel.findById(req.userId);
    const questionIndex = user.asked_questions_ids.indexOf(question._id);
    if (questionIndex > -1) {
      user.asked_questions_ids.splice(questionIndex, 1);
    }
    else {
      console.log(`Question ${id} not found in user ${user.name} asked questions ${user.asked_questions_ids}`);
    }

    await user.save();
    /*
    const user = await UserModel.findById(req.userId);
    user.asked_questions_ids.push(question.id);
    await user.save();
*/
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to delete question" });
  }
};


const ANSWER_ONE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findById(questionId);
    const answer = new AnswerModel ({
  answer_text,
  liked_by: [],
  disliked_by: []
    })
    await answer.save();

    const user = await UserModel.findById(req.userId);
    user.asked_questions_ids.push(question.id);
    await user.save();


    res.status(200).json({ answer});
  } catch (err) {
    console.log("ERR", err);
    res.status(500).json({ error: "Failed to answer a question" });
  }
    /*  
//sitas klausimas yra uzduotas sito userio
    const user = await UserModel.findById(req.userId);
    user.asked_questions_ids.push(question.id);
    await user.save();

};*/ 
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Answer the question
    await QuestionModel.findByIdAndUpdate(questionId, { answered: true });

    res.status(200).json({ message: "Question answered successfully" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "Failed to answer the question", error: error.message });
  }
};

module.exports = {
 CREATE_QUESTION,
 DELETE_QUESTION, 
 ANSWER_ONE_QUESTION
};
