import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import logReducer from "./logSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    logs: logReducer,
  },
});
