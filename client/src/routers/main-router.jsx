import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../routes/page";
import Layout from "~/routes/layout";

export const mainRoutes = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/campaign",
        element: <MainPage />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(mainRoutes);
export default router;
