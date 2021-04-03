import os
from flask import Flask
from models import User
from models import db

app = Flask(__name__)
os.environ["DATABASE_URL"] = "mysql://root:1111@localhost:3306/test"
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


def main():
    print(os.environ["DATABASE_URL"])
    db.create_all()


if __name__ == "__main__":
    with app.app_context():
        main()
