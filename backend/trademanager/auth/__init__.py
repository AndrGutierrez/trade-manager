from flask import Blueprint, jsonify, request
from .models.User import User
auth_bp = Blueprint('auth_bp', __name__)
from trademanager.database import db

@auth_bp.route('/register', methods=["GET", "POST"])
def register():

    email = str(request.args.get("email")).upper()
    password = str(request.args.get("password"))
    passwordConfirmation = str(request.args.get("passwordConfirmation"))

    user=User(email=email, password=password)
    if password != passwordConfirmation:
        return jsonify({"message": "Password and Password Confirmation must be equal"})
    else:
        db.session.add(user)
        db.session.commit()



    return jsonify({"message": "Register"})

@auth_bp.route('/logout', methods=["GET", "POST"])
def logout():
    return jsonify({"message": "Logout"})

@auth_bp.route('/login', methods=["GET", "POST"])
def login():
    return jsonify({"message": "login"})
