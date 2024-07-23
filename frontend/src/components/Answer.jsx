import './Answer.css'
export default function Answer({ answerdata }) {
    return (
        <div>
            {answerdata.length == 0 ? <div>Answer will be here...</div> :
                <div className="answer">
                    <p>должность : {answerdata.position}, занятость: {answerdata.employment}, дополнительно : {answerdata.additance}, кондиции: {answerdata.conditions}, общая фраза: {answerdata.phrase}</p>
                </div>}
        </div>
    )
}