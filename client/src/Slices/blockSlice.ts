import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const blockAsync: any = createAsyncThunk(
  "block/blockAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/block/block`, body);
    return response.data;
  }
);

export const unBlockAsync: any = createAsyncThunk(
  "block/unBlockAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/block/unblock`, body);
    return response.data;
  }
);

export const blockedAsync: any = createAsyncThunk(
  "block/blockedAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/block/blocked`, body);
    return response.data;
  }
);

export const blockedListAsync: any = createAsyncThunk(
  "block/blockedListAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/block/blockedList`, body);
    return response.data;
  }
);

const initialState = {};

const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {},
  extraReducers: {
    [blockAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, block: payload };
    },
    [unBlockAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, unblock: payload };
    },
    [blockedAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, blocked: payload };
    },
    [blockedListAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, blockedList: payload };
    },
  },
});

export default blockSlice.reducer;
