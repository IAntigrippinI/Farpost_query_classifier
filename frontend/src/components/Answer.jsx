import './Answer.css'
export default function Answer({ empl, profArea }) {
    return (
        <div className="answer">
            <p>должность : {profArea}, занятость: {empl}</p>
        </div>
    )
}