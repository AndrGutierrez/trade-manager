import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import portfolio from "../slices/portfolio";
import candlesticks from "../slices/candlesticks";

const reducer = combineReducers({
  portfolio,
  candlesticks,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
