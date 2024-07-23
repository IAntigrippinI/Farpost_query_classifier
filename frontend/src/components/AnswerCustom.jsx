import './Answer.css'
export default function Answer({ answerdata }) {
    return (
        <div className="answer">
            <p>должность : {answerdata.position}, занятость: {answerdata.employment}, дополнительно : {answerdata.additance}, кондиции: {answerdata.conditions}, общая фраза: {answerdata.phrase}</p>
        </div>
    )
}