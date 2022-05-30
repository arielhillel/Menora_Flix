import { createSlice } from "@reduxjs/toolkit";
import { storeData, rertrieveData } from "../utils/AsyncStorage";

let val = rertrieveData("count");
console.log(val._U);
const countNewFavoritesSlice = createSlice({
  name: "countNewFavorites",
  initialState: {
    countNewFavorites: val._U,
  },
  reducers: {
    addFavorite: (state) => {
      state.countNewFavorites += 1;
      storeData("count", state.countNewFavorites.toString());
    },
    removeFavorite: (state) => {
      state.countNewFavorites -= 1;
      storeData("count", state.countNewFavorites.toString());
    },
    resetCounter: (state) => {
      state.countNewFavorites = 0;
      storeData("count", state.countNewFavorites.toString());
    },
  },
});

export const { addFavorite, removeFavorite, resetCounter } =
  countNewFavoritesSlice.actions;

export default countNewFavoritesSlice.reducer;
