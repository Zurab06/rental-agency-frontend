import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import immovablesSlice from './../features/immovablesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  immovables: immovablesSlice,
  },
});
