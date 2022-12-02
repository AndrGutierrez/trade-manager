import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import CandleStickChart from "../components/CandleStickChart";
import DatePicker from "../components/DatePicker";
import { DateTime } from "luxon";

export default function CandleSticks() {
  const DATA_PATH = `${process.env.REACT_APP_API_PATH}/companies`;
  const [options, setOptions] = useState([]);
  const [initialDate, setInitialDate] = useState(DateTime.now().toISODate());
  const [endDate, setEndDate] = useState(DateTime.now().toISODate());
  const [selectedCompany, setSelectedCompany] = useState({
    label: "Not selected yet",
    // value: "AAPL",
  });
  let filters = {
    company: selectedCompany,
    dateRange: {
      from: initialDate,
      to: endDate,
    },
  };
  const [selectedFilters, setSelectedFilters] = useState(filters);
  useEffect(() => {
    axios.get(DATA_PATH).then(({ data }) => setOptions(data));
  }, [DATA_PATH]);

  return (
    <>
      <CandleStickChart filters={selectedFilters}></CandleStickChart>
      <div className="py-3 px-2 w-2/3">
        <h3 className="text-lg">Select company</h3>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <Select
              options={options}
              onChange={(e) => setSelectedCompany(e)}
              isSearchable={options !== [] ? false : true}
            ></Select>
          </div>
          <div className="flex w-2/3 grid-cols-2 gap-2">
            <DatePicker
              value={initialDate}
              setValue={(date) => setInitialDate(date)}
            ></DatePicker>
            <DatePicker
              value={endDate}
              setValue={(date) => setEndDate(date)}
            ></DatePicker>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setSelectedFilters(filters)}
        >
          Select
        </button>
      </div>
    </>
  );
}
