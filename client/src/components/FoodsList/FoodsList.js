import './FoodsList.scss';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';

//Cards
import ItemCard from '../Cards/ItemCard/ItemCard';
import NewItemCard from '../Cards/NewCard/NewCard';

//Modals
import NewFood from '../Modals/FoodsModals/NewFood/NewFood';
import FoodDetails from '../Modals/FoodsModals/FoodDetails/FoodDetails';

import foodIcon from '../../assets/images/icons/nutrition.svg'

const FoodsList = (props) => {
    const {foods} = props
    const [showNew, setShowNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    
    
    return (
        <>  
            <NewFood show={showNew} onCloseHandler={() => setShowNew(false)}></NewFood>
            <FoodDetails show={showDetails} onCloseHandler={() => setShowDetails(false)}></FoodDetails>
            <section className='foods'>
                <h3 className='foods__header'> Foods </h3>
                <ul className='foods__list'>
                    {foods && foods.map(food => {
                        return ( 
                        <li key={uuidv4()}className='foods__list-item'>
                            <ItemCard key={uuidv4()} itemName={food.food_name} icon ={foodIcon}></ItemCard>
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