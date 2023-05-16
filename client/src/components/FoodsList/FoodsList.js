import './FoodsList.scss';
import NewItemCard from '../Cards/NewCard/NewCard';
import { useEffect, useState } from 'react';
import NewFoodModal from '../Modals/NewFoodModal/NewFoodModal';
import ItemCard from '../Cards/ItemCard/ItemCard';
import axios from 'axios';
import { uuidv4 } from '@firebase/util';
import { backend } from '../../firebase';
import { useParams } from 'react-router-dom';

import foodIcon from '../../assets/images/icons/nutrition.svg'

const FoodsList = (props) => {
    const {foods} = props
    const [showNew, setShowNew] = useState(false);
    
    
    return (
        <>  
            <NewFoodModal show={showNew} onCloseHandler={() => setShowNew(false)}></NewFoodModal>
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