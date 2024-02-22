import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "~/routes/layout";
import MainPage from "~/routes/page";
import CampaignPage from "~/routes/campaign/page";
import CampaignDetailPage from "~/routes/campaign/detail/page";

export const mainRoutes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        index: true,
      },
      {
        path: "/campaign",
        children: [
          {
            path: "",
            element: <CampaignPage />,
            index: true,
          },
          {
            path: ":campaignId",
            element: <CampaignDetailPage />,
            index: true,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;
