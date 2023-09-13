import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.playTrailerVideos);

  useMovieTrailer(movieId);

  return (
    <div className=" w-[100%] h-[100vh]">
      <iframe
        className="w-[100%] h-[100vh] aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay;encrypted-media; picture-in-picture; "
      ></iframe>
    </div>
  );
};
export default VideoBackground;
