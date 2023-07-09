const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  answer_text: { type: String, required: true, minlength: 3 },
  answered_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  disliked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Answer", answerSchema);

