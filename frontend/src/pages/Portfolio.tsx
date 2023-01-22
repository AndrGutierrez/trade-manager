import React, { useState, useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Select from "react-select";

type ItemProps = {
  label: string;
  id: number;
  value: string;
  logo: string;
  weburl: string;
};
export default function Portfolio() {
  const portfolio = useSelector((state: RootState) => state.portfolio);
  const [portfolioHasItems, setPortfolioHasItems] = useState(false);
  const [value, setValue] = useState({});
  const defaultValue = "";
  useEffect(() => {
    if (Object.keys(portfolio).length !== 0) setPortfolioHasItems(true);
  }, [portfolio]);

  return (
    <div className="flex">
      <div className="md:w-1/3">
        <Select
          className="w-3/4 m-5"
          onChange={(e) => setValue(e || defaultValue)}
        ></Select>
      </div>
      <div className="xl:w-50 md:w-2/3">
        <h2 className="text-[2.3rem] font-semibold pt-5 px-3">
          Your Portfolio
        </h2>
        {portfolioHasItems &&
          portfolio.map(({ label, id, value, logo, weburl }: ItemProps) => (
            <div className="w-full divide-y p-5 border-b" key={id}>
              <div className="flex w-full">
                <img src={logo} alt="" className="mr-5 w-[56px] h-[56px] " />
                <div>
                  <h6 className="border-white text-xl">
                    {label} ({value})
                  </h6>
                  <p className="text-gray-500">{weburl}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
