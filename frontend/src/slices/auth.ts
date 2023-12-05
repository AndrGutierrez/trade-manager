import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

type loginProps={
	email: string,
	password: string
}
const PATH = `${process.env.REACT_APP_API_PATH}/auth/login`;

export const getLogin = createAsyncThunk("auth/login", async () => {
	let res;
	try {
		res = await axios.get(PATH, {withCredentials: true});
	}
	catch ({response}) {
    res=response
	}
  return res
});
const authSlice = createSlice({ 
	name: "auth",
	initialState: {
		id: 0,
	},
	reducers: {
		login: (state,{payload}) => Object(payload),
	},
	extraReducers: {
		[getLogin.fulfilled.toString()]: (state, { payload }) => payload.data
	}
});
export const {login} = authSlice.actions;
export default authSlice.reducer;
