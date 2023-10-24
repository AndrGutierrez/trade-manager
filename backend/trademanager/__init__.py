'''Flask application setup'''
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from trademanager.database import db

from trademanager.api import api_bp
from flask_migrate import Migrate
from trademanager.auth import auth_bp
from trademanager.login_manager import login_manager


def create_app(db_uri):
    '''Application config'''
    myapp = Flask(__name__)
    CORS(myapp)
    myapp.config[
        'SQLALCHEMY_DATABASE_URI'] = db_uri 
    myapp.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    myapp.app_context().push()
    db.init_app(myapp)
    db.create_all()

    myapp.config['CORS_HEADERS'] = 'Content-Type'
    myapp.register_blueprint(api_bp, url_prefix='/api')
    myapp.register_blueprint(auth_bp, url_prefix='/api/auth')
    migrate = Migrate(myapp, db)
    myapp.secret_key = os.environ.get('SECRET_KEY')
    login_manager.init_app(myapp)
    return myapp


load_dotenv()
DATABASE_USER = os.environ.get('DATABASE_USER')
DATABASE_PASSWORD = os.environ.get('DATABASE_PASSWORD')
DATABASE_HOST = os.environ.get('DATABASE_HOST')
DATABASE_NAME = os.environ.get('DATABASE_NAME')
DATABASE_URI = f'mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}'
app = create_app(DATABASE_URI)
