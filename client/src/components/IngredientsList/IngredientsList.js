import './IngredientsList.scss';
import NewItemCard from '../Cards/NewCard/NewCard';
import { useState } from 'react';
import NewIngredientModal from '../Modals/NewIngredientModal/NewIngredientModal';

const IngredientsList = (props) => {
    const {ingredients} = props;

    const [showNew, setShowNew] = useState(false);
    
    return (
        <>  
            <NewIngredientModal></NewIngredientModal>
            <section className='ingredients'>
                <h3> Ingredients </h3>
                <ul>
                    <li>
                        <NewItemCard title={'Ingredient'} onCLickHandler = {() => setShowNew(true)}></NewItemCard>
                    </li>
                </ul>
            </section>
        </>
        
    )
}

export default IngredientsList;