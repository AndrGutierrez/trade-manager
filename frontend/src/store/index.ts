import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { portfolio, candlesticks, filters, auth } from "slices";

const reducer = combineReducers({
	portfolio,
	candlesticks,
	filters,
	auth
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
