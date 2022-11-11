import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../features/commentSlice";
import offerSlice from "../features/offerSlice";
import userSlice from "../features/userSlice";
import immovablesSlice from "./../features/immovablesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    comments: commentSlice,
    immovables: immovablesSlice,
    offer: offerSlice,
  },
});
