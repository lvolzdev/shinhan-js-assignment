import axios from "axios";
import fs from "fs";

const baseURL = "https://www.wadiz.kr/web/reward/api/comments/campaigns";

const payload = {
  page: 0,
  size: 20,
  commentGroupType: "CAMPAIGN",
  rewardCommentType: null,
};

async function getCampaignIds() {
  try {
    const jsonData = fs.readFileSync(
      "./crawler/res/campaignList.json",
      "utf-8"
    );
    const campaignId = JSON.parse(jsonData);

    const campaignIds = campaignId.map((camp) => camp.campaignId);
    return campaignIds;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function wadizCommentFetch() {
  try {
    const campaignIds = await getCampaignIds();
    let allResults = [];

    for (const campaignId of campaignIds) {
      const URL = `${baseURL}/${campaignId}`;
      const resp = await axios.get(URL, {
        params: payload,
      });
      const comments = resp.data.data.content;

      let results = [];
      for (const comment of comments) {
        const data = {
          body: comment.body,
          campaignId: comment.commonId,
          commentType: comment.commentType,
          userNickName: comment.nickName,
          whenCreated: comment.whenCreated,
          commentId: comment.boardId,
          hasReply: comment.hasReply,
          //   commentReplys: comment.commentReplys,
          depth: comment.depth, // 0
        };
        results.push(data);

        // 대댓글 -> url이 댓글과 같아서 또 요청할 필요가 없음
        if (comment.hasReply) {
          for (const reply of comment.commentReplys) {
            const replyData = {
              body: reply.body,
              campaignId: reply.commonId,
              commentType: comment.commentType, // 부모꺼
              userNickName: reply.nickName,
              whenCreated: reply.whenCreated,
              commentId: reply.parentBoardId, // 상위 댓글의 id
              depth: reply.depth, // 1
            };
            results.push(replyData);
          }
        }
      }
      allResults = allResults.concat(results);
      console.log(`Parsing: ${campaignId}`);
    }

    const jsonString = JSON.stringify(allResults);
    fs.writeFileSync("./crawler/res/comment.json", jsonString);
    console.log("Successful saving of comment json data!");
  } catch (err) {
    console.log("Failed to save comment json data");
    console.log(err);
  }
}

async function main() {
  try {
    await wadizCommentFetch();
  } catch (err) {
    console.log(err);
  }
}

main();
