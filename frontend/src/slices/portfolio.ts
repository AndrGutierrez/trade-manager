import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
const initialState = {};
const PATH = `${process.env.REACT_APP_API_PATH}/portfolio`;
const COMPANY_PATH = `${process.env.REACT_APP_API_PATH}/company`;
const POST_PATH = `${process.env.REACT_APP_API_PATH}/company/register`;

export const getPortfolio = createAsyncThunk("portfolio/get", async () => {
  const data = await axios.get(PATH);
  return data.data;
});
export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async (code: string) => {
    const postConfig = new FormData();
    postConfig.append("code", code);
    const company = await axios.post(POST_PATH, postConfig);
    return company.data;
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    portfolio: (state) => Object(state),
  },
  extraReducers: {
    [getPortfolio.fulfilled.toString()]: (state, { payload }) => payload,
    [updatePortfolio.fulfilled.toString()]: (state, { payload }) => [
      ...state,
      payload,
    ],
  },
});

export const { portfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
