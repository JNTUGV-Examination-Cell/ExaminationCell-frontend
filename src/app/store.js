import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/roles/roleSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
