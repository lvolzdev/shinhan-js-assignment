import instance from "./base";

export async function fetchCampaignList() {
  const response = await instance.get("/campaign");
  return response.data;
}

export async function fetchCampaignDetail(campaignId) {
  const response = await instance.get(`/campaign/${campaignId}`);
  return response.data;
}

// TODO
// 댓글 작성, 대댓글 작성

export default {
  fetchCampaignList,
  fetchCampaignDetail,
};
