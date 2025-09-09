import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./theme.css";
import sum from "@/sum";
import router from "./router";
import { RouterProvider } from "react-router-dom";

console.log(sum(5, 6));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 2. 路由绑定 */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
