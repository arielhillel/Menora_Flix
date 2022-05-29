import { createSlice } from "@reduxjs/toolkit";

const isLoginSlice = createSlice({
  name: "isLogin",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    setIsLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { setIsLogin, setIsLogout } = isLoginSlice.actions;

export default isLoginSlice.reducer;
