import { createSlice } from "@reduxjs/toolkit";

const favoriteMovies = createSlice({
  name: "favoriteMovies",
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    addFavoriteMovie: (state, action) => {
      let filteredArr = [...state.favoriteMovies, action.payload].filter(
        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
      );
      state.favoriteMovies = filteredArr;
    },
    removeFavoriteMovie: (state, action) => {
      let updatedFavoriteMovieList = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
      state.favoriteMovies = updatedFavoriteMovieList;
    },
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteMovies.actions;

export default favoriteMovies.reducer;
