import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CardMovie from "./CardMovie";

function CarouselMovies({ movies }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <CardMovie item={item} />}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: 100,
    height: 200,
    resizeMode: "cover",
    margin: 7.5,
  },
});

export default CarouselMovies;
