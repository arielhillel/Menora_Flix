import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "currentMovieSelected",
  initialState: {
    movies: {
      recommendedMovies: [],
      newMovies: [],
    },
  },
  reducers: {
    loadRecommendedMovies: (state, action) => {
      state.movies.recommendedMovies = action.payload;
    },
    loadNewMovies: (state, action) => {
      state.movies.newMovies = action.payload;
    },
    addNewMovies: (state, action) => {
      state.movies.newMovies = [...state.movies.newMovies, ...action.payload];
    },
    addRecommendedMovies: (state, action) => {
      state.movies.recommendedMovies = [
        ...state.movies.recommendedMovies,
        ...action.payload,
      ];
    },
  },
});

export const {
  loadRecommendedMovies,
  loadNewMovies,
  addNewMovies,
  addRecommendedMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
