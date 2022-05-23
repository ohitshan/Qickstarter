import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const subscribeAsync: any = createAsyncThunk(
  "subscribe/subScribeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/subscribe/subscribe`, body);
    return response.data;
  }
);

export const unSubscribeAsync: any = createAsyncThunk(
  "subscribe/unSubscribeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/subscribe/unsubscribe`, body);
    return response.data;
  }
);

export const subscribedAsync: any = createAsyncThunk(
  "subscribe/subscribedAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/subscribe/subscribed`, body);
    return response.data;
  }
);

export const followerListAsync: any = createAsyncThunk(
  "subscribe/followerListAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/subscribe/followerLists`, body);
    return response.data;
  }
);

export const followingListAsync: any = createAsyncThunk(
  "subscribe/followingListAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/subscribe/followingLists`, body);
    return response.data;
  }
);

const initialState = {};

const subscribeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: {
    [subscribeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, subscribe: payload };
    },
    [unSubscribeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, subscribed: payload };
    },
    [subscribedAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, subscribed: payload };
    },
    [followerListAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, followerList: payload };
    },
    [followingListAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, followingList: payload };
    },
  },
});

export default subscribeSlice.reducer;
