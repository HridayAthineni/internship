from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    firstname = db.Column(db.String(200), nullable=False)
    lastname = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    department = db.Column(db.String(200), nullable=False)

    def __init__(self, id, firstname, lastname, phone, department):
        self.id = id
        self.firstname = firstname
        self.lastname = lastname
        self.phone = phone
        self.department = department
