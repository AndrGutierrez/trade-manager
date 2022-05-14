import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

const plotOptions = (data = []) => ({
  // create the chart
  rangeSelector: {
    selected: 1,
  },

  title: {
    text: "AAPL Stock Price",
  },

  series: [
    {
      data: data,
      type: "candlestick",
      name: "AAPL Stock Price",
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
const HighChartsCandlestick = ({ code }) => {
  const [options, setOptions] = useState({});
  const [data, setData] = useState([]);
  const DATA_PATH = `${process.env.REACT_APP_API_PATH}/candlesticks`;

  const config = {
    params: {
      code: "AAPL",
    },
  };

  useEffect(() => {
    axios
      .get(DATA_PATH, config)
      .catch((e) => {
        console.log("++++", e.response.data);
      })
      .then((res) => setData(res.data));
  }, [DATA_PATH]);

  useEffect(() => {
    const fullOptions = plotOptions(data);
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
