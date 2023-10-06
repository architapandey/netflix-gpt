import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_options } from "../utils/constants";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const SingleMovie = () => {
  const params = useParams();
  const { id } = params;
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const displayTMDBMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + id + "?language=en-US",
        API_options
      );
      const json = await data.json();
      setMovieData(json);
    };
    displayTMDBMovie();
  }, []);

  return (
    <div>
      {movieData ? (
        <div className=" sm:pt-8 md:pt-0 pt-[30%] h-screen bg-black">
          <VideoTitle title={movieData.title} overview={movieData.overview} />
          <VideoBackground movieId={id} />
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <img
            src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif"
            className="w-[300px] h-[150px] items-center "
          />
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
