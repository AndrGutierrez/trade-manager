import React from "react";
import Chart from "react-apexcharts";

export default class CandleStickChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "candle",
          data: [],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "candlestick",
        },
        title: {
          text: "CandleStick Chart - Category X-axis",
          align: "left",
        },
        annotations: {
          xaxis: [
            {
              x: "Oct 06 14:00",
              borderColor: "#00E396",
              label: {
                borderColor: "#00E396",
                style: {
                  fontSize: "12px",
                  color: "#fff",
                  background: "#00E396",
                },
                orientation: "horizontal",
                offsetY: 7,
                text: "Annotation Test",
              },
            },
          ],
        },
        tooltip: {
          enabled: true,
        },
        xaxis: {
          type: "category",
          labels: {
            // formatter: (val) => dayjs(val).format('MMM DD HH:mm')
            formatter: (val) => val,
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }

  async componentDidMount() {
    let data = await fetch("http://localhost:5000/candlesticks").then((res) =>
      res.json()
    );
    data = data.map(({ date, open, high, low, close }) => {
      return {
        x: date,
        y: [open, high, low, close],
      };
    });
    const series = [
      {
        data,
        name: "candle",
      },
    ];
    console.log(series);
    this.setState({ series });
  }

  render() {
    // console.log(this.state.series);
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={350}
        />
      </div>
    );
  }
}
