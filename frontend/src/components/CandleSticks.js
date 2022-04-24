import React, { useEffect, useState } from "react";
import CandleStickChart from "./CandleStickChart";
import Select from "react-select";

export default function CandleSticks() {
  const [options, setOptions] = useState([]);
  const COMPANY_PATH = `${process.env.REACT_APP_API_PATH}/companies`;
  useEffect(() => {
    fetch(COMPANY_PATH)
      .then((res) => res.json())
      .then((res) => {
        let options = [];
        res.forEach((option) => {
          options.push(option);
        });
        setOptions(options);
      });
  }, [COMPANY_PATH]);
  useEffect(() => {
    console.log(options);
  }, [options]);
  return (
    <>
      <CandleStickChart></CandleStickChart>
      <Select
        options={options}
        isSearchable={options !== [] ? false : true}
      ></Select>
    </>
  );
}
