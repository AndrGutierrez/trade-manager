"""Main Flask a´ file"""
import os
import atexit
import finnhub

import pytz

# from datetime import datetime
from dotenv import load_dotenv
from flask import jsonify, Response, request
from bokeh.plotting import figure  #, output_file
from bokeh.models import NumeralTickFormatter, DatetimeTickFormatter
from apscheduler.schedulers.background import BackgroundScheduler

from sqlalchemy.exc import SQLAlchemyError
from trademanager import app
from trademanager.database import db
from trademanager.models import Company


@app.route('/company/filter')
def filter_company():
    '''filter companies by description or symbol'''
    filtered_companies = []
    name = (request.args.get('name')).lower()
    for company in companies:
        symbol = company['symbol'].lower()
        description = company['description'].lower()
        if name in symbol or name in description:
            filtered_companies.append(company)
    return jsonify(filtered_companies)


@app.route('/company/register', methods=['POST'])
def register_company():
    """register company option in db"""
    code = request.form.get('code')
    company = list(filter(lambda company: company['symbol'] == code,
                          companies))[0]
    company = Company(label=company['description'], value=company["symbol"])
    try:
        db.session.add(company)
        db.session.commit()
        response = Response("Company registered successfuly", status=200)
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        response = Response(error, status=400)

    return response


def get_stock(code):
    """Get stock candles data"""

    print("*" * 10)
    print(code)
    print("*" * 10)
    res = finnhub_client.stock_candles('APPL', 'D', 1590988249, 1650672000)

    candles = []
    for i in range(len(res['t'])):
        # convert javascript unix timestamp
        date = res['t'][i] * 1000
        candlestick = [
            date,
            # res['t'][i],
            res['o'][i],
            res['h'][i],
            res['l'][i],
            res['c'][i],
        ]
        candles.append(candlestick)

    return candles
    # dataframe = pd.DataFrame(res)
    # format unix timestamp to datatime
    # dataframe["t"] = pd.to_datetime(dataframe["t"], unit='s')
    # return dataframe
    # make_plot(dataframe)


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

    # return jsonify(json_item(plot, "myplot"))


@app.route('/candlesticks')
def candlesticks():
    code = request.args.get('code')
    # print("*" * 10)
    # print(code)
    # print("*" * 10)
    stocks = get_stock(code)
    return jsonify(stocks)


@app.route('/')
def home():
    """Home route"""
    data = finnhub_client.stock_symbols('US')
    data = [company["symbol"] for company in data]

    return jsonify(data)


def get_daily_data():
    """get stock data and generate plots at the end of the dat"""
    print("Fetching stocks...")
    # get_stock()
    print("Stock update finshed!")


if __name__ == '__main__':
    load_dotenv()
    API_KEY = os.environ.get("API_KEY")
    finnhub_client = finnhub.Client(api_key=API_KEY)

    companies = finnhub_client.stock_symbols('US')

    EST = pytz.timezone("America/New_York")
    get_daily_data()

    # get daily data when NYSE closes
    scheduler = BackgroundScheduler(timezone=EST)
    scheduler.add_job(get_daily_data, trigger='cron', hour='16', minute='10')
    scheduler.start()
    app.run(port=5000)
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
