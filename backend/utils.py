import joblib
from config import classes


def cluster_predict(query):
    employment_model = joblib.load("models/employment_model.pkl")
    position_model = joblib.load("models/position_model.pkl")
    additance_model = joblib.load("models/additance_model.pkl")
    conditions_model = joblib.load("models/conditions_model.pkl")
    phrase_model = joblib.load("models/phrase_model.pkl")
    vectorizer = joblib.load("models/employment_vectorizer.pkl")

    query = vectorizer.transform([query])

    employment_pred = employment_model.predict(query[0])
    position_pred = position_model.predict(query[0])
    additance_pred = additance_model.predict(query[0])
    conditions_pred = conditions_model.predict(query[0])
    phrase_pred = phrase_model.predict(query[0])

    clusters = {
        "employment": employment_pred[0],
        "position": position_pred[0],
        "additance": additance_pred[0],
        "conditions": conditions_pred[0],
        "phrase": phrase_pred[0],
    }

    print(clusters)
    for key, value in clusters.items():
        print(classes[0][key][value])
    answer = {
        "answer": {
            "employment": classes[0]["employment"][employment_pred[0]],
            "position": classes[0]["position"][position_pred[0]],
            "additance": classes[0]["additance"][additance_pred[0]],
            "conditions": classes[0]["conditions"][conditions_pred[0]],
            "phrase": classes[0]["phrase"][phrase_pred[0]],
        }
    }
    return answer
