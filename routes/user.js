const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  SIGN_UP,
  LOG_IN
} = require("../controllers/user");

router.post("/signup", SIGN_UP);
router.post("/login", LOG_IN);

module.exports = router;