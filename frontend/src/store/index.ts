import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { portfolio, candlesticks, filters } from "slices";

const reducer = combineReducers({
  portfolio,
  candlesticks,
  filters,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
