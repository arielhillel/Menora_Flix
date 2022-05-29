import { createSlice } from "@reduxjs/toolkit";

const currentMovieSelectedSlice = createSlice({
  name: "currentMovieSelected",
  initialState: {
    movie: {},
  },
  reducers: {
    setCurrentMovie: (state, action) => {
      state.movie = action.payload;
    },
  },
});

export const { setCurrentMovie } = currentMovieSelectedSlice.actions;

export default currentMovieSelectedSlice.reducer;
