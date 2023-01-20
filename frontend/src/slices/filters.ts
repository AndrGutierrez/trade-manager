import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
const today: string = DateTime.local().toISO();
const initialState = {
  company: "",
  dateRange: {
    from: today,
    to: today,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, { payload }) => payload,
    getFilters: (state) => state,
  },
});

export const { setFilters, getFilters } = filterSlice.actions;
export default filterSlice.reducer;
