import './NewPantryModal.scss'
import {useState} from 'react';
import closeIcon from '../../../../assets/images/icons/close.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg'
const NewPantryModal = (props) => {

    const {show, onSubmit, onClose} = props

    const [pantryName, setPantryName] = useState("");

    if(!show){
        return null;
    }

    return (
        <div className="new-pantry">
            <div className='new-pantry__content'>
                <div className='new-pantry__head'>
                    <h1 className='new-pantry__title'> New Pantry </h1>
                    <img onClick={onClose} src={closeIcon} alt={'Icon to close modal.'}/>
                </div>
                <form onSubmit={(e) => {onSubmit(e, pantryName)}} className='new-pantry__form'>
                    <img className = 'new-pantry__icon' src={pantryIcon} alt='Kitchen Icon'/>
                    <p className='new-pantry__label'> Name </p>
                    <input className='new-pantry__input' placeholder="Pantry Name" onChange={(e) => setPantryName(e.target.value)} value={pantryName} ></input>
                    <div className='new-pantry__buttons'>
                        <button className='new-pantry__button' type = "submit">Create</button>
                        <button className='new-pantry__button' type = "button" onClick={onClose}> Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPantryModal;