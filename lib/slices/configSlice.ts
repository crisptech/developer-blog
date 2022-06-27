import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfigState } from "../types/config";

const initialState: ConfigState = {
  initialLoad: true,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateInitialLoad: (state, action: PayloadAction<boolean>) => {
      return {
        initialLoad: action.payload,
      };
    },
  },
});

export const { updateInitialLoad } = configSlice.actions;

export default configSlice.reducer;
