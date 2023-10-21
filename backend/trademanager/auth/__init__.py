from flask import Blueprint, jsonify, request, Response
from .models.User import User
auth_bp = Blueprint('auth_bp', __name__)
from trademanager.database import db

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
            db.session.add(user)
            db.session.commit()
        except Exception as e: 
            response = Response("User Already exists", status=400, mimetype="application/json")
            pass 



    return response

@auth_bp.route('/logout', methods=["GET", "POST"])
def logout():
    return jsonify({"message": "Logout"})

@auth_bp.route('/login', methods=["GET", "POST"])
def login():
    return jsonify({"message": "login"})
