import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import ValidateData from "../utils/ValidateData";
import { auth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getErrorMessage } from "../utils/utils";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
    email.current.value = "";
    password.current.value = "";
    if (name.current) name.current.value = "";
    seterrorMessage("");
  };

  const submitHandler = () => {
    if (!isSignIn) {
      const message = ValidateData(email.current.value, password.current.value);
      seterrorMessage(message);

      if (message) return;
    } else {
      if (!email.current.value || !password.current.value) {
        seterrorMessage("Fields cannot be Empty!");
        return;
      }
    }

    if (!isSignIn) {
      setIsLoading(true);
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorMessage = getErrorMessage(error);
          seterrorMessage(errorMessage);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const getBtnText = () => {
    if (isLoading) return "Loading...";
    if (isSignIn) return "Sign In";
    return "Sign Up";
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-[100vh] w-screen object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute sm:w-1/2 xl:w-3/12 my-36 sm:mx-auto mx-6 right-0 left-0 bg-opacity-80 rounded-lg"
      >
        <h1 className="text-2xl text-white font-bold py-4 m-2">
          {isSignIn ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-800 text-white "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-2 w-full bg-gray-800 text-white"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-800 text-white"
        />
        <div className="text-red-600 p-2 font-bold">{errorMessage}</div>
        <button
          onClick={submitHandler}
          className="p-4 my-6 bg-red-600 text-white font-bold w-full rounded-lg"
        >
          {getBtnText()}
        </button>
        <div
          className="my-4p-2 text-white cursor-pointer"
          onClick={handleSignUp}
        >
          {isSignIn ? "New to Netflix ? Sign Up " : "Already a User ? Sign In"}
        </div>
      </form>
    </div>
  );
}

export default Login;
