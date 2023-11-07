import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type loginProps={
	email: string,
	password: string
}
const PATH = `${process.env.REACT_APP_API_PATH}/auth/login`;

export const getLogin = createAsyncThunk("auth/login", async () => {
	let response={data: {}, status:200}
	try {
		response = await axios.get(PATH, {withCredentials: true});
	}
	catch (error) {
		response.status=403
	}
	
	return {...response.data, status: response.status};
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
		[getLogin.fulfilled.toString()]: (state, { payload }) => payload
	}
});
export const {login} = authSlice.actions;
export default authSlice.reducer;
