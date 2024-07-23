import './Input.css'
import ButtonGet from '../Button/ButtonGet'
export default function Input({ onChange, onClick }) {
    return (
        <div>
            <div>
                <textarea placeholder="Input here..." className='text-area' onChange={onChange}></textarea>
            </div>
            <div>
                <ButtonGet onClick={onClick} props="Get answer">Get Answer</ButtonGet>
            </div>
        </div>
    )
}