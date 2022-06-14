import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { Context, createWrapper } from "next-redux-wrapper";
import { Store } from "redux";

// TODO: fix type issue
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    search: {
      searchTerm: "",
      filters: {
        tags: {
          globalTags: [],
          filterTags: [],
        },
      },
      sort: {
        sortOrder: false,
        sortType: "DATE",
      },
    },
    posts: {
      globalPosts: {
        test: {
          date: "14/06/2022",
          description: "test1",
          filePath: "",
          id: "test",
          tags: ["a", "b"],
          title: "title",
          category: "",
        },
      },
      visiblePostIds: [],
    },
  },
  devTools: process.env.NODE_ENV !== "production",
});

const makeStore = (context: Context) => store;

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
