import './PantryDetails.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg';
import BackButton from '../../../BackButton/BackButton';

const PantryDetails = (props) =>{
    const {show, pantry, onClose} = props;

    if(!show){
        return null;
    }
    console.log(pantry);
    return (<>
        <div className='pantry-details'>
            <div className='pantry-details__content'>
                <div className='pantry-details__header'>
                    <BackButton onClose={onClose}/>
                    <h2 className='pantry-details__title'> {pantry.pantry_name}</h2>
                </div>
                <img className='pantry-details__image' src={pantryIcon} alt="pantry icon"></img>
                <div className='pantry-details__detail'>
                    <p className='pantry-details__label'> Pantry Owner: </p> 
                    <p className='pantry-details__info'> {pantry.owner_name}</p>
                </div>
                <div className='pantry-details__detail'>
                    <p className='pantry-details__label'> Pantry Name: </p> 
                    <p className='pantry-details__info'> {pantry.pantry_name}</p>
                </div>
                <div className='pantry-details__detail'>
                    <p className='pantry-details__label'> Number of Dishes:</p>
                    <p className='pantry-details__info'> {pantry.num_leftovers}</p>
                </div>
                <div className='pantry-details__detail'>
                    <p className='pantry-details__label'> Number of Ingredients: </p>
                    <p className='pantry-details__info'> {pantry.num_foods}</p>
                </div>
            </div>
        </div>
    </>)
}


export default PantryDetails;