const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question_text: { type: String, required: true, minlength: 7 },
  id: { type: String, required: true, minlength: 7 },
  answers_id: { type: String, required: true, minlength: 4 }
});

module.exports = mongoose.model("Question", questionSchema);
