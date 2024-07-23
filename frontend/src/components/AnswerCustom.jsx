import './Answer.css'
export default function AnswerCustom({ query, emp, job, dop, cond }) {
    return (
        <div className="answer">
            <p>{query} : {emp}, {job}, {dop}, {cond}</p>
        </div>
    )
}