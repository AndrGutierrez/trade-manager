import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};
const PATH = `${process.env.REACT_APP_API_PATH}/portfolio`;

export const getPortfolio = createAsyncThunk("portfolio/get", async () => {
  const data = await axios.get(PATH);
  return data.data;
});

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    portfolio: (state) => Object(state),
    updatePortfolio: (state, { payload }) => Object({ ...state, payload }),
  },
  extraReducers: {
    [getPortfolio.fulfilled.toString()]: (state, { payload }) => payload,
  },
});

export const { portfolio, updatePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
