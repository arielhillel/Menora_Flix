import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: {},
  },
  reducers: {
    setuserDetails: (state, action) => {
      state.userDetails = {
        userName: action.payload.userName,
        password: action.payload.password,
        accessToken: action.payload.accessToken,
      };
    },
    resetuserDetails: (state) => {
      state.userDetails = {};
    },
  },
});

export const { setuserDetails, resetuserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
