import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

type LayoutProps={
  children:any
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
}
