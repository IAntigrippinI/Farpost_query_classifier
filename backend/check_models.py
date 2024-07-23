import joblib
import numpy as np

from config import classes


def main(query):
    columns = ["additance", "conditions", "employment", "phrase", "position"]
    answer = {}
    vectorizer = joblib.load("models/vectorizer.pkl")
    query = vectorizer.transform([query])
    print(query.toarray())
    for column in columns:
        model = joblib.load(f"models/{column}_model.pkl")
        # print(classes[0][column][model.predict(query)[0]])
        print(model.predict(query), ":", classes[0][column][model.predict(query)[0]])
        # print(classes[column][model.predict(query)[0]])


main("скачать приложение курьер работа")
