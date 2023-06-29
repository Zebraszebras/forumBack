const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    SIGN_UP,
  LOG_IN,
  GET_NEW_JWT_TOKEN,
  JWT_REFRESH_TOKEN,
  ASK_NEW_QUESTION,
  DELETE_QUESTION,
  ANSWER_ONE_QUESTION,
  DELETE_ANSWER,
  LIKE_DISLIKE,
  ALL_QUESTIONS,
  ANSWERED_QUESTIONS,
  ANSWERS
} = require ("../controllers/user");

router.post("/signup", SIGN_UP);
router.post("/login", LOG_IN);
router.get("/token", GET_NEW_JWT_TOKEN);
router.get("/refresh-token", JWT_REFRESH_TOKEN);
router.post("/question", authMiddleware, ASK_NEW_QUESTION);
router.delete("/question/:id", authMiddleware, DELETE_QUESTION);
router.post("/answer/:questionId", authMiddleware, ANSWER_ONE_QUESTION);
router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.post("/like-dislike/:answerId", authMiddleware, LIKE_DISLIKE);
router.get("/questions", ALL_QUESTIONS);
router.get("/questions/answered", ANSWERED_QUESTIONS);
router.get("/answers/:questionId", ANSWERS);

module.exports = router;

/*
router.post("/user-signup", SIGN_UP);
router.post("/logIn", LOG_IN);
router.get("/new-jwt-token", authMiddleware, GET_NEW_JWT_TOKEN);
router.get("/jwt-refresh-token", authMiddleware, JWT_REFRESH_TOKEN);
router.get("/users", authMiddleware, GET_ALL_USERS);
router.get("/user/:id", authMiddleware, GET_USER_BY_ID);
router.get(
  "/alluserswithtickets/:userId",
  authMiddleware,
  GET_ALL_USERS_WITH_TICKETS
);
router.get(
  "/userwithticket/:userId",
  authMiddleware,
  GET_USER_BY_ID_WITH_TICKETS
);
router.post("/deposit", authMiddleware, DEPOSIT);

module.exports = router; */
