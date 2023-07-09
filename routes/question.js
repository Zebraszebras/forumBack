const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  CREATE_QUESTION,
  DELETE_QUESTION,
  ANSWER_ONE_QUESTION,
  QUESTION,
  ALL_QUESTIONS,
  ANSWERED_QUESTIONS,
  QUESTION_ANSWERS,
} = require("../controllers/question");

router.post("/question", authMiddleware, CREATE_QUESTION);
router.delete("/question/:id", authMiddleware, DELETE_QUESTION);
router.post("/answer/:id", authMiddleware, ANSWER_ONE_QUESTION);
router.get("/questions/:id", QUESTION);
router.get("/questions/:id/answers", QUESTION_ANSWERS);
router.get("/questions", ALL_QUESTIONS);
router.get("/questions/answered", ANSWERED_QUESTIONS);

module.exports = router;
