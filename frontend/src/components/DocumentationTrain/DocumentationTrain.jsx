import './DocumentationTrain.css'
import JsonExample from './JsonExample'

export default function DocumentationTrain() {
    return (
        <div className="docs">
            <h2>Использование функции обучения модели</h2>
            <div>
                <p className='docs-p'>Вы можете обучить собственную модель на своих данных, для предсказывания необходимых признаков</p>
                <p className='docs-p'>Для этого:</p>
                <div className='points'>
                    <ul>
                        <li>Загрузите файл формата json</li>
                        <li>Введите тип модели для обучения</li>
                        <li>Нажмите старт</li>
                        <li>Получите предсказания</li>
                    </ul>
                </div>

                <h2>Требования</h2>
                <div className='points'>
                    <ul>
                        <li>В файле должны быть указаны целевые переменные, данные для предсказания и датасет для обучения</li>
                        <li>Поддерживаемые типы модели для обучения: (lr: LogisticRegression, rf: RandomForestClassifier)</li>
                    </ul>
                </div>
                <JsonExample />
            </div>
        </div>
    )
}