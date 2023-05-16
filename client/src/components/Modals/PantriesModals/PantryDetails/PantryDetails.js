import './PantryDetails.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg';

const PantryDetails = (props) =>{
    const {show, pantry, onClose} = props;

    if(!show){
        return null;
    }

    return (<>
        <div className='pantry-details'>
            <div className='pantry-details__content'>
                <div className='pantry-details__header'>
                    <img className='pantry-details__icon' src={backIcon} alt="Back arrow icon" onClick={onClose}/>
                    <h2 className='pantry-details__title'> {pantry.pantry_name}</h2>
                </div>
                <img className='pantry-details__icon' src={pantryIcon} alt="pantry icon"></img>
                <div>
                    <p> Owner: </p> 
                    <p> {pantry.pantry_name}</p>
                </div>
                <div>
                    <p> Number of Dishes: </p>
                    <p> {pantry.num_dish}</p>
                </div>
                <div>
                    <p> Number of Leftovers:</p>
                    <p> {pantry.num_leftovers}</p>
                </div>
            </div>
        </div>
    </>)
}


export default PantryDetails;