import { configureStore } from "@reduxjs/toolkit";
import { authReducer, viewReducer, filterReducer } from "./reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    view: viewReducer,
    filter: filterReducer,
  },
});
