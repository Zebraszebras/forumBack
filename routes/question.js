const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createQuestion,  // Update the import statement to use createQuestion instead of CREATE_QUESTION
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/question");

router.post("/", authMiddleware, createQuestion);  // Update the function name here as well
router.get("/", getAllQuestions);
router.get("/:id", getQuestion);
router.put("/:id", authMiddleware, updateQuestion);
router.delete("/:id", authMiddleware, deleteQuestion);

module.exports = router;
