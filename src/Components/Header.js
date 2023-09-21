import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { AVATAR_URL, LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userData);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleGPTSearch = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser({}));
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute px-8 py-2 w-[100%] bg-gradient-to-b from-black z-10 flex flex-1 flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0 " src={LOGO_URL} alt="logo" />
      {userDetails?.uid && (
        <div className="flex justify-evenly">
          {showGptSearch && (
            <select
              className="h-[44px] m-3 p-3 rounded-lg bg-gray-900 text-white text-sm hidden md:block"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <div>
            <button
              onClick={handleGPTSearch}
              className="h-[44px] bg-purple-800 rounded-lg p-3 m-3 text-white text-sm"
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
          </div>
          <img
            className="w-[40px] h-[40px] m-3 hidden md:block "
            src={AVATAR_URL}
            alt="logo"
          />

          <div>
            <button
              onClick={handleSignOut}
              className="bg-red-700   p-3 m-3  rounded-lg text-sm text-white"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
