import axios from 'axios';
import fs from "fs";

const baseURL = 'https://www.wadiz.kr/web/reward/api/comments/campaigns';

const payload = {
    "page": 0,
    "size": 20,
    "commentGroupType": "CAMPAIGN",
    "rewardCommentType": null,
};

async function getCampaignIds() {
    try {
        const jsonData = fs.readFileSync('./res/campaignListOutput.json', 'utf-8');
        const campaignId = JSON.parse(jsonData);

        const campaignIds = campaignId.map(camp => camp.campaignId);
        return campaignIds;
    } catch(err) {
        console.log(err);
        return [];
    }
};

async function wadizCommentFetch() {
    try {
        // campaign Id 가져오기
        const campaignIds = await getCampaignIds();
        let allResults = [];

        for (const campaignId of campaignIds) {
            const URL = `${baseURL}/${campaignId}`;
            const resp = await axios.get(URL, {
                params: payload
            });
            const $ = resp.data.data.content;
            // console.log($);

            const result = $.map((el, i) => {
                return {
                    body: el.body,
                    campaign: el.commontId, // TODO
                    commentType: el.commentType,
                    userNickName: el.nickName,
                    whenCreated: el.whenCreated,
                    commentReplys: el.commentReplys, // 대댓글
                    depth: el.depth, // 대댓글 깊이
                }
            });
            allResults = allResults.concat(result);
            console.log(`Parsing: ${campaignId}`);
        }
        const jsonString = JSON.stringify(allResults);
        fs.writeFileSync('./res/comment.json', jsonString);
        console.log('Successful saving of comment json data!');
    } catch (err) {
        console.log('Failed to save comment json data');
        console.log(err);
        return null;
    }
};

async function main() {
    try {
        wadizCommentFetch();
    } catch (err) {
        console.log(err);
    }
}

main();