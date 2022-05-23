import { Category } from "../components/Project/First/ProjectCategory";
import { RootState } from "../app/store";
import postapi from "../api/postapi";

import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Writer } from "../components/types";

export interface UploadPost {
  title: { title: string; subtitle: string };
  category: Category;
  location: string;
  images: [];
  videos: [];
  funding: number;
  launch: string;
  duration: string;
  description: string;
  risk: string;
  reward: [];
  writer?: Writer;
  faq?: [];
  _id: string;
}

export const uploadPostAsync: any = createAsyncThunk(
  "posts/uploadPostAsync",
  async (post: UploadPost) => {
    const response = await postapi.post(`api/posts/uploadpost`, post);
    return response.data;
  }
);

export const getPostsAsync: any = createAsyncThunk(
  "posts/getPostsAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/getPosts`, post);
    return response.data;
  }
);

export const getBackedPostsAsync: any = createAsyncThunk(
  "posts/getBackedPostsAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/getBackedPost`, post);
    return response.data;
  }
);
export const getPostByIdAsync: any = createAsyncThunk(
  "posts/getPostByIdAsync",
  async (post: string) => {
    const response = await postapi.get(
      `api/posts/post_by_id?id=${post}&type=single`
    );
    return response.data;
  }
);

export const AskQuestionAsync: any = createAsyncThunk(
  "posts/AskQuestionAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/askQuestions`, post);
    return response.data;
  }
);

export const AnswerQuestionAsync: any = createAsyncThunk(
  "posts/AnswerQuestionAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/answerQuestions`, post);
    return response.data;
  }
);

export const upDatesAsync: any = createAsyncThunk(
  "posts/upDatesAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/updates`, post);
    return response.data;
  }
);
export const deleteUpdateAsync: any = createAsyncThunk(
  "posts/deleteUpdateAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/deleteUpdate`, post);
    return response.data;
  }
);
export const MyProjectAsync: any = createAsyncThunk(
  "posts/MyProjectAsync",
  async (post: any) => {
    const response = await postapi.post(`api/posts/myPosts`, post);
    return response.data;
  }
);

export const SearchEngineAsync: any = createAsyncThunk(
  "posts/SearchEngineAsync",
  async (post: any) => {
    console.log(post);
    const response = await postapi.get(
      `api/posts/searchEngine?title=${post.term}&main=${post.main}&sub=${post.sub}&location=${post.location}&type=single`
    );
    return response.data;
  }
);

export const SearchByCategoryAsync: any = createAsyncThunk(
  "posts/SearchByCategoryAsync",
  async (post: any) => {
    const response = await postapi.get(
      `api/posts/searchByCategory?main=${post.main}&type=single`
    );
    return response.data;
  }
);

export const SearchBySubCategoryAsync: any = createAsyncThunk(
  "posts/SearchBySubCategoryAsync",
  async (post: any) => {
    const response = await postapi.get(
      `api/posts/searchBySubCategory?sub=${post.sub}&type=single`
    );
    return response.data;
  }
);

const initialState = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [uploadPostAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, uploadpost: payload };
    },
    [getPostsAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, getpost: payload };
    },
    [getBackedPostsAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, getpost: payload };
    },
    [getPostByIdAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, getpost: payload };
    },
    [SearchEngineAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, getpost: payload };
    },
    [SearchByCategoryAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, getpost: payload };
    },
    [AskQuestionAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, askquestion: payload };
    },
    [upDatesAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, payload };
    },
    [deleteUpdateAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, payload };
    },
    [AnswerQuestionAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, getpost: [payload.postInfo] };
    },
    [MyProjectAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, myproject: [payload.posts] };
    },
  },
});

export default postSlice.reducer;
