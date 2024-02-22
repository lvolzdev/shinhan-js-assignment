const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const Comment = require("../models/Comment");

/**
 * /api/campaign GET - 캠페인 리스트 조회
 * /api/:campaignId GET - 해당 캠페인과 댓글 전부 조회
 * /api/:campaignId/comment POST - 해당 캠페인에 대한 댓글 달기 (댓글본문, 유저닉네임, 대댓글 깊이 필수)
 * /api/:campaignId/comment/:commentId POST - 해당 캠페인과 해당 댓글에 대한 대댓글 달기 (댓글본문, 유저닉네임, 대댓글 id, 대댓글 깊이 필수)
 */

router.get("/", async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({});
    res.send(campaigns);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// populate 사용 - objectId로 했을 때.
// router.get("/:campaignId", async (req, res, next) => {
//   try {
//     const campaignId = req.params.campaignId;
//     console.log("여기여기");
//     console.log(campaignId);

//     const campaigns = await Campaign.findOne({ campaignId: campaignId });
//     const comments = await Comment.find({
//       campaignId: campaignId,
//     }).populate("comments");
//     res.json(campaigns, comments);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });

router.get("/:campaignId", async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;

    const campaignWithComments = await Campaign.aggregate([
      {
        $match: { campaignId: campaignId },
      },
      {
        $lookup: {
          from: "comments",
          localField: "campaignId",
          foreignField: "campaignId",
          as: "comments",
        },
      },
    ]);
    res.json(campaignWithComments);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// TODO
// 댓글 달기
router.post("/:campaignId/comment", async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;

    const comment = await Comment.create({
      // Comment 모델 활용해서 댓글 생성
      ...req.body,
      campaignId,
      depth: 0,
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// TODO
// 대댓글 달기
// 127.0.0.1:4003/api/campaign/252320/comment/3555620
router.post("/:campaignId/comment/:commentId", async (req, res, next) => {
  try {
    const campaignId = req.params.campaignId;
    const commentId = req.params.commentId;

    const commentReply = await Comment.create({
      ...req.body,
      campaignId,
      commentId,
      depth: 1,
    });
    res.json(commentReply);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
