import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const textStyle =
    "block lg:inline-block lg:mt-0 text-teal-100 hover:text-white mr-4";
	return (
		<header className="flex flex-row justify-between bg-cyan-900 text-white py-6 px-10">
			<Link to="/">
			  <h1 className="font-bold text-xl w-1/3">TradeManager</h1>
			</Link>
		<div className="block sm:flex items-center  lg:w-1/3 lg:w-1/2 ">
			<Link to="/" className={textStyle}>
			  {" "}
			  Home{" "}
			</Link>
			<Link to="/portfolio" className={textStyle}>
			  {" "}
			  Portfolio{" "}
			</Link>
			<Link to="/login" className={textStyle}>
			  {" "}
			  Login{" "}
			</Link>
		</div>
      <div className="w-1/3 hidden sm:block"></div>
    </header>
  );
}
