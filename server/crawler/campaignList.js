import axios from 'axios';
import fs from "fs";

const baseURL = 'https://service.wadiz.kr/api/search/funding';

const payload = {
    "startNum": 0,
    "order": "support", // 응원참여자순 정렬
    "limit": 20,
    "categoryCode": "",
    "endYn": ""
};
const headers = {
    'Referer': 'https://www.wadiz.kr/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Content-Type': 'application/json'
};

async function wadizFetch() {
    try {
        const resp = await axios.post(baseURL, payload, headers);
        const $ = resp.data.data.list;
        // const result = JSON.parse(resp.data);
        // console.log($);

        const result = $.map((el, i) => {
            return {
                campaignId: el.campaignId,
                categoryName: el.categoryName,
                title: el.title,
                totalBackedAmount: el.totalBackedAmount,
                photoUrl: el.photoUrl,
                nickName: el.nickName,
                coreMessage: el.coreMessage,
                whenOpen: el.whenOpen,
                achievementRate: el.achievementRate
            }
        });
        console.log(result)
        const jsonString = JSON.stringify(result);
        fs.writeFileSync("./res/campaignListOutput.json", jsonString);
        console.log('Success!');
    } catch (err) {
        console.log(err);
    }
};

async function main() {
    try {
        wadizFetch();
    } catch (err) {
        console.log(err);
    }
}

main();