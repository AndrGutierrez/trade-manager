from .  import api_bp
from dotenv import load_dotenv
from flask import jsonify, request
from flask.wrappers import Response
from sqlalchemy.exc import SQLAlchemyError
from trademanager.database import db
from trademanager.models.Company import Company
from trademanager.models.Portfolio import Portfolio
import os
import finnhub
from .utils import get_stock, get_finnhub_data
from flask_login import login_required

load_dotenv()
API_KEY = os.environ.get("API_KEY")
try:
    finnhub_client = finnhub.Client(api_key=API_KEY)
except:
    pass

data=get_finnhub_data()
@api_bp.route('/', methods=['GET'])
def home():
    """Home route"""
    company_data=data
    if (len(data)==0): company_data=get_finnhub_data()
    name = str(request.args.get("name")).upper()
    res = [{ 
            "value": company["symbol"], 
            "label": company["description"]}
    for company in company_data if name in company["description"].upper()][:50]
    return jsonify(res)

@api_bp.route('/candlesticks')
def candlesticks():
    code = request.args.get('code')
    start = request.args.get('from')
    end = request.args.get('to')
    stocks = jsonify(get_stock(code, start, end))
    return stocks


@api_bp.route('/user/portfolio')
def get_portfolio():
    try:
        userid=request.args.get("user")
        portfolio= Portfolio.query.filter(Portfolio.user_id==userid).first()
        registered_companies = Company.query.filter(Company.portfolio_id==portfolio.id)
        db.session.commit()
        registered_companies = [i.as_dict() for i in registered_companies]
        registered_companies = jsonify(registered_companies)
    except:
        db.session.rollback()
        registered_companies= Response("Error getting portfolio", status=400)

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
    user = request.form.get('user')
    try:
        company = finnhub_client.company_profile2(symbol=code)
        portfolio= Portfolio.query.filter(Portfolio.user_id==user).first()
        company = Company(label=company['name'], value=company["ticker"], logo=company["logo"], weburl=company["weburl"], portfolio_id=portfolio.id)
        db.session.add(company)
        db.session.commit()
        # response = Response("Company registered successfuly", status=200)
        response =company.serialize 
    except SQLAlchemyError as e:
        error =e.__str__() 
        response = Response(error, status=400)
    except KeyError as e:
        error = str(e)
        response = Response(error, status=404)
    

    return response


