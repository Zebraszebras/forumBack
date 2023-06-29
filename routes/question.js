
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    CREATE_QUESTION,
    GET_ALL_QUESTIONS,
    GET_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION

} = require ("../controllers/question");

router.post("/questions", authMiddleware, CREATE_QUESTION);
router.get("/questions", GET_ALL_QUESTIONS);
router.get("/questions/:id", GET_QUESTION);
router.put("/questions/:id", authMiddleware, UPDATE_QUESTION);
router.delete("/questions/:id", authMiddleware, DELETE_QUESTION);

module.exports = router;