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
                <div>
                    <p> Owner: </p> 
                    <p> {pantry.pantry_name}</p>
                </div>
                <div>
                    <p> Number of Dishes: </p>
                    <p> {pantry.num_leftovers}</p>
                </div>
                <div>
                    <p> Number of Leftovers:</p>
                    <p> {pantry.num_leftovers}</p>
                </div>
            </div>
        </div>
    </>)
}


export default EditPantry;