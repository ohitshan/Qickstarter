import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const remindAsync: any = createAsyncThunk(
  "remind/remindAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/remind/remind`, body);
    return response.data;
  }
);
export const getRemindAsync: any = createAsyncThunk(
  "remind/getRemindAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/remind/getreminds`, body);
    return response.data;
  }
);

const initialState = {};

const remindSlice = createSlice({
  name: "remind",
  initialState,
  reducers: {},
  extraReducers: {
    [remindAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, remind: payload };
    },
    [getRemindAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, remind: payload };
    },
  },
});

export default remindSlice.reducer;
