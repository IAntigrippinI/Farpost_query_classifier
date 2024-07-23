import './Button.css'

export default function Button({ props, id, onClick, isActive }) {
    return (
        <button className={isActive ? 'button-menu active' : 'button-menu'} onClick={onClick}>{props}</button>
    )
}