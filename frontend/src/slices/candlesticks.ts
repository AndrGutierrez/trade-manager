import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { DateTime } from "luxon";
const initialState: Object = {};
const PATH: string = `${process.env.REACT_APP_API_PATH}/candlesticks`;

const convertToISO = (date: string): string =>
  DateTime.fromJSDate(new Date(date)).toISO();
export const getCandleSticks = createAsyncThunk(
  "candlesticks/get",
  async (config: AxiosRequestConfig) => {
    if (config.params.code) {
      config.params.from = convertToISO(config.params.from);
      config.params.to = convertToISO(config.params.to);
      const { data } = await axios.get(PATH, config);
      return data;
    }
    return {};
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
