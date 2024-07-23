import joblib

import numpy as np

from config import models_for_make


class Model:
    def __init__(self, model_path) -> None:
        model = joblib.load(model_path)

    def get_predict(self, data: np.array) -> np.array:
        self.model.predict(data)


class Maker_model:
    def __init__(self, type_estimator: str = "lr"):
        if type_estimator in models_for_make.keys():
            self.estimator = models_for_make[type_estimator]
        else:
            self.estimator = models_for_make["lr"]

    def start_train(self, X, y):
        try:
            self.estimator.fit(X, y)
        except Exception as e:
            print("can not train model", e)

    def get_predict(self, X):
        return self.estimator.predict(X)
