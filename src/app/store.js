import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import ImmovablesCard from './../components/Immovables/ImmovablesCard';
import immovablesSlice from './../features/immovablesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  Immovables: immovablesSlice,
  },
});
