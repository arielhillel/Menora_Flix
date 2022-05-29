import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function MovieDescription() {
  let item = useSelector((state) => state.reducerCurrentMovieSelected.movie);
  console.log(item);
  return item ? (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#1A1A1A", padding: 20 }}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.text}>Year: {item.year}</Text>
        <Text style={styles.text}>ImdbId: {item.id}</Text>
        <Text style={styles.text}>Type: {item.type}</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
      </View>
    </View>
  ) : (
    <ActivityIndicator size="large" color="red" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default MovieDescription;
