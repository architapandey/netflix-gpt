import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { userDetails: {} },
  reducers: {
    addUser: (state, action) => {
      state.userDetails = action.payload;
    },
    removeUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
