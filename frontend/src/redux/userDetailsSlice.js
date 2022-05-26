import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: {},
  },
  reducers: {
    setuserDetails: (state, action) => {
      state.userDetails = {
        userName: action.userName,
        password: action.password,
        accessToken: action.accessToken,
      };
    },
    ResetuserDetails: (state, action) => {
      state.userDetails = {};
    },
  },
});

export const { logsetuserDetailsin, ResetuserDetails } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
