import { configureStore } from "@reduxjs/toolkit";
import isLoginSlice from "./isLoginSlice";
import userDetailsSlice from "./userDetailsSlice";
import currentMovieSelectedSlice from "./currentMovieSelectedSlice";
import favoriteMoviesSlice from "./favoriteMoviesSlice";
import moviesSlice from "./moviesSlice";

const store = configureStore({
  reducer: {
    reducerIsLogin: isLoginSlice,
    reducerUserDetails: userDetailsSlice,
    reducerCurrentMovieSelected: currentMovieSelectedSlice,
    reducerFavoriteMovies: favoriteMoviesSlice,
    reducerMovies: moviesSlice,
  },
});

export default store;
