const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question_text: { type: String, required: true, minlength: 7 },
  asked_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers_ids: [{ type: mongoose.ObjectId, required: true, ref: "Answer" }]
});

module.exports = mongoose.model("Question", questionSchema);
