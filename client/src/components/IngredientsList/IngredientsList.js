import './IngredientsList.scss';
import NewItemCard from '../Cards/NewCard/NewCard';
import { useEffect, useState } from 'react';
import NewIngredientModal from '../Modals/NewIngredientModal/NewIngredientModal';
import ItemCard from '../Cards/ItemCard/ItemCard';
import axios from 'axios';
import { uuidv4 } from '@firebase/util';
import { backend } from '../../firebase';
import { useParams } from 'react-router-dom';

import ingredientIcon from '../../assets/images/icons/nutrition.svg'

const IngredientsList = () => {
    const {id} = useParams();

    const [showNew, setShowNew] = useState(false);
    const [ingredients, setIngredients] = useState([]);
   
    useEffect(() =>{
        axios.get(`${backend}/api/ingredients/${id}`)
        .then(res =>{
            console.log(res.data);
            setIngredients(res.data);
            }
        )
        .catch( e => {
            console.log(e);
        });
    }, [id])
    return (
        <>  
            <NewIngredientModal show={showNew} onCloseHandler={() => setShowNew(false)}></NewIngredientModal>
            <section className='ingredients'>
                <h3 className='ingredients__header'> Ingredients </h3>
                <ul className='ingredients__list'>
                    {ingredients && ingredients.map(ingredient => {
                        return ( 
                        <li key={uuidv4()}className='ingredients__list-item'>
                            <ItemCard key={uuidv4()} itemName={ingredient.ingredient_name} icon ={ingredientIcon}></ItemCard>
                        </li>
                        )
                    })}
                    <li className='ingredients__list-item'>
                        <NewItemCard title={'Ingredient'} onClickHandler = {() => setShowNew(true)}></NewItemCard>
                    </li>
                </ul>
            </section>
        </>
        
    )
}

export default IngredientsList;