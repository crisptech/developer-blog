import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
