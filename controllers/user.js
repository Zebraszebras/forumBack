const uniqid = require("uniqid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const AnswerModel = require("../models/answer");
const QuestionModel = require("../models/question");

function generateJWTToken(userId) {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "20d",
      algorithm: "HS256",
    }
  );
  return token;
}

function validateSignUp(name, email, password) {
  const validationErrors = [];

  if (!name) {
    validationErrors.push("Name is required");
  }
  if (!email) {
    validationErrors.push("Email is required");
  } else {
    if (email.indexOf("@") < 0) {
      validationErrors.push("@ symbol required in Email");
    }
  }
  if (!password) {
    validationErrors.push("Password is required");
  } else if (password.length < 6 || !/\d/.test(password)) {
    validationErrors.push(
      "Password must be at least 6 symbols length and contain at least 1 digit"
    );
  }

  return validationErrors;
}

module.exports.SIGN_UP = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validationErrors = validateSignUp(name, email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json(validationErrors);
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ response: "User already exists" });
    }

    const nameStartingUppercase = name.charAt(0).toUpperCase() + name.slice(1);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name: nameStartingUppercase,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const token = generateJWTToken(newUser.id);

    return res.status(200).json({
      response: "User created",
      jwt: token,
      userId: newUser.id,
    });
  } catch (err) {
    console.log("ERR", err);
    return res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.LOG_IN = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ response: "Bad data" });
    }

    bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
      if (isPasswordMatch) {
        const token = generateJWTToken(user.id);
        // Generate and handle refresh token if needed

        return res.status(200).json({
          response: "You logged in",
          jwt: token,
          refreshToken: refreshToken,
        });
      } else {
        return res.status(401).json({ response: "Bad data" });
      }
    });
  } catch (err) {
    console.log("ERR", err);
    return res.status(500).json({ response: "ERROR, please try later" });
  }
};

module.exports.ASK_NEW_QUESTION = async (req, res) => {
  try {
    const { question_text } = req.body;
    const questionId = uniqid();

    const newQuestion = new QuestionModel({
      question_text,
      id: questionId,
      answers_id: [],
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create question" });
  }
};

module.exports.DELETE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await QuestionModel.findByIdAndDelete(questionId);

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to delete question" });
  }
};

module.exports.ANSWER_ONE_QUESTION = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Answer the question (assuming AnswerModel is the correct model)
    await QuestionModel.findByIdAndUpdate(questionId, { answered: true });

    res.status(200).json({ message: "Question answered successfully" });
  } catch (error) {
    console.log("ERROR", error);
    res
      .status(500)
      .json({ message: "Failed to answer the question", error: error.message });
  }
};

module.exports.DELETE_ANSWER = async (req, res) => {
  try {
    const answerId = req.params.id;

    const answer = await AnswerModel.findById(answerId);
    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    await AnswerModel.findByIdAndDelete(answerId);

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to delete answer" });
  }
};

module.exports.LIKE_DISLIKE = async (req, res) => {
  try {
    const answerId = req.params.answerId;
    const userId = req.user.id;

    const update = req.body.isLiked
      ? { $addToSet: { liked_by: userId }, $inc: { gained_likes_number: 1 } }
      : {
          $addToSet: { disliked_by: userId },
          $inc: { gained_likes_number: -1 },
        };

    const updatedAnswer = await AnswerModel.findByIdAndUpdate(
      answerId,
      update,
      { new: true }
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({ message: "Like/dislike updated successfully" });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to update like/dislike" });
  }
};

module.exports.ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();

    res.status(200).json(questions);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to retrieve questions" });
  }
};

module.exports.ANSWERED_QUESTIONS = async (req, res) => {
  try {
    const answeredQuestions = await QuestionModel.find({
      answers_id: { $exists: true, $ne: [] },
    });

    res.status(200).json(answeredQuestions);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to retrieve answered questions" });
  }
};
module.exports.ANSWERS = async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Your logic to retrieve answers for the specified questionId
    // Example: Assuming you have a mongoose model for answers called "Answer"
    const answers = await AnswerModel.find({ questionId });

    res.status(200).json(answers);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ message: "Failed to retrieve answers" });
  }
};
