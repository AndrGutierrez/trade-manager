import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type loginProps={
	email: string,
	password: string
}
const PATH = `${process.env.REACT_APP_API_PATH}/auth/login`;

export const getLogin = createAsyncThunk("auth/login", async () => {
	const response = await axios.get(PATH, {withCredentials: true});
	return response.data;
});
const authSlice = createSlice({ 
	name: "auth",
	initialState: {
		
	},
	reducers: {
		login: (state,payload) => Object(payload),
	},
	extraReducers: {
		[getLogin.fulfilled.toString()]: (state, { payload }) => payload
	}
});
export const {login} = authSlice.actions;
export default authSlice.reducer;
