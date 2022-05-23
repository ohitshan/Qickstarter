import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const likeAsync: any = createAsyncThunk(
  "like/likeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/like`, body);
    return response.data;
  }
);
export const dislikeAsync: any = createAsyncThunk(
  "like/dislikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/dislike`, body);
    return response.data;
  }
);
export const unLikeAsync: any = createAsyncThunk(
  "like/unLikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/unlike`, body);
    return response.data;
  }
);
export const unDisLikeAsync: any = createAsyncThunk(
  "like/unDisLikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/undislike`, body);
    return response.data;
  }
);

export const getLikeAsync: any = createAsyncThunk(
  "like/getLikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/getLikes`, body);
    return response.data;
  }
);

export const getAllmyLikesAsync: any = createAsyncThunk(
  "like/getAllmyLikesAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/getAllmyLikes`, body);
    return response.data;
  }
);

export const getMyLikeAsync: any = createAsyncThunk(
  "like/getMyLikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/getMyLikes`, body);
    return response.data;
  }
);
export const getMyDislikeAsync: any = createAsyncThunk(
  "like/getMyDislikeAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/like/getMyDislikes`, body);
    return response.data;
  }
);

const initialState = {};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: {
    [likeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, like: payload };
    },
    [dislikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, dislike: payload };
    },
    [getLikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, uploadpost: payload };
    },
    [getMyLikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, mylikes: payload };
    },
    [getMyDislikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, mydislikes: payload };
    },
    [unLikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, uploadpost: payload };
    },
    [unDisLikeAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, uploadpost: payload };
    },
  },
});

export default likeSlice.reducer;
