from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
import json


app = Flask(__name__)

client = PyMongo(app, uri="mongodb://localhost:27017/Office")
db = client.db


@app.route("/addStudent", methods=["POST"])
def add_one():
    data1 = json.loads(request.data)
    db.employee.insert_one(data1)
    return jsonify(message="success")


@app.route("/getStudent", methods=["GET"])
def fetch():
    s = ""
    a1 = db.employee.find()
    for i in a1:
        s += "{ name: " + i["name"] + "  email: " + i["email"] + "}  "
    # print(s)
    return jsonify(s)


@app.route("/getOneStudent", methods=["GET"])
def fetchOne():
    data1 = json.loads(request.data)

    a1 = db.employee.find_one({"name": data1["name"]})
    s = "{ name: " + a1["name"] + "  email: " + a1["email"] + "}  "
    print(s)
    return s


@app.route("/updateStudent/<id>", methods=["PUT"])
def update(id):
    data1 = json.loads(request.data)
    print(data1["name"])
    result = db.employee.update_one(
        {'_id': id}, {"$set": {'name': data1["name"]}})

    return jsonify(message="updated successfully")


@app.route("/deleteStudent/<id>", methods=["DELETE"])
def delete(id):
    data1 = json.loads(request.data)

    # print("daataaa", data1)
    a1 = db.employee.delete_one({"name": data1["name"]})

    return jsonify(message="deleted successfully")


if __name__ == "__main__":
    app.run(debug=True)
