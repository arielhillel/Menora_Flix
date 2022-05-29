import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setCurrentMovie } from "../redux/currentMovieSelectedSlice";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../redux/favoriteMoviesSlice";

function CardMovie({ item }) {
  const [isSelected, setIsSelected] = useState(false);
  let dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setCurrentMovie(item));
        }}
      >
        <Image style={styles.image} source={{ uri: item.image }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToFavoritesBtn}
        onPress={() => {
          setIsSelected(!isSelected);
          !isSelected
            ? dispatch(addFavoriteMovie(item))
            : dispatch(removeFavoriteMovie(item));
        }}
      >
        <Ionicons
          name="star"
          size={22.5}
          color={isSelected ? "gold" : "white"}
          style={styles.star}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 7.5,
  },

  image: {
    width: 100,
    height: 130,
    resizeMode: "cover",
  },
  addToFavoritesBtn: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
});

export default CardMovie;
