import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-[100vh] w-screen object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};
export default GPTSearch;
