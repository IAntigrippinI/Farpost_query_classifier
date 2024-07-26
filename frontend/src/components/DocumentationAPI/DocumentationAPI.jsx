import './DocumentationAPI.css'
export default function DocumentationAPI() {
    const jsonDataGetAnswer =
    {
        "answer": {
            "employment": "Удаленная",
            "position": "Программист",
            "additance": "nothing",
            "conditions": "nothing"
        }
    }

    const jsonDataTrainModel =
    {
        "accuracy": {
            "emp": 0.965,
            "job": 0.8945,
            "dop": 0.9875,
            "cond": 0.991
        },
        "predicted": [
            {
                "query": "вакансия массажист на дому",
                "emp": "на дому",
                "job": "Массажист",
                "dop": "nothing",
                "cond": "nothing"
            },
            {
                "query": "юрист удаленно для студентов",
                "emp": "удаленная",
                "job": "Юрист",
                "dop": "для студентов",
                "cond": "nothing"
            }]
    }



    return (
        <div className='docs-api'>
            <h2>Документация API</h2>
            <p>Методы для общения с API</p>
            <div className="example">
                <p>getAnswer</p>
                <div className="code">
                    <p>Python</p>
                    <p>import requests</p>
                    <p>responce = requests.post('http://87.228.13.226/api/getAnswer?quastion=Программист Удаленно')</p><br />
                </div>
                <div className="responce">
                    <p>responce</p>
                    {JSON.stringify(jsonDataGetAnswer, 'fff', 2)}
                </div>
            </div>
            <div className="example">
                <p>isalive</p>
                <div className="code">
                    <p>Python</p>
                    <p>import requests</p>
                    <p>responce = requests.get('http://87.228.13.226/api/isalive')</p><br />
                </div>
                <div className="responce">
                    <p>responce</p>
                    "OK"
                </div>
            </div>
            <div className="example">
                <p>trainModel</p>
                <div className="code">
                    <p>Python</p>
                    <p>import requests</p>
                    <p>responce = requests.get('http://87.228.13.226/api/TrainModel?model=lr')</p><br />
                </div>
                <p>В тело функции передается датасет для обучения. Требования см. на вкладке Make model</p>
                <div className="responce">
                    <p>responce</p>
                    {JSON.stringify(jsonDataTrainModel, 'fff', 2)}
                </div>
            </div>
        </div >

    )
}