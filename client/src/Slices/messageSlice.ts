import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const messageAsync: any = createAsyncThunk(
  "message/messageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/sendMessage`, body);
    return response.data;
  }
);

export const getAllMessageAsync: any = createAsyncThunk(
  "message/getAllMessageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/getAllMessage`, body);
    return response.data;
  }
);

export const getInboxMessageAsync: any = createAsyncThunk(
  "message/getInboxMessageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/getInboxMessage`, body);
    return response.data;
  }
);
export const getSentMessageAsync: any = createAsyncThunk(
  "message/getSentMessageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/getSentMessage`, body);
    return response.data;
  }
);
export const getUnreadMessageAsync: any = createAsyncThunk(
  "message/getUnreadMessageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/getUnreadMessage`, body);
    return response.data;
  }
);

export const readMessageAsync: any = createAsyncThunk(
  "message/readMessageAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/message/readMessage`, body);
    return response.data;
  }
);

const initialState = {};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: {
    [messageAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, message: payload };
    },
    [getAllMessageAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, message: payload };
    },
    [getInboxMessageAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, message: payload };
    },
  },
});

export default messageSlice.reducer;
