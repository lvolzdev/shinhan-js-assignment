const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    campaignId: { type: Number, required: true },
    categoryName: { type: String, required: true },
    title: { type: String, required: true },
    totalBackedAmount: { type: Number, required: true }, // 총모집금액(인권)
    photoUrl: { type: String, required: true },
    nickname: { type: String, required: true },
    coreMessage: { type: String, required: true },
    whenOpen: { type: Date, required: true }, // 오픈일자
    achivementRate: { type: Number, required: true }, // 달성률
}, {
    timestamps: true
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;