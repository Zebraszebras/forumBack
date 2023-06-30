const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  CREATE_ANSWER,
  GET_ALL_ANSWERS_FOR_QUESTION,
  GET_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
} = require("../controllers/answer");

// Routes for general answer-related operations
router.get("/answers/:questionId", GET_ALL_ANSWERS_FOR_QUESTION);
router.get("/answers/:id", GET_ANSWER);
router.put("/answers/:id", authMiddleware, UPDATE_ANSWER);
router.delete("/answers/:id", authMiddleware, DELETE_ANSWER);

// Route for answering a question
router.post("/answers/:questionId", authMiddleware, CREATE_ANSWER);

module.exports = router;
