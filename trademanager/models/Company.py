from trademanager.database import db

Column = db.Column


class Company(db.Model):
    id = Column(db.Integer, primary_key=True)
    label = Column(db.String(255), nullable=False)
    value = Column(db.String(4), unique=True, nullable=False)
    logo = Column(db.String(1023), nullable=False)
    weburl = Column(db.String(255), nullable=False)
    

    def __init__(self, label:str, value:str, logo:str, weburl:str):
        self.label = label
        self.value = value
        self.logo = logo
        self.weburl = weburl

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    @property
    def serialize(self):
        return {
                "label": self.label,
                "value": self.value,
                "logo": self.logo,
                "weburl": self.weburl,
                }
