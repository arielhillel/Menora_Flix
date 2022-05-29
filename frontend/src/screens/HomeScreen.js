import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CarouselMovies from "../components/CarouselMovies";
import MovieDescription from "../components/MovieDescription";
import { setCurrentMovie } from "../redux/currentMovieSelectedSlice";

function HomeScreen() {
  const [newestMovies, setNewestMovies] = useState();
  const [recommendedMovies, setRecommendedMovies] = useState();
  let userDetails = useSelector(
    (state) => state.reducerUserDetails.userDetails
  );

  const dispatch = useDispatch();

  const handleSetNewestMovies = async () => {
    let result = await axios.get(
      "https://menora-flix.herokuapp.com/movies/newest",
      { headers: { authorization: `Bearer ${userDetails.accessToken}` } }
    );
    result && setNewestMovies(result.data.newestMovies);
  };

  const handleSetRecommendedMovies = async () => {
    let result = await axios.get(
      "https://menora-flix.herokuapp.com/movies/recommended",
      { headers: { authorization: `Bearer ${userDetails.accessToken}` } }
    );
    result && setRecommendedMovies(result.data.recommendedMovies);
  };

  const _handleSearch = () => console.log("Searching");

  useEffect(() => {
    async function fetchData() {
      await handleSetNewestMovies();
      await handleSetRecommendedMovies();
      recommendedMovies &&
        dispatch(
          setCurrentMovie(recommendedMovies[recommendedMovies.length - 1])
        );
    }
    fetchData();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="My home" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
        </Appbar.Header>
        <Text style={styles.text}>Recommended Movies</Text>
        <CarouselMovies movies={recommendedMovies ? recommendedMovies : []} />
        <Text style={styles.text}>Movie Description</Text>
        <MovieDescription />
        <Text style={styles.text}>New Movies</Text>
        <CarouselMovies movies={newestMovies ? newestMovies : []} />
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
  },
  text: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 22,
    color: "#fff",
  },
});

export default HomeScreen;
