import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.playTrailerVideos);
  useMovieTrailer(movieId);

  if (!trailerVideo) return null;

  return (
    <div className=" w-[100%]">
      <iframe
        className="w-[100%] aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&loop=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay;encrypted-media; picture-in-picture; "
      ></iframe>
    </div>
  );
};
export default VideoBackground;
