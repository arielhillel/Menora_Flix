import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

function FavoriteMovieCard({ movie }) {
  return movie ? (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{
            uri: movie.image,
          }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#1A1A1A", padding: 20 }}>
        <View>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        <Text style={styles.text}>Year: {movie.year}</Text>
        <Text style={styles.text}>ImdbId: {movie.id}</Text>
        <Text style={styles.text}>Type: {movie.type}</Text>
      </View>
    </View>
  ) : (
    <ActivityIndicator size="large" color="red" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    minHeight: 275,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
  title: {
    paddingBottom: 60,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default FavoriteMovieCard;
