import './NewIngredientModal.scss'
import searchIcon from '../../../assets/images/icons/search.svg'
import { useState } from 'react'
const NewIngredientModal = () => {

    const [ingredient, setIngredient] = useState("");
    const url = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}&q=onion&limit=3`
    return (
        <div className='new-ingredient'>
            <div className='new-ingredient__content'>
                <h2> Add Ingredient </h2>
                <p> Search </p>
                <form className='new-ingredient__form'>
                    <input className= 'new-ingredient__input' onChange={(e) => setIngredient(e.target.value)} value={ingredient}></input>
                    <button type='Submit'>Add</button>
                </form>

            </div>
        </div>
    )
}

export default NewIngredientModal;

