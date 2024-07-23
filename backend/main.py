import uvicorn
import numpy as np
from fastapi import FastAPI
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.middleware.cors import CORSMiddleware

from routers import router

origins = [
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "http://127.0.0.1:3306",
    "http://localhost:3306",
]

app = FastAPI()


app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173", "http://87.228.13.226"], for serer
    # allow_origins = ['http://172.20.10.2:5173', 'http://localhost:5173', ' http://localhost:8000']
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/isalive")
# async def is_alive():
#     await "OK"


# @app.get(f"/getAnswer")
# async def get_answer(quastion: str):
#     answer = {"answer": [{"занятость": "Полный день"}, {"Профессия": "Тестировщик"}]}
#     # answer1 = model.get_predict(np.array(quastion).reshape((1, 1)))
#     q = np.array(quastion).reshape((1, 1))
#     print(q)
#     return answer


# @app.get("/docs", include_in_schema=False)
# async def get_swagger():
#     return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")


# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=5049)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
