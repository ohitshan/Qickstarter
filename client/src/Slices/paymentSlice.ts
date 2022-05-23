import likeapi from "../api/likeapi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getPaymentAsync: any = createAsyncThunk(
  "comment/getPaymentAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/payment/getPayments`, body);
    return response.data;
  }
);
export const getAllPaymentsAsync: any = createAsyncThunk(
  "payment/getAllPaymentsAsync",
  async (body: any) => {
    const response = await likeapi.post(`api/payment/getAllPayments`, body);
    return response.data;
  }
);

const initialState = {};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: {
    [getPaymentAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, payload };
    },
    [getAllPaymentsAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, backing: payload };
    },
  },
});

export default paymentSlice.reducer;
