import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState: Object[] = [];
const PATH = `${process.env.REACT_APP_API_PATH}/portfolio`;
const POST_PATH = `${process.env.REACT_APP_API_PATH}/company/register`;

export const getPortfolio = createAsyncThunk("portfolio/get", async (user:string) => {
	const data = await axios.get(PATH, { params: { user } });
	return data.data;
});
export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({code, user}:{code: string, user: string}) => {
    const postConfig = new FormData();
    postConfig.append("code", code);
    postConfig.append("user", user);
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
