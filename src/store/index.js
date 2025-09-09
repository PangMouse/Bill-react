import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import billStore from "./module/billStore.js";

const store = configureStore({
  reducer: {
    bill: billStore,
  },
});

export default store;
