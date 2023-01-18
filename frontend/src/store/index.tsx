import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import portfolio from "../slices/portfolio";

const reducer = combineReducers({
  portfolio,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
