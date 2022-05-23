import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    users: builder.mutation<void, User>({
      query: (user) => ({
        url: "api/users/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useUsersMutation } = userApi;

export default axios.create({
  baseURL: "http://localhost:3000/",
});
