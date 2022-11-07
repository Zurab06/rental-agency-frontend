import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "../features/commentSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    comments: commentSlice
  },
});
