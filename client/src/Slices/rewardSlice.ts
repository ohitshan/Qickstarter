import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface RewardList {
  title: string;
  amount: number;
  description: string;
  items: any[];
  contentmain: number;
  contentyes: number;
  shippingcountries: any[];
  delivery: any[];
  quantity: any[];
}

interface orderList {
  title: string;
  number: number;
}

const rewardSlice = createSlice({
  name: "reward",
  initialState: [] as RewardList[],
  reducers: {
    rewardList: (state, action: PayloadAction<RewardList>) => {
      return [...state, action.payload];
    },
    selectedReward: (state, action: PayloadAction<RewardList>) => {
      return [...state, action.payload];
    },
  },
  extraReducers: {},
});

export const { rewardList, selectedReward } = rewardSlice.actions;

export default rewardSlice.reducer;
