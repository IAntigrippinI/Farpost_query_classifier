import joblib
from config import classes, classes1


def cluster_predict_pol(query):
    employment_model = joblib.load("models3/emp_model.pkl")
    position_model = joblib.load("models3/job_model.pkl")
    additance_model = joblib.load("models3/dop_model.pkl")
    conditions_model = joblib.load("models3/cond_model.pkl")
    # phrase_model = joblib.load("models/phrase_model.pkl")
    vectorizer = joblib.load("models3/vectorizer.pkl")

    query = vectorizer.transform([query])

    # employment_pred = employment_model.predict(query[0])
    # position_pred = position_model.predict(query[0])
    # additance_pred = additance_model.predict(query[0])
    # conditions_pred = conditions_model.predict(query[0])
    # phrase_pred = phrase_model.predict(query[0])

    # for key, value in clusters.items()[:-1]:
    #     print(classes[0][key][value])
    answer = {
        "answer": {
            "employment": employment_model.predict(query[0])[0],
            "position": position_model.predict(query[0])[0],
            "additance": additance_model.predict(query[0])[0],
            "conditions": conditions_model.predict(query[0])[0],
            "phrase": "who",
        }
    }
    return answer


def cluster_predict(query):
    employment_model = joblib.load("models2/employment_model.pkl")
    position_model = joblib.load("models2/position_model.pkl")
    additance_model = joblib.load("models2/additance_model.pkl")
    conditions_model = joblib.load("models2/conditions_model.pkl")
    # phrase_model = joblib.load("models/phrase_model.pkl")
    vectorizer = joblib.load("models2/employment_vectorizer.pkl")

    query = vectorizer.transform([query])

    employment_pred = employment_model.predict(query[0])
    position_pred = position_model.predict(query[0])
    additance_pred = additance_model.predict(query[0])
    conditions_pred = conditions_model.predict(query[0])
    # phrase_pred = phrase_model.predict(query[0])

    clusters = {
        "employment": employment_pred[0],
        "position": position_pred[0],
        "additance": additance_pred[0],
        "conditions": conditions_pred[0],
        "phrase": "phrase",
    }

    print(clusters)
    # for key, value in clusters.items()[:-1]:
    #     print(classes[0][key][value])
    answer = {
        "answer": {
            "employment": classes1[0]["employment"][employment_pred[0]],
            "position": classes1[0]["position"][position_pred[0]],
            "additance": classes1[0]["additance"][additance_pred[0]],
            "conditions": classes1[0]["conditions"][conditions_pred[0]],
        }
    }
    return answer
