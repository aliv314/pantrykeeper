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
                    <p> Added by: </p> 
                    <p> {food.food_name}</p>
                </div>
                <div>
                    <p> Added on: </p>
                    <p> {food.timestamp}</p>
                </div>
                <div>
                    <p> Food Type </p>
                    <p> {food.food_type}</p>
                </div>
            </div>
        </div>
    </>)
}


export default FoodDetails;