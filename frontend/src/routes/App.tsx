import React, { useEffect } from "react";
import CandleSticks from "pages/CandleSticks";
import Layout from "components/Layout";
import Portfolio from "pages/Portfolio";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getPortfolio } from "slices/portfolio";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import Login from "pages/Login";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPortfolio());
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CandleSticks />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
