import './FoodDetails.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import foodIcon from '../../../../assets/images/icons/kitchen.svg';
import BackButton from '../../../BackButton/BackButton';
const FoodDetails = (props) =>{
    const {show, food, onClose} = props; 

    if(!show){
        return null;
    }

    return (<>
        <div className='food-details'>
            <div className='food-details__content'>
                <div className='food-details__header'>
                    <BackButton onClose={onClose}/>
                    <h2 className='food-details__title'> {food.food_name}</h2>
                </div>
                <img className='food-details__image' src={foodIcon} alt="food icon"></img>
                <div className='food-details__detail'>
                    <p className='food-details__label'> Added by: </p> 
                    <p className='food-details__info'> {food.food_name}</p>
                </div>
                <div  className='food-details__detail'>
                    <p className='food-details__label'> Added on: </p>
                    <p className='food-details__info'> {food.timestamp}</p>
                </div>
                <div  className='food-details__detail'>
                    <p className='food-details__label'> Food Type </p>
                    <p className='food-details__info'> {food.food_type}</p>
                </div>
            </div>
        </div>
    </>)
}


export default FoodDetails;