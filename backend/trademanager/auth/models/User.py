from trademanager.database import db           
from flask_login import UserMixin   
class User(UserMixin, db.Model):
    """An admin user capable of viewing reports.

    :param str email: email address of user
    :param str password: encrypted password for the user

    """
    __tablename__ = 'user'

    id=db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, password):
        super(User, self).__init__()
        self.email=email
        self.password=password

