import React, { useState } from "react";
import Select from "react-select";
import CandleStickChart from "../components/CandleStickChart";
import DatePicker from "../components/DatePicker";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const defaultValue: { label: string; name: string } = {
  label: "Not selected yet",
  name: "",
};
export default function CandleSticks() {
  const portfolio: object = useSelector((state: RootState) => state.portfolio);
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [selectedCompany, setSelectedCompany] = useState<Object>(defaultValue);
  let filters: Object = {
    company: selectedCompany,
    dateRange: {
      from: initialDate,
      to: endDate,
    },
  };
  const [selectedFilters, setSelectedFilters] = useState(filters);

  return (
    <>
      <CandleStickChart filters={selectedFilters}></CandleStickChart>
      <div className="py-3 px-2 w-2/3">
        <h3 className="text-lg">Select company</h3>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <Select
              options={portfolio as Array<unknown>}
              onChange={(e) => setSelectedCompany(e || defaultValue)}
            ></Select>
          </div>
          <div className="flex w-2/3 grid-cols-2 gap-2">
            <DatePicker
              value={initialDate}
              setValue={setInitialDate}
            ></DatePicker>
            <DatePicker value={endDate} setValue={setEndDate}></DatePicker>
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
