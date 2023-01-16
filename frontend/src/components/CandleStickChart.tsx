import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

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
type HighChartsCandlestickProps ={
  filters: any
}
const HighChartsCandlestick = ({ filters }: HighChartsCandlestickProps) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);
  const DATA_PATH = `${process.env.REACT_APP_API_PATH}/candlesticks`;
  const { company, dateRange } = filters;

  useEffect(() => {
    getData();
  }, [DATA_PATH, filters]);
  const getData = () => {
    const config = {
      params: {
        code: company.value || "AAPL",
        from: dateRange.from,
        to: dateRange.to,
      },
    };
    // company.value &&
    axios
      .get(DATA_PATH, config)
      .catch((e) => {
        throw e;
      })
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    const fullOptions = plotOptions(data, company);
    setOptions(fullOptions);
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
