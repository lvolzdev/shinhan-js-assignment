const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../conf/db");
const fs = require("fs");

const campaignSchema = new mongoose.Schema(
  {
    campaignId: { type: String, required: true },
    categoryName: { type: String, required: true },
    title: { type: String, required: true },
    totalBackedAmount: { type: Number, required: true }, // 총모집금액(인권)
    photoUrl: { type: String, required: true },
    nickName: { type: String, required: true },
    coreMessage: { type: String },
    whenOpen: { type: Date, required: true }, // 오픈일자
    achievementRate: { type: Number, required: true }, // 달성률
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

// DB에 데이터 저장
async function saveDataToDB() {
  try {
    await connectDB();

    const jsonData = fs.readFileSync(
      "../crawler/res/campaignList.json",
      "utf-8"
    );
    const campaigns = JSON.parse(jsonData);

    await Campaign.insertMany(campaigns);
    console.log("Data save to db successfully!");
  } catch (err) {
    console.error("Error saving data to db:", err);
  } finally {
    await disconnectDB();
  }
}

module.exports = Campaign;

// 현재 파일이 직접 실행될 때만 아래 함수 실행되도록
if (require.main === module) {
  saveDataToDB();
}
