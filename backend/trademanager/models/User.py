from sqlalchemy.orm import relationship
from trademanager.database import db           
from flask_login import UserMixin   
from werkzeug.security import generate_password_hash, check_password_hash
class User(UserMixin, db.Model):
    """An admin user capable of viewing reports.

    :param str email: email address of user
    :param str password: encrypted password for the user

    """
    __tablename__ = 'user'

    id=db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    portfolio = relationship("Portfolio", back_populates="user")

    def __init__(self, email, password, username):
        super(User, self).__init__()
        self.email=email
        self.password=password
        self.username=username

    def signup(self):
        self.password=generate_password_hash(self.password, method='sha256')
        db.session.add(self)
        db.session.commit()
    def check_password(self, password):
        return check_password_hash(self.password, password) 

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
