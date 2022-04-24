'''Flask application setup'''
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from trademanager.database import db
from trademanager.models import Company


def create_app():
    '''Application config'''
    load_dotenv()
    myapp = Flask(__name__)
    CORS(myapp)
    DATABASE_USER = os.environ.get('DATABASE_USER')
    DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
    DATABASE_HOST = os.environ.get('DATABASE_HOST')
    DATABASE_NAME = os.environ.get('DATABASE_NAME')
    myapp.config[
        'SQLALCHEMY_DATABASE_URI'] = f'mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}'
    myapp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(myapp)
    # db.create_all()

    myapp.app_context().push()
    db.create_all()
    myapp.config['CORS_HEADERS'] = 'Content-Type'
    return myapp


app = create_app()
