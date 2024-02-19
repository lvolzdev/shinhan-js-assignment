const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Comment = require('../models/Comment');

/**
 * /api/campaign GET - 캠페인 리스트 조회
 * /api/:campaignId GET - 해당 캠페인과 댓글 전부 조회
 * /api/:campaignId/comment POST - 해당 캠페인에 대한 댓글 달기 (댓글본문, 유저닉네임, 대댓글 깊이 필수)
 * /api/:campaignId/comment/:commentId POST - 해당 캠페인과 해당 댓글에 대한 대댓글 달기 (댓글본문, 유저닉네임, 대댓글 id, 대댓글 깊이 필수)
 */


router.get('/', (req, res, next)=>{ // /api/campaign
    Campaign
    .find({})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        console.log(err);
        next(err);
    })
});

router.get('/:campaignId', (req, res, next)=>{ // /api/:campaignId
    Campaign
    .find({
        _id: req.params.campaignId
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        next(err)
    })
});

router.post('/:campaignId/comment', (req, res, next)=>{ // /api/:campaignId/comment
    const _id = req.params.campaignId;
    const { body, userNickname, depth } = req.body;
    Comment
    .create({ 
        ...req.body
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        next(err);
    })
});

router.post('/:campaignId/comment/:commentId', (req, res, next)=>{ // /api/:campaignId/comment/:commentId
    // TODO
});


module.exports = router;