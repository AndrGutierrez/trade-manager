import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type loginProps={
	email: string,
	password: string
}
const PATH = `${process.env.REACT_APP_API_PATH}/auth/login`;
export const loginRequest = createAsyncThunk("auth/login", async (data: Object) => {
	const form = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		form.append(key, value);
	})
	const response = await axios.post(PATH, form);
	console.log(response.data)
	return response.data;
});

const authSlice = createSlice({ 
	name: "auth",
	initialState: {
		
	},
	reducers: {
		login: (state) => Object(state),
	},
	extraReducers: {
		[loginRequest.fulfilled.toString()]: (state, { payload }) => payload,
	}
});
export const {login} = authSlice.actions;
export default authSlice.reducer;
