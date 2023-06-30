const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
  answer_text: { type: String, required: true, minlength: 3 },
  gained_likes_number: { type: Number, required: true, default: 0 },
  liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  disliked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Answer", answerSchema);

