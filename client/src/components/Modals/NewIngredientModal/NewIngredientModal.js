import './NewIngredientModal.scss'
import { uuidv4 } from '@firebase/util';
import searchIcon from '../../../assets/images/icons/search.svg'
import { useEffect, useState } from 'react'
import axios from 'axios';
import SearchSuggestions from '../../SearchSuggestions/SearchSuggestions';
const NewIngredientModal = () => {

    const [ingredient, setIngredient] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [ingredientSet, setIngredientSet] = useState([])
    const [timer, setTimer] = useState(null);

    const ingredientsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`

    const getSuggestions = e => {
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            axios.get(`${ingredientsUrl}&q=${ingredient}&limit=3`).then( res => {
                console.log(res.data)
                setSuggestions(res.data)
            }).catch(e => {
                console.log(e)
            })
        }, 500)
        setTimer(newTimer)
    }

    const suggestionSelected = (suggestion) => {
        setSuggestion(suggestion)
        setSuggestions([]);
        setIngredientSet([suggestion, ...ingredientSet]);
    } 

    useEffect(() => {
        setIngredient(suggestion);
    }, [suggestion])

    const handleSubmit = () => {

    }

    return (
        <div className='new-ingredient'>
            <div className='new-ingredient__content'>
                <h2> Add Ingredient </h2>
                <p> Search </p>
                <form className='new-ingredient__form' onSubmit={handleSubmit}>
                    <input className= 'new-ingredient__input' onChange={(e)=>setIngredient(e.target.value)} onKeyUp={getSuggestions} value={ingredient}></input>
                    <button type='Submit'>Add</button>
                </form>
                {suggestions && <SearchSuggestions suggestions={suggestions} onClickSuggestion={(suggestion)=>{suggestionSelected(suggestion)}}></SearchSuggestions>}
                <h3> Ingredients </h3>
                {

                }

                <button> Submit </button>
            </div>
        </div>
    )
}

export default NewIngredientModal;

