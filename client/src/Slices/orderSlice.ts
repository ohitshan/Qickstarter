import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import userapi from "../api/userapi";

interface orderList {
  title?: string;
  price: number;
  number: number;
}

const orderSlice = createSlice({
  name: "order",
  initialState: [] as orderList[],
  reducers: {
    rewardPlusOrder: (state, action: PayloadAction<orderList>) => {
      const orderIndex = state.findIndex(
        (order) => order.title === action.payload.title
      );
      if (orderIndex !== -1) {
        state[orderIndex].number += 1;
      } else {
        state.push({ ...action.payload, number: 1 });
      }
    },
    rewardMinusOrder: (state, action: PayloadAction<orderList>) => {
      const orderIndex = state.findIndex(
        (order) => order.title === action.payload.title
      );
      if (orderIndex !== -1) {
        state[orderIndex].number -= 1;
      } else {
        state.push({ ...action.payload, number: 1 });
      }
    },
    removeFromOrder: (state, action: PayloadAction<orderList>) => {
      return state.filter((order) => order.title !== action.payload.title);
    },
    leavePage: (state, action: PayloadAction<orderList | []>) => {
      return [];
    },
  },
  extraReducers: {},
});

export const { rewardPlusOrder, rewardMinusOrder, removeFromOrder, leavePage } =
  orderSlice.actions;

export default orderSlice.reducer;
