import './FoodsList.scss';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';

//Cards
import ItemCard from '../Cards/ItemCard/ItemCard';
import NewItemCard from '../Cards/NewCard/NewCard';

//Modals
import NewFood from '../Modals/FoodsModals/NewFood/NewFood';
import FoodDetails from '../Modals/FoodsModals/FoodDetails/FoodDetails';

//Icons
import foodIcon from '../../assets/images/icons/nutrition.svg'
import deleteIcon from '../../assets/images/icons/delete.svg'
import axios from 'axios';
import { backend } from '../../firebase';

const FoodsList = (props) => {
    const {pantryId, foods} = props
    const [food, setFood] = useState({});
    const [showNew, setShowNew] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    
    
    const handleDelete = (e, foodId) => {
        e.preventDefault();
        axios.delete(`${backend}/api/foods/${pantryId}/${foodId}`)
        .then(res => {console.log(res)})
        .catch(err => console.log(err));    
    }

    return (
        <>  
            {showNew &&<NewFood show={showNew} onCloseHandler={() => setShowNew(false)}></NewFood>}
            {showDetails && food && <FoodDetails show={showDetails} food={food} onClose={() => setShowDetails(false)}></FoodDetails>}
            <section className='foods'>
                <ul className='foods__list'>
                    {foods && foods.map((food, i) => {
                        return ( 
                        <li key={uuidv4()}className='foods__list-item'>
                            <ItemCard 
                            key={uuidv4()} 
                            itemName={food.food_name} 
                            icon ={foodIcon}
                            onClickDetail = {() => {
                                setFood(foods[i]);
                                setShowDetails(true);   
                            }}
                            secondaryIcon = {deleteIcon}
                            onClickSecondary = {(e) => handleDelete(e, food.food_id)} 
                            />
                        </li>
                        )
                    })}
                    <li className='foods__list-item'>
                        <NewItemCard title={'Food'} onClickHandler = {() => setShowNew(true)}></NewItemCard>
                    </li>
                </ul>
            </section>
        </>
        
    )
}

export default FoodsList;