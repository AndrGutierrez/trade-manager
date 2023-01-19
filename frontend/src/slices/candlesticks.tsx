import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
const initialState = {};
const PATH = `${process.env.REACT_APP_API_PATH}/candlesticks`;

export const getCandleSticks = createAsyncThunk(
  "candlesticks/get",
  async (config: AxiosRequestConfig) => {
    const data = await axios.get(PATH, config);
    return data.data;
  }
);

const portfolioSlice = createSlice({
  name: "candlesticks",
  initialState,
  reducers: {
    candlesticks: (state) => Object(state),
  },
  extraReducers: {
    [getCandleSticks.fulfilled.toString()]: (state, { payload }) => payload,
  },
});

export const { candlesticks } = portfolioSlice.actions;
export default portfolioSlice.reducer;
