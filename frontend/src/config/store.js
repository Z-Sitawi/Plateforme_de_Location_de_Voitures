import { configureStore } from "@reduxjs/toolkit";
import { authReducer, viewReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    view: viewReducer,
  },
});
