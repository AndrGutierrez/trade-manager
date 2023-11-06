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
	return response.data;
});

export const getLogin = createAsyncThunk("auth/login", async () => {
	const response = await axios.get(PATH, {withCredentials: true});
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
		[getLogin.fulfilled.toString()]: (state, { payload }) => payload,
	}
});
export const {login} = authSlice.actions;
export default authSlice.reducer;
