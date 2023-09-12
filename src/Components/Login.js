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
// import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

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
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));

              // navigate("/browse");
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // navigate("/browse");
          // ...
        })
        .catch((error) => {
          console.log({ error });
          const errorCode = error.code;
          // const errorMessage = error.message;
          const errorMessage = getErrorMessage(error);
          seterrorMessage(errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-lg"
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
          {isSignIn ? "Sign In " : "Sign Up"}
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
