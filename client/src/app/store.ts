import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import { userApi } from "../api/userapi";
import user from "../Slices/userSlice";
import post from "../Slices/postSlice";
import reward from "../Slices/rewardSlice";
import order from "../Slices/orderSlice";
import like from "../Slices/likeSlice";
import comment from "../Slices/commentSlice";
import payment from "../Slices/paymentSlice";
import remind from "../Slices/remindSlice";
import subscribe from "../Slices/subscribeSlice";
import block from "../Slices/blockSlice";
import message from "../Slices/messageSlice";
export const store = configureStore({
  reducer: {
    user,
    post,
    reward,
    order,
    like,
    comment,
    payment,
    remind,
    subscribe,
    block,
    message,
    // [userApi.reducerPath]: userApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(userApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
