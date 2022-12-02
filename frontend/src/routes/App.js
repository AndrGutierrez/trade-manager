import React from "react";
import CandleSticks from "../pages/CandleSticks";
import Layout from "../components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<CandleSticks />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}
