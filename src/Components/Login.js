import React from "react";
import Header from "./Header";
import { useState } from "react";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
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
      <form className="p-12 bg-black absolute w-3/12 my-36 mx-auto right-0 left-0 bg-opacity-80 rounded-lg">
        <h1 className="text-2xl text-white font-bold py-4 m-2">
          {isSignIn ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-800 "
          />
        )}
        <input
          type="text"
          placeholder="Email Adress"
          className="p-4 my-2 w-full bg-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-800 "
        />
        <button className="p-4 my-6 bg-red-600 text-white font-bold w-full rounded-lg">
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
