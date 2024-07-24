import './Answer.css'
export default function AnswerCustom({ dataCustom }) {
    //console.log('answerdata', dataCustom)
    return (
        <div>
            <div className="answer">
                <p>{JSON.stringify(dataCustom)}</p>
            </div>
        </div>
    )
}