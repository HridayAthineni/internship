import csv
import json
import os
import xmltodict


def make_json(inputFilePath, outputFilePath):

    fileName, fileExtension = os.path.splitext(inputFilePath)
    # csv
    if fileExtension == ".csv":
        csvFilePath = inputFilePath
        data = {}

        with open(csvFilePath, encoding='utf-8') as csvf:
            csvReader = csv.DictReader(csvf)

            for rows in csvReader:

                key = rows['Series reference']  # primary key
                data[key] = rows
    # xml
    elif(fileExtension == ".xml"):
        with open(inputFilePath) as xml_file:

            data = xmltodict.parse(xml_file.read())
            xml_file.close()

    json_data = json.dumps(data, indent=4)
    with open(outputFilePath, "w", encoding='utf-8') as json_file:
        json_file.write(json_data)
        json_file.close()


make_json("records.xml", "data.json")
