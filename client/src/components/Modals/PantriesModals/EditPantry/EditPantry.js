import './EditPantry.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg';

const EditPantry = (props) =>{
    const {show, pantry, onClose} = props;

    if(!show){
        return null;
    }

    return (<>
        <div className='pantry-edit'>
            <div className='pantry-edit__content'>
                <div className='pantry-edit__header'>
                    <img className='pantry-edit__icon' src={backIcon} alt="Back arrow icon" onClick={onClose}/>
                    <h2 className='pantry-edit__title'> {pantry.pantry_name}</h2>
                </div>
                <img className='pantry-edit__icon' src={pantryIcon} alt="pantry icon"></img>
                <form>
                    <input placeholder='Pantry Name'/>
                    <button> Submit </button>
                </form>
                <form>
                    <input placeholder='Add friend'/>
                    <button> Add </button>
                </form>
            </div>
        </div>
    </>)
}


export default EditPantry;