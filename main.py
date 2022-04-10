"""Main Flask a´ file"""
import time
import os
import atexit
import pandas as pd
import finnhub

import pytz

from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, jsonify
from bokeh.plotting import figure, output_file, save
from bokeh.models import NumeralTickFormatter, DatetimeTickFormatter
from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)


def get_stock():
    """Get stock candles data"""
    res = finnhub_client.stock_candles('AAPL', 'D', 1590988249, 1591852249)
    dataframe = pd.DataFrame(res)
    # format unix timestamp to datatime
    dataframe["t"] = pd.to_datetime(dataframe["t"], unit='s')
    make_plot(dataframe)


def make_plot(dataframe):
    """Create stock candles plot with bokeh"""
    date = dataframe["t"]
    high = dataframe["h"]
    low = dataframe["l"]
    open = dataframe["o"]
    close = dataframe["c"]

    # define if stock price incremented o decremented in a day
    inc = close > open
    dec = close > open
    half_day = 12 * 60 * 60 * 1000  # half day in ms

    tools = "pan,wheel_zoom,reset,save"

    plot = figure(x_axis_type="datetime",
                  tools=tools,
                  title="MSFT Candlestick",
                  sizing_mode="stretch_width")
    plot.segment(date, high, date, low, color="black")
    plot.vbar(date[inc],
              half_day,
              open[inc],
              close[inc],
              fill_color="#D5E1DD",
              line_color="black")
    plot.vbar(date[dec],
              half_day,
              open[dec],
              close[dec],
              fill_color="#F2583E",
              line_color="black")

    plot.yaxis[0].formatter = NumeralTickFormatter(format="$0.00")
    plot.xaxis[0].formatter = DatetimeTickFormatter(months="%b %Y",
                                                    days="%b %d")

    output_file("./templates/apple.html")

    save(plot)


@app.route('/')
def home():
    """Home route"""
    get_stock()
    return jsonify('a')


def get_daily_data():
    """get stock data and generate plots at the end of the dat"""
    print("Fetching stocks...")
    get_stock()
    print("Stock update finshed!")


if __name__ == '__main__':
    load_dotenv()
    API_KEY = os.environ.get("API_KEY")
    finnhub_client = finnhub.Client(api_key=API_KEY)

    EST = pytz.timezone("America/New_York")
    get_daily_data()

    # get daily data when NYSE closes
    scheduler = BackgroundScheduler(timezone=EST)
    scheduler.add_job(get_daily_data, trigger='cron', hour='16', minute='10')
    scheduler.start()
    app.run(port=5000)
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
