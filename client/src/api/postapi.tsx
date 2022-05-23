import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

interface Post {
  name: string;
  email: string;
  password: string;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    posts: builder.mutation<void, Post>({
      query: (post) => ({
        url: "api/posts/register",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const { usePostsMutation } = postApi;

export default axios.create({
  baseURL: "http://localhost:3000/",
});
