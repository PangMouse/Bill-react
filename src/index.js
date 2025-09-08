import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import sum from "@/sum";

console.log(sum(5, 6));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
