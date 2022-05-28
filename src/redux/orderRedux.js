import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderQuantity: 0
  },
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
      state.orderQuantity = action.payload.reduce((accumulatedQuantity) => accumulatedQuantity + 1, 0);
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;