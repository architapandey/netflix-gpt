import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_options } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_options
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    setIsLoading(true);
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    setIsLoading(false);
  };

  return (
    <div className="pt-[50%] sm:pt-[30%] md:pt-[10%] flex justify-center w-full">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input
          ref={searchText}
          type="text"
          required
          className=" p-4 m-4 mr-2 col-span-8"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="col-span-4 p-3 m-4 ml-2 bg-red-700 text-white rounded-lg">
          {isLoading ? "Loading..." : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
