"""Main Flask a´ file"""
import os
import finnhub

from trademanager import app
from dotenv import load_dotenv
from flask import jsonify, request
from flask.wrappers import Response
from sqlalchemy.exc import SQLAlchemyError
from trademanager.database import db
from trademanager.models import Company
import dateutil.parser as dp

API_KEY = os.environ.get("API_KEY")
finnhub_client = finnhub.Client(api_key=API_KEY)

@app.route('/portfolio')
def get_portfolio():
    registered_companies = Company.query.all()
    registered_companies = [i.as_dict() for i in registered_companies]
    registered_companies = jsonify(registered_companies)

    return registered_companies

@app.route('/company/filter')
def filter_company():
    '''filter companies by description or symbol'''
    name = request.args.get('name')
    company = finnhub_client.company_profile2(symbol=name)
    return jsonify(company)


@app.route('/company/register', methods=['POST'])
def register_company():
    """register company option in db"""
    code = request.form.get('code')
    company = finnhub_client.company_profile2(symbol=code)
    company = Company(label=company['name'], value=company["ticker"], logo=company["logo"], weburl=company["weburl"])
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
    # res = finnhub_client.stock_candles(code, 'D', 1590988249, 1650672000)
    res = finnhub_client.stock_candles(code, 'D', start, end)

    candles = []
    if res['s'] == 'no_data': return Response('company not found', status=404)

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
    stocks = get_stock(code, start, end)
    return stocks


@app.route('/')
def home():
    """Home route"""
    data = finnhub_client.stock_symbols('US')
    data = [company["symbol"] for company in data]

    return jsonify(data)


if __name__ == '__main__':
    load_dotenv()
    app.run(host="0.0.0.0")
