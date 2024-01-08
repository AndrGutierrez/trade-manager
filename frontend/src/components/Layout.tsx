import React, { useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolio } from "slices/portfolio";
import { AppDispatch } from "store";

type LayoutProps={
  children:any
}
type LoginProps={auth:{status: number, id:number, username:string}}
const objectIsEmpty = (obj: Object) => Object.keys(obj).length === 0 ? true : false;
export default function Layout({ children }: LayoutProps) {
	const login = useSelector((state: LoginProps) => state.auth);
	const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
	const path = useLocation().pathname;
	useEffect(()=>{
		const authNotRequired: boolean = path !== "/login" && path!=="/register" && path!=="/register/success"
		if (!objectIsEmpty(login) && authNotRequired) {
			if(login.status===403) navigate("/register");
      else{
        console.log(login)
        dispatch(getPortfolio(String(login.id)));
      }
		}
	}, [login, path])
	return (
		<>
			<Header></Header>
				{children}
			<Footer></Footer>
		</>
  );
}
