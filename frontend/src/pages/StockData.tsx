import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {};
const getStocks = createAsyncThunk("stockData", async () => {});

const stockDataSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {},
  extraReducers: {
    [getStocks.fulfilled.toString()]: (state, { payload }) => payload,
  },
});
export default stockDataSlice.reducer;
