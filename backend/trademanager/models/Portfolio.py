from trademanager.database import db
from sqlalchemy.orm import relationship
Column = db.Column


class Portfolio(db.Model):
    id = Column(db.Integer, primary_key=True)
    user_id=Column(db.Integer, db.ForeignKey('user.id'))
    user= relationship("User", back_populates="portfolio")
    company = relationship("Company", back_populates="portfolio")
    def __init__(self, user_id) -> None:
        super().__init__()
        self.user_id=user_id
        db.session.add(self)
        db.session.commit()
