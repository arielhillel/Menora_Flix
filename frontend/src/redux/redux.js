import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "./isLoginSlice";
import userDetailsSlice from "./userDetailsSlice";

const store = configureStore({
  reducer: {
    reducerIsLogin: isLoginSlice,
    reducerUserDetails: userDetailsSlice,
  },
});

export default store;
