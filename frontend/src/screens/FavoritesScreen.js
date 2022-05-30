import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import FavoriteMovieCard from "../components/FavoriteMovieCard";

function FavoritesScreen() {
  let favoriteMovies = useSelector(
    (state) => state.reducerFavoriteMovies.favoriteMovies
  );

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <FlatList
          data={favoriteMovies}
          renderItem={({ item }) => <FavoriteMovieCard movie={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
  },
  text: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 22,
    color: "#fff",
  },
});

export default FavoritesScreen;
