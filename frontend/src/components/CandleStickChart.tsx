import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import { RootState } from "store";

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
const HighChartsCandlestick = () => {
  const [options, setOptions] = useState({});
  const data = useSelector((state: RootState) => state.candlesticks);
  const filters = useSelector((state: RootState) => state.filters);
  const { company }: any = filters;

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
