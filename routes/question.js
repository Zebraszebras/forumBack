const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  CREATE_QUESTION, 
DELETE_QUESTION,
ANSWER_ONE_QUESTION,
  // ALL_QUESTIONS,
  // ANSWERED_QUESTIONS
} = require("../controllers/question");

 router.post("/question", authMiddleware, CREATE_QUESTION);
   router.delete("/question/:id", authMiddleware, DELETE_QUESTION);
    router.post("/answer/:questionId", authMiddleware, ANSWER_ONE_QUESTION);
// router.get("/questions", authMiddleware, ALL_QUESTIONS);
//  router.get("/questions/answered", authMiddleware, ANSWERED_QUESTIONS);

module.exports = router;
