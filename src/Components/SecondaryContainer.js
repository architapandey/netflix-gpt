import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  <MovieList title={"Now Playing"} movie={movies.nowPlaying} />;
};

export default SecondaryContainer;
