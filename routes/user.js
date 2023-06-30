const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  SIGN_UP,
  LOG_IN,
  ASK_NEW_QUESTION,
  DELETE_QUESTION,
  ANSWER_ONE_QUESTION,
  DELETE_ANSWER,
  LIKE_DISLIKE,
  ALL_QUESTIONS,
  ANSWERED_QUESTIONS,
  ANSWERS,
} = require("../controllers/user");

router.post("/signup", SIGN_UP);
router.post("/login", LOG_IN);
router.post("/question", authMiddleware, ASK_NEW_QUESTION);
router.delete("/question/:id", authMiddleware, DELETE_QUESTION);
router.post("/answer/:questionId", authMiddleware, ANSWER_ONE_QUESTION);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.post("/like-dislike/:answerId", authMiddleware, LIKE_DISLIKE);
router.get("/questions", authMiddleware, ALL_QUESTIONS);
router.get("/questions/answered", authMiddleware, ANSWERED_QUESTIONS);
router.get("/answers/:questionId", authMiddleware, ANSWERS);

module.exports = router;