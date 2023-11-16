import React, { useEffect } from "react";
import CandleSticks from "pages/CandleSticks";
import Layout from "components/Layout";
import Portfolio from "pages/Portfolio";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPortfolio } from "slices/portfolio";
import { AppDispatch } from "store";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "slices/auth";
import RegisterSuccess from "pages/RegisterSuccess";

export default function App() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getLogin());
	}, []);
	return (
		<BrowserRouter>
		  <Layout>
			<Routes>
			  <Route path="/" element={<CandleSticks />} />
			  <Route path="/portfolio" element={<Portfolio />} />
			  <Route path="/login" element={<Login />} />
			  <Route path="/register" element={<Signup />} />
			  <Route path="/register/success" element={<RegisterSuccess />} />
			</Routes>
		  </Layout>
		</BrowserRouter>
	  );
}
