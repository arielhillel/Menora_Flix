import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "./isLoginSlice";
import userDetailsSlice from "./userDetailsSlice";
import currentMovieSelectedSlice from "./currentMovieSelectedSlice";

const store = configureStore({
  reducer: {
    reducerIsLogin: isLoginSlice,
    reducerUserDetails: userDetailsSlice,
    reducerCurrentMovieSelected: currentMovieSelectedSlice,
  },
});

export default store;
