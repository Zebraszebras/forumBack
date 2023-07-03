const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  DELETE_ANSWER,
  LIKE_DISLIKE,
  ANSWERS
} = require("../controllers/answer");

router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
//router.post("/like-dislike/:answerId", authMiddleware, LIKE_DISLIKE);
//router.get("/answers/:questionId", authMiddleware, ANSWERS);

module.exports = router;
