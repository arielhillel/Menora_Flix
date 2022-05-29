import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import CarouselMovies from "../components/CarouselMovies";
import MovieDescription from "../components/MovieDescription";
import { setCurrentMovie } from "../redux/currentMovieSelectedSlice";
import axios from "axios";
import { loadNewMovies, loadRecommendedMovies } from "../redux/moviesSlice";
import { useDispatch, useSelector } from "react-redux";

function HomeScreen() {
  let userDetails = useSelector(
    (state) => state.reducerUserDetails.userDetails
  );
  let recommendedMovies = useSelector(
    (state) => state.reducerMovies.movies.recommendedMovies
  );
  let newestMovies = useSelector(
    (state) => state.reducerMovies.movies.newMovies
  );
  const dispatch = useDispatch();

  const handleSetNewestMovies = async () => {
    let result = await axios.get(
      "https://menora-flix.herokuapp.com/movies/newest",
      { headers: { authorization: `Bearer ${userDetails.accessToken}` } }
    );
    result && dispatch(loadNewMovies(result.data.newestMovies));
  };

  const handleSetRecommendedMovies = async () => {
    let result = await axios.get(
      "https://menora-flix.herokuapp.com/movies/recommended",
      { headers: { authorization: `Bearer ${userDetails.accessToken}` } }
    );
    result && dispatch(loadRecommendedMovies(result.data.recommendedMovies));
  };

  useEffect(() => {
    async function fetchData() {
      await handleSetNewestMovies();
      await handleSetRecommendedMovies();
    }
    fetchData();
  }, []);

  const _handleSearch = () => console.log("Searching");

  return (
    <ScrollView style={styles.container}>
      <View>
        <Appbar.Header>
          <Appbar.Content title="My home" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
        </Appbar.Header>
        <Text style={styles.text}>Recommended Movies</Text>
        <CarouselMovies movies={recommendedMovies} />
        <Text style={styles.text}>Movie Description</Text>
        <MovieDescription />
        <Text style={styles.text}>New Movies</Text>
        <CarouselMovies movies={newestMovies} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    padding: 15,
    fontSize: 22,
    color: "#fff",
  },
});

export default HomeScreen;
