from flask import Blueprint
from dotenv import load_dotenv
from flask import jsonify, request
from flask.wrappers import Response
from sqlalchemy.exc import SQLAlchemyError
from trademanager.database import db
from trademanager.models import Company
import dateutil.parser as dp
import os
import finnhub

api_bp = Blueprint('api_bp', __name__)
load_dotenv()
API_KEY = os.environ.get("API_KEY")
finnhub_client = finnhub.Client(api_key=API_KEY)
data = finnhub_client.stock_symbols('US')

@api_bp.route('/', methods=['GET'])
def home():
    """Home route"""
    name = str(request.args.get("name")).upper()
    res = [{ 
            "value": company["symbol"], 
            "label": company["description"]}
    for company in data if name in company["description"].upper()][:50]
    return jsonify(res)

@api_bp.route('/candlesticks')
def candlesticks():
    code = request.args.get('code')
    start = request.args.get('from')
    end = request.args.get('to')
    stocks = jsonify(get_stock(code, start, end))
    return stocks


@api_bp.route('/portfolio')
def get_portfolio():
    registered_companies = Company.query.all()
    registered_companies = [i.as_dict() for i in registered_companies]
    registered_companies = jsonify(registered_companies)

    return registered_companies

@api_bp.route('/company')
def filter_company():
    '''filter companies by description or symbol'''
    name = request.args.get('name')
    company = finnhub_client.company_profile2(symbol=name)
    return jsonify(company)


@api_bp.route('/company/register', methods=['POST'])
def register_company():
    """register company option in db"""
    code = request.form.get('code')
    try:
        company = finnhub_client.company_profile2(symbol=code)
        company = Company(label=company['name'], value=company["ticker"], logo=company["logo"], weburl=company["weburl"])
        db.session.add(company)
        db.session.commit()
        # response = Response("Company registered successfuly", status=200)
        response =company.serialize 
    except SQLAlchemyError as e:
        error = str(e.__dict__['orig'])
        response = Response(error, status=400)
    except KeyError as e:
        error = str(e)
        response = Response(error, status=404)
    

    return response


def get_stock(code, start, end):
    """Get stock candles data"""

    formatDate = lambda date: dp.parse(date).strftime('%s')
    start = formatDate(start)
    end = formatDate(end)
    # res = finnhub_client.stock_candles(code, 'D', 1590988249, 1650672000)
    res = finnhub_client.stock_candles(code, 'D', start, end)

    candles = []
    if res['s'] == 'no_data': return [] 

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

    return candles
