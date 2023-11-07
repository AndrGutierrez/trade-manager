import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

type LayoutProps={
  children:any
}
type LoginProps={auth:{status: number, id:number, username:string}}
const objectIsEmpty = (obj: Object) => Object.keys(obj).length === 0 ? true : false;
export default function Layout({ children }: LayoutProps) {
	const login = useSelector((state: LoginProps) => state.auth);
	const navigate = useNavigate();
	useEffect(()=>{
		if (!objectIsEmpty(login)) {
			console.log(login.status)
			if(login.status===403) navigate("/login");
		}
	}, [login])
	return (
		<>
			<Header></Header>
				{children}
			<Footer></Footer>
		</>
  );
}
