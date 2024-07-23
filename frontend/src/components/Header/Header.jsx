import Button from '../Button/Button'
import './Header.css'

export default function Header() {
    return (<div className='header'>
        <h2 className='Name'>Farpost Query Classifier</h2>
        {/* <div className='buttons'>
            <Button data='Query' id={0} onClick={onClickMenu} />
            <Button data='Make models' id={1} onClick={onClickMenu} />
        </div> */}
    </div>)
}