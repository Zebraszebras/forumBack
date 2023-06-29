const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
  name: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true, minlength: 8 },
  asked_questions_ids: { type: String, required: true, minlength: 8 }
});

module.exports = mongoose.model("User", userSchema);
