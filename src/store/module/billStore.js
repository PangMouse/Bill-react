import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBills(state, action) {
      state.billList = action.payload;
    },
  },
});

// 异步请求部分
const { setBills } = billStore.actions;

const fetchBillList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:8888/ka");
    dispatch(setBills(res.data));
  };
};

export { fetchBillList };

const reducer = billStore.reducer;

export default reducer;
