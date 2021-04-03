from flask import Flask, sessions, request
from flask_session import Session
import os

from sqlalchemy.orm import query
from models import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config.from_object(__name__)
Session(app)

app.config["TEMPLATES_AUTO_RELOAD"] = True


@app.route("/getuser", methods=["GET"])
def get_users():
    data = User.query.all()
    users = {}
    for user in data:
        temp = {}
        temp["emp_id"] = user.id
        temp["last_name"] = user.lastname
        temp["first_name"] = user.firstname
        temp["phone"] = user.phone
        temp["department"] = user.department
        users[user.id] = temp
    return users


@app.route("/getOneUser", methods=["GET"])
def get_user():
    emp_id = request.form.get("emp_id")
    user = User.query.get(emp_id)
    temp = {}
    temp["emp_id"] = user.id
    temp["last_name"] = user.lastname
    temp["first_name"] = user.firstname
    temp["phone"] = user.phone
    temp["department"] = user.department
    return temp


@app.route("/adduser", methods=["POST"])
def post_users():
    emp_id = request.form.get("emp_id")
    first_name = request.form.get("first_name")
    last_name = request.form.get("last_name")
    phone = request.form.get("phone")
    department = request.form.get("department")
    new_user = User(emp_id, first_name, last_name, phone, department)
    db.session.add(new_user)
    db.session.commit()
    return {"code": 200, "message": "Success"}


@app.route("/updateuser", methods=["DELETE"])
def delete_users():
    emp_id = request.form.get("emp_id")
    user = User.query.get(emp_id)
    db.session.delete(user)
    db.session.commit()
    return {"code": 200, "message": "Success"}


@app.route("/deleteuser", methods=["PATCH"])
def update_users():
    emp_id = request.form.get("emp_id")
    user = User.query.get(emp_id)
    user.lastname = request.form.get("last_name")
    db.session.add(user)
    db.session.commit()
    return {"code": 200, "message": "Success"}
