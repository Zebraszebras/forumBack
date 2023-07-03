const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  DELETE_ANSWER,
  LIKE,
  DISLIKE,
  UPDATE_ANSWER
} = require("../controllers/answer");

router.delete("/answer/:id", authMiddleware, DELETE_ANSWER);
router.put("/answer/:id/like", authMiddleware, LIKE);
router.put("/answer/:id/dislike", authMiddleware, DISLIKE);
router.put("/answer/:id", authMiddleware, UPDATE_ANSWER);

module.exports = router;
