import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { Context, createWrapper } from "next-redux-wrapper";
import { Store } from "redux";

// TODO: fix type issue
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

const makeStore = (context: Context) => store;

export const wrapper = createWrapper(makeStore, { debug: true });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
