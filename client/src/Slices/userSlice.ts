import { RootState } from "../app/store";
import userapi from "../api/userapi";

import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}
export interface LoginUser {
  name: string;
  email: string;
  password: string;
}

export interface editUserProfile {
  name: string;
  image: [];
  biography: string;
  privacy: boolean;
  location: string;
  vanityURL: string;
  websitesList: [];
}

export interface AddressListForm {
  id: Date;
  country: string;
  addressNickname: string;
  fullName: string;
  addressMain: string;
  addressSub: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
}

export interface editAddressList {
  addressList: AddressListForm;
}

export const getUserByIdAsync: any = createAsyncThunk(
  "users/getUserByIdAsync",
  async (userId: string) => {
    const response = await userapi.get(
      `api/users/getUserInfoById?id=${userId}&type=single`
    );
    return response.data;
  }
);

export const registerUserAsync: any = createAsyncThunk(
  "users/registerUserAsync",
  async (user: RegisterUser) => {
    const response = await userapi.post(`api/users/register`, user);
    return response.data;
  }
);
export const editUserProfileAsync: any = createAsyncThunk(
  "users/editUserProfileAsync",
  async (user: editUserProfile) => {
    const response = await userapi.post(`api/users/editProfile`, user);
    return response.data;
  }
);

export const editAddressListAsync: any = createAsyncThunk(
  "users/editAddressListAsync",
  async (user: editAddressList) => {
    const response = await userapi.post(`api/users/editAddressList`, user);
    return response.data;
  }
);

export const deleteAddressAsync: any = createAsyncThunk(
  "users/deleteAddressAsync",
  async (user: editAddressList) => {
    const response = await userapi.post(`api/users/deleteAddress`, user);
    return response.data;
  }
);

export const changePasswordUserAsync: any = createAsyncThunk(
  "users/changePasswordUserAsync",
  async (user: { password: string; email: string }) => {
    const response = await userapi.post(`api/users/changePassword`, user);
    return response.data;
  }
);

export const loginUserAsync: any = createAsyncThunk(
  "users/loginUserAsync",
  async (user: LoginUser) => {
    const response = await userapi.post(`api/users/login`, user);
    return response.data;
  }
);

export const authUserAsync: any = createAsyncThunk(
  "users/authUserAsync",
  async () => {
    const response = await userapi.get(`api/users/auth`);
    return response.data;
  }
);
export const logoutUserAsync: any = createAsyncThunk(
  "users/logoutUserAsync",
  async () => {
    const response = await userapi.get(`api/users/logout`);
    console.log(response);
    return response.data;
  }
);

export const updateNotificationAsync: any = createAsyncThunk(
  "users/updateNotificationAsync",
  async (user) => {
    const response = await userapi.post(`api/users/updateNotification`, user);
    console.log(response);
    return response.data;
  }
);

export const addPaymentMethodsAsync: any = createAsyncThunk(
  "users/addPaymentMethodsAsync",
  async (user) => {
    const response = await userapi.post(`api/users/addPaymentMethods`, user);
    console.log(response);
    return response.data;
  }
);

export const pledgeSummeryAsync: any = createAsyncThunk(
  "users/pledgeSummeryAsync",
  async (user) => {
    const response = await userapi.post(`api/users/pledgeSummary`, user);
    console.log(response);
    return response.data;
  }
);
export const onSuccessBackingAsync: any = createAsyncThunk(
  "users/onSuccessBackingAsync",
  async (user) => {
    const response = await userapi.post(`api/users/onSuccessBacking`, user);
    console.log(response);
    return response.data;
  }
);
export const onRemindMeAsync: any = createAsyncThunk(
  "users/onRemindMeAsync",
  async (user) => {
    const response = await userapi.post(`api/users/addToFavorites`, user);
    console.log(response);
    return response.data;
  }
);
export const getRemindMeAsync: any = createAsyncThunk(
  "users/getRemindMeAsync",
  async (user) => {
    const response = await userapi.post(`api/users/getFavorites`, user);
    console.log(response);
    return response.data;
  }
);

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUserAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, registerUser: payload };
    },
    [editUserProfileAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, authUser: payload?.user };
    },
    [editAddressListAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, authUser: payload?.user };
    },
    [changePasswordUserAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, registerUser: payload };
    },
    [loginUserAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, loginUser: payload };
    },
    [authUserAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      return { ...state, authUser: payload };
    },
    [logoutUserAsync.fulfilled]: (state: any, { payload }: PayloadAction) => {
      console.log("fulfiilled", payload);
      return { ...state, authUser: payload };
    },
    [pledgeSummeryAsync.fulfilled]: (state: any, { payload }: any) => {
      console.log(payload);
      return { ...state, authUser: payload.userInfo };
    },
    [updateNotificationAsync.fulfilled]: (state: any, { payload }: any) => {
      console.log(payload);
      return { ...state, authUser: payload.userInfo };
    },
    [addPaymentMethodsAsync.fulfilled]: (state: any, { payload }: any) => {
      console.log(payload);
      return { ...state, authUser: payload.userInfo };
    },
    [onRemindMeAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, authUser: payload.userInfo };
    },
    [getRemindMeAsync.fulfilled]: (state: any, { payload }: any) => {
      return { ...state, authUser: payload.userInfo };
    },
    [onSuccessBackingAsync.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      return { ...state, authUser: payload };
    },
  },
});

export default userSlice.reducer;
