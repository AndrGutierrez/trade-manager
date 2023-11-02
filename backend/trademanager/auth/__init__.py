from flask import Blueprint, jsonify, request, Response
from flask_login import login_required, login_user, logout_user
from trademanager.models.User import User
auth_bp = Blueprint('auth_bp', __name__)
from trademanager.database import db
from werkzeug.security import generate_password_hash, check_password_hash
from trademanager.login_manager import login_manager


@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(user_id) 

@auth_bp.route('/register', methods=["GET", "POST"])
def register():

    email = str(request.form.get('email'))
    password = str(request.form.get('password'))
    passwordConfirmation = str(request.form.get('passwordConfirmation'))
    message="User created Successfully"

    response = Response(message, status=200, mimetype="application/json")
    if password != passwordConfirmation:
        response = Response("Passwords don't match", status=400, mimetype="application/json")
    else:
        try:
            user=User(email=email, password=password)
            user.signup()
        except Exception as e: 
            print(e)
            response = Response("User Already exists", status=400, mimetype="application/json")
            pass 



    return response

@auth_bp.route('/logout', methods=["GET"])
@login_required
def logout():
    logout_user()
    response = Response("Logout", status=200, mimetype="application/json")
    return response

@auth_bp.route('/login', methods=["GET", "POST"])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = db.session.query(User).filter_by(email=email).first()
        right_password =user.check_password(password)
        message=f"User {email} logged in"
        response = Response(message, status=200, mimetype="application/json")
        if right_password:
            login_user(user)
        else:
            response = Response("Password or email don't match", status=403, mimetype="application/json")
    except Exception as e:
            print("#######")
            print(e.__str__())
            response = Response("User doesn't exist", status=403, mimetype="application/json")

    return response

