from trademanager.database import db

Column = db.Column


class Company(db.Model):
    id = Column(db.Integer, primary_key=True)
    label = Column(db.String(256), nullable=False)
    value = Column(db.String(4), unique=True, nullable=False)

    def __init__(self, label, value):
        self.label = label
        self.value = value

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
