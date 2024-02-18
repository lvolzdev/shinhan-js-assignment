const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: { type: String, required: true },
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    commentType: { type: String },
    userNickname: { type: String, required: true },
    whenCreated: { type: Date, default: Date.now() },
    // commentReplys: {},
    depth: { type: Number, required: true, default: 0 },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;