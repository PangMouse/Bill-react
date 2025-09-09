import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout";
import New from "@/pages/New";
import Year from "@/pages/Layout/Year";
import Month from "@/pages/Layout/Month";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Month></Month>,
      },
      {
        path: "year",
        element: <Year></Year>,
      },
    ],
  },
  {
    path: "/new",
    element: <New></New>,
  },
]);

export default router;
