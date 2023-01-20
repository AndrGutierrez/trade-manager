import React from "react";
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
  return (
    <div className="flex">
      <div className="md:w-1/3">
        <Select className="w-3/4 m-5"></Select>
      </div>
      <div className="xl:w-50 md:w-2/3">
        <h2 className="text-[2.3rem] font-semibold pt-5 px-3">
          Your Portfolio
        </h2>
        {Object.keys(portfolio).length !== 0 &&
          portfolio.map(({ label, id, value, logo, weburl }: ItemProps) => (
            <div className="w-full divide-y p-5 border-b">
              <div className="flex w-full">
                <img src={logo} alt="" className="mr-5" />
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
