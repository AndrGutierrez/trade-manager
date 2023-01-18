import React from "react";
import CandleSticks from "../pages/CandleSticks";
import Layout from "../components/Layout";
import Portfolio from "../pages/Portfolio";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<CandleSticks />} />
          <Route exact path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
