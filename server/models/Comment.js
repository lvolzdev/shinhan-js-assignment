const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: { type: String, required: true },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  commentType: { type: String },
  userNickname: { type: String, required: true },
  whenCreated: { type: Date, default: Date.now },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
    default: null, // 댓글인 경우 null, 대댓글인 경우 참조 댓글의 _id
  },
  depth: { type: Number, required: true, default: 0 },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
