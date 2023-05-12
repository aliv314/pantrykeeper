import './NewPantryModal.scss'
import closeIcon from '../../../../assets/images/icons/close.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg'
const NewPantryModal = (props) => {
    const {show} = props;

    if(!show){
        return null;
    }

    return (
        <div className="new-pantry">
            <div className='new-pantry__content'>
                <div className='new-pantry__head'>
                    <h1 className='new-pantry__title'> New Pantry </h1>
                    <img src={closeIcon} alt={'Icon to close modal.'}/>
                </div>
                <form className='new-pantry__form'>
                    <img className = 'new-pantry__icon' src={pantryIcon} alt='Kitchen Icon'/>
                    <p className='new-pantry__label'> Name </p>
                    <input className='new-pantry__input' placeholder="Pantry Name"></input>
                    <div className='new-pantry__buttons'>
                        <button className='new-pantry__button' type = "submit">Create</button>
                        <button className='new-pantry__button' type = "button"> Cancel </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPantryModal;