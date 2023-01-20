import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { AxiosRequestConfig } from "axios";
import { getCandleSticks } from "slices/candlesticks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";

const plotOptions = (data = [], company: any) => ({
  // create the chart
  rangeSelector: {
    selected: 1,
  },

  title: {
    text: `${company.label} Stock Price`,
  },

  series: [
    {
      data: data,
      type: "candlestick",
      name: `${company.label} Stock Price`,
      dataGrouping: {
        units: [
          [
            "day", // unit name
            [1], // allowed multiples
          ],
          ["month", [1, 2, 3, 4, 6]],
        ],
      },
    },
  ],
});
type HighChartsCandlestickProps = {
  filters: any;
};
const HighChartsCandlestick = ({ filters }: HighChartsCandlestickProps) => {
  const [options, setOptions] = useState({});
  const data = useSelector((state: RootState) => state.candlesticks);
  const { company, dateRange } = filters;
  const dispatch = useDispatch<AppDispatch>();

  const getData = (condition: boolean = true): void => {
    const config: AxiosRequestConfig = {
      params: {
        code: company.value,
        from: dateRange.from,
        to: dateRange.to,
      },
    };
    if (condition) dispatch(getCandleSticks(config));
  };
  useEffect(() => {
    const dataIsEmpty: boolean = Object.keys(data).length === 0;
    getData(dataIsEmpty);
  }, []);
  useEffect(() => {
    getData();
  }, [filters]);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      const fullOptions = plotOptions(data, company);
      setOptions(fullOptions);
    }
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={"stockChart"}
    />
  );
};

export default HighChartsCandlestick;
