import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const commentAsync: any = createAsyncThunk(
  "comment/commentAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/comment/comment`, body);
    return response.data;
  }
);

export const getAllMyCommentsAsync: any = createAsyncThunk(
  "comment/getAllMyCommentsAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/comment/getAllMyComments`, body);
    return response.data;
  }
);

export const getCommentsAsync: any = createAsyncThunk(
  "comment/getCommentsAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/comment/getComments`, body);
    return response.data;
  }
);
export const getReplyCommentsAsync: any = createAsyncThunk(
  "comment/getReplyCommentsAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/comment/getReplyComments`, body);
    return response.data;
  }
);

const initialState = {};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [commentAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, newComment: payload };
    },
    [getCommentsAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, uploadpost: payload };
    },
    [getReplyCommentsAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, getReplyComment: payload };
    },
  },
});

export default commentSlice.reducer;
