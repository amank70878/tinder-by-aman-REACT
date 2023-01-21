import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducer";

const store = configureStore({
  reducer: {
    tinderRedux: customReducer,
  },
});

export default store;
