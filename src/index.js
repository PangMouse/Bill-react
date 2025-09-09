import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./theme.css";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 2. 路由绑定 */}
    <Provider store={store}>
      <RouterProvider RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
