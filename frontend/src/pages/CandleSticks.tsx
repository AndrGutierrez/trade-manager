import React, { useState } from "react";
import Select, { GroupBase } from "react-select";
import CandleStickChart from "components/CandleStickChart";
import DatePicker from "components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { setFilters } from "slices/filters";
import { AxiosRequestConfig } from "axios";
import { getCandleSticks } from "slices/candlesticks";

export default function CandleSticks() {
  const portfolio: object = useSelector((state: RootState) => state.portfolio);
  const selectedFilters = useSelector((state: RootState) => state.filters);
  const [initialDate, setInitialDate] = useState(
    new Date(selectedFilters.dateRange.from)
  );
  const [endDate, setEndDate] = useState(
    new Date(selectedFilters.dateRange.to)
  );
  const [selectedCompany, setSelectedCompany] = useState<Object>(
    selectedFilters.company
  );
  const dispatch = useDispatch<AppDispatch>();
  const setSelectedFilters = () => {
    if (initialDate && endDate && selectedCompany) {
      console.log(selectedCompany);
      const filters = {
        company: selectedCompany || selectedFilters.company,
        dateRange: {
          from: initialDate.toString(),
          to: endDate.toString(),
        },
      };
      const config: AxiosRequestConfig = {
        params: {
          code: filters.company,
          from: filters.dateRange.from,
          to: filters.dateRange.to,
        },
      };
      dispatch(setFilters(filters));
      dispatch(getCandleSticks(config));
    }
  };

  return (
    <>
      <CandleStickChart></CandleStickChart>
      <div className="py-3 px-2 w-2/3">
        <h3 className="text-lg">Select company</h3>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <Select
              options={portfolio as GroupBase<string>[]}
              defaultValue={selectedFilters.company}
              onChange={(e: any) => setSelectedCompany(e)}
            ></Select>
          </div>
          <div className="flex w-2/3 grid-cols-2 gap-2">
            <DatePicker
              value={initialDate}
              setValue={setInitialDate}
            ></DatePicker>
            <DatePicker value={endDate} setValue={setEndDate}></DatePicker>
          </div>
          <div className="pl-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedFilters()}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
