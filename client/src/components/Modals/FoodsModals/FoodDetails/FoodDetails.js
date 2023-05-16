import './FoodDetails.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import foodIcon from '../../../../assets/images/icons/kitchen.svg';

const FoodDetails = (props) =>{
    const {show, food, onClose} = props;

    if(!show){
        return null;
    }

    return (<>
        <div className='food-details'>
            <div className='food-details__content'>
                <div className='food-details__header'>
                    <img className='food-details__icon' src={backIcon} alt="Back arrow icon" onClick={onClose}/>
                    <h2 className='food-details__title'> {food.food_name}</h2>
                </div>
                <img className='food-details__icon' src={foodIcon} alt="food icon"></img>
                <div>
                    <p> Owner: </p> 
                    <p> {food.food_name}</p>
                </div>
                <div>
                    <p> Number of Dishes: </p>
                    <p> {food.num_leftovers}</p>
                </div>
                <div>
                    <p> Number of Leftovers:</p>
                    <p> {food.num_leftovers}</p>
                </div>
            </div>
        </div>
    </>)
}


export default FoodDetails;