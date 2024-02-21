const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../conf/db");
const fs = require("fs");
const Campaign = require("./Campaign");

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

// DB에 데이터 저장
async function saveDataToDB() {
  try {
    await connectDB();

    const jsonData = fs.readFileSync("../crawler/res/comment.json", "utf-8");
    const comments = JSON.parse(jsonData);

    await Comment.insertMany(comments);
    console.log("Data save to db successfully!");
  } catch (err) {
    console.error("Error saving data to db:", err);
  } finally {
    await disconnectDB();
  }
}

module.exports = Comment;

// 현재 파일이 직접 실행될 때만 아래 함수 실행되도록
if (require.main === module) {
  saveDataToDB();
}
