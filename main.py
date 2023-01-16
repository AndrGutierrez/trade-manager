"""Main Flask a´ file"""
import os
import atexit
import finnhub

import pytz

from trademanager import app
# from datetime import datetime
from dotenv import load_dotenv
from flask import jsonify, request
from flask.wrappers import Response
from apscheduler.schedulers.background import BackgroundScheduler

from sqlalchemy.exc import SQLAlchemyError
from trademanager.database import db
from trademanager.models import Company
import dateutil.parser as dp

API_KEY = os.environ.get("API_KEY")
finnhub_client = finnhub.Client(api_key=API_KEY)

@app.route('/companies')
def get_companies():
    registered_companies = Company.query.all()
    registered_companies = [i.as_dict() for i in registered_companies]
    registered_companies = jsonify(registered_companies)

    return registered_companies

    # return registered_companies


@app.route('/company/filter')
def filter_company():
    '''filter companies by description or symbol'''
    filtered_companies = []
    name = request.args.get('name').lower()
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


def get_stock(code, start, end):
    """Get stock candles data"""

    formatDate = lambda date: dp.parse(date).strftime('%s')
    start = formatDate(start)

    end = formatDate(end)
    print("*"*10)
    print(start)
    print("*"*10)
    print(end)
    print("*"*10)
    res = finnhub_client.stock_candles(code, 'D', 1590988249, 1650672000)

    candles = []
    if res['s'] == 'no_data':
        return Response('company not found', status=404)

    response_length = len(res['t'])
    for i in range(response_length):
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
    candles = jsonify(candles)

    return candles




@app.route('/candlesticks')
def candlesticks():
    code = request.args.get('code')
    start = request.args.get('from')
    end = request.args.get('to')
    # print("*" * 10)
    # print(code)
    # print("*" * 10)
    stocks = get_stock(code, start, end)
    return stocks


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

    companies = finnhub_client.stock_symbols('US')

    EST = pytz.timezone("America/New_York")
    get_daily_data()

    # get daily data when NYSE closes
    scheduler = BackgroundScheduler(timezone=EST)
    scheduler.add_job(get_daily_data, trigger='cron', hour='16', minute='10')
    scheduler.start()
    app.run(host="0.0.0.0")
    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
