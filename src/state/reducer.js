import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  initialUser: null,
  user: null,
};

export const customReducer = createReducer(initialState, {
  setInitialUser: (state, action) => {
    state.initialUser = action.payload;
  },
  setUser: (state, action) => {
    state.user = action.payload;
  },
});
