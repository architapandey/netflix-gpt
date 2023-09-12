import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";

const appStore = configureStore({
  reducer: { userData: userReducer, movies: moviesReducer },
});

export default appStore;
