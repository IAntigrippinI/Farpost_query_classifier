from fastapi import APIRouter
from utils import cluster_predict, cluster_predict_pol

import warnings
import numpy as np
import pandas as pd
from pandas import json_normalize
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RandomizedSearchCV, train_test_split
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

# from init import model
from config import available__models

warnings.filterwarnings("ignore")
router = APIRouter()


@router.get("/isalive")
async def is_alive():
    return "OK"


@router.post(f"/getAnswer")
async def get_answer(quastion: str):
    print(quastion)
    # answer = cluster_predict(quastion)
    answer = cluster_predict(quastion)
    return answer

    # answer = {
    #     "query": quastion,
    #     "answer": [
    #         {"empl": "Полный день", "profArea": "programmer"},
    #         {"empl": "Удаленная работа", "profArea": "Тестировщик"},
    #     ],
    # }
    # # answer1 = model.get_predict(np.array(quastion).reshape((1, 1)))
    # q = np.array(quastion).reshape((1, 1))
    # print(q)
    # return answer


@router.post(f"/trainModel")
async def train_model(model: str, data: dict):
    try:
        predicted_values = data["predicted_values"]
        for_predict = data["predict"]
        df_pred = pd.json_normalize(for_predict)
        data = data["data"]
        df = pd.json_normalize(data).iloc[:10000]

        # Separate features and target variables
        X = df.drop(predicted_values, axis=1)

        # Text processing with TfidfVectorizer
        vectorizer = TfidfVectorizer()

        # Assuming the column containing text data is the first column
        X_text = vectorizer.fit_transform(X.iloc[:, 0])

        # Convert the tfidf_matrix to a DataFrame for better readability
        tfidf_df = pd.DataFrame(
            X_text.toarray(), columns=vectorizer.get_feature_names_out()
        )

        # Model selection
        if model in available__models:
            if model == "lr":
                query_model = LogisticRegression(C=0.8, random_state=0)
            else:
                query_model = RandomForestClassifier(
                    random_state=0, n_estimators=150, max_depth=15
                )
        else:
            query_model = LogisticRegression(C=0.8, random_state=0)

        X_pred = vectorizer.transform(df_pred.iloc[:, 0])
        X_pred_df = pd.DataFrame(
            X_pred.toarray(), columns=vectorizer.get_feature_names_out()
        )
        # print(f"make model {models}")
        pred = df_pred.copy()
        # print("start")
        acc = {}
        for target in predicted_values:
            # print(f"train for {target}")
            y = df[target]

            X_train, X_test, y_train, y_test = train_test_split(
                tfidf_df, y, test_size=0.2, random_state=0
            )
            # rs = RandomizedSearchCV(
            #     models_for_make[models],
            #     param_distributions=param_for_make[models],
            #     n_iter=1,
            #     cv=5,
            #     random_state=0,
            # )
            # rs = LogisticRegression(class_weight="balanced", C=0.5)
            query_model.fit(X_train, y_train)

            y_pred_train = query_model.predict(X_train)
            print(f"{target} train_accuracy:", accuracy_score(y_train, y_pred_train))

            y_pred_test = query_model.predict(X_test)
            acc_test = accuracy_score(y_test, y_pred_test)
            print(f"{target} test_accuracy:", acc_test)
            acc[target] = acc_test

            pred[target] = query_model.predict(X_pred_df)

        result = {"accuracy": acc, "predicted": pred.to_dict(orient="records")}

        print(result)
        return result
    except Exception as e:
        return {"predicted": {"error": e}}
