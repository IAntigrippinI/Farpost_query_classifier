import './ButtonGet.css'

export default function ButtonGet({ props, id, onClick }) {
    return (
        <button className="button-get" onClick={onClick}>{props}</button>
    )
}