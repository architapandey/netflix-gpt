import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useDispatch } from "react-redux";

const MovieCard = ({ posterPath, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!posterPath) return null;
  return (
    <div
      onClick={() => {
        dispatch(addTrailerVideo(null));
        navigate(`/movie/${id}`);
      }}
      className="w-36 md:w-48 pr-4 cursor-pointer"
    >
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;
