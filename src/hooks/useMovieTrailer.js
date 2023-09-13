import React, { useEffect } from "react";
import { API_options } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const useMovieTrailer = (movieId) => {
  console.log({ movieId });
  const dispatch = useDispatch();
  const getMovieVideos = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const data = await fetch(url, API_options);
    const json = await data.json();
    console.log({ json });
    const filterData = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData?.length ? filterData?.[0] : json.results?.[0];
    console.log(filterData);
    console.log({ trailer });
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
