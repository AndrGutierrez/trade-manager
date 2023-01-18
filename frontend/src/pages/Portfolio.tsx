import React, { useEffect } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Portfolio() {
  const portfolio = useSelector((state: RootState) => state.portfolio);
  // useEffect(() => {
  //   portfolio.forEach((company: object) => console.log(company));
  // }, [portfolio]);
  return (
    <div className="flex justify-center">
      <div className="w-50">
        {Object.keys(portfolio).length !== 0 &&
          portfolio.map(
            ({
              label,
              id,
              value,
            }: {
              label: string;
              id: number;
              value: string;
            }) => (
              <div className=" grid grid-cols-1 w-full  divide-y p-5 border-y">
                {label}
              </div>
            )
          )}
      </div>
    </div>
  );
}
