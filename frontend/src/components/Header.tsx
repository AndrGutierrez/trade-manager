import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const textStyle =
    "block mt-4 lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4";
  return (
    <header className="flex flex-row justify-between bg-cyan-900 text-white py-6 px-10">
      <h1 className="font-bold text-xl w-1/3">TradeManager</h1>
      <div className="block lg:flex lg:items-center  w-1/3 ">
        <Link to="/" className={textStyle}>
          {" "}
          Home{" "}
        </Link>
        <Link to="/portfolio" className={textStyle}>
          {" "}
          Portfolio{" "}
        </Link>
      </div>
      <div className="w-1/3"></div>
    </header>
  );
}
