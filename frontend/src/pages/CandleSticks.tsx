import React, { useEffect, useState } from "react";
import Select, { GroupBase } from "react-select";
import CandleStickChart from "components/CandleStickChart";
import DatePicker from "components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { DateTime } from "luxon";
import { setFilters } from "slices/filters";

const defaultValue: { label: string; name: string } = {
  label: "Not selected yet",
  name: "",
};
export default function CandleSticks() {
  const portfolio: object = useSelector((state: RootState) => state.portfolio);
  const selectedFilters = useSelector((state: RootState) => state.filters);
  const [initialDate, setInitialDate] = useState(
    new Date(selectedFilters.dateRange.from)
  );
  const [endDate, setEndDate] = useState(
    new Date(selectedFilters.dateRange.to)
  );
  const [selectedCompany, setSelectedCompany] = useState<Object>(defaultValue);
  const dispatch = useDispatch();
  const setSelectedFilters = () => {
    dispatch(
      setFilters({
        company: selectedCompany,
        dateRange: {
          from: initialDate.toString(),
          to: endDate.toString(),
        },
      })
    );
  };

  return (
    <>
      <CandleStickChart filters={selectedFilters}></CandleStickChart>
      <div className="py-3 px-2 w-2/3">
        <h3 className="text-lg">Select company</h3>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <Select
              options={portfolio as GroupBase<string>[]}
              defaultValue={selectedFilters.company}
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
          onClick={() => setSelectedFilters()}
        >
          Select
        </button>
      </div>
    </>
  );
}
