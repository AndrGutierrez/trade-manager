import React from "react";
import Header from "./Header";
import Footer from "./Footer";

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
