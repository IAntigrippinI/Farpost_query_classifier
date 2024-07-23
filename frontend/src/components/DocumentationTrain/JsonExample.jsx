import './JsonExample.css'

export default function JsonExample() {
    // Пример данных JSON
    const jsonData = {
        "predicted_values": [
            "employment",
            "more"
        ],
        "predict": [
            {
                "query": "Программист"
            }
        ],
        "data": [
            {
                "query": "Data Scientist",
                "employment": "блабла",
                "more": "За пачку чипсов"
            },
            {
                "query": "Уборщик",
                "employment": "блабла",
                "more": "За спасибо"
            }
        ]
    }
    return (
        <div>
            <h1>Пример содержимого JSON</h1>
            <pre className='json'>{JSON.stringify(jsonData, null, 2)}</pre>
        </div >
    );
}
