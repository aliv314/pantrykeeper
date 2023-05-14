import './NewIngredientModal.scss'
import { uuidv4 } from '@firebase/util';
import searchIcon from '../../../assets/images/icons/search.svg'
import { useEffect, useState } from 'react'
import axios from 'axios';
import SearchSuggestions from '../../SearchSuggestions/SearchSuggestions';

const NewIngredientModal = (props) => {
    const {show, onOpen, onClose} = props;
    //Ingredient in search bar
    const [ingredient, setIngredient] = useState("");
    //Suggestion selected from autocomplete
    //Set of ingredients used to send to the api.
    const [ingredients, setIngredients] = useState([])
    //Suggestion to update input
    const [suggestion, setSuggestion] = useState("");
    //List of suggestions sent as prop to suggestion list component
    const [suggestions, setSuggestions] = useState([]);
    //Timer to delay api call.
    const [timer, setTimer] = useState(null);

    const ingredientsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    
    const ingredientSet = new Set();
    
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
        //Set suggestion to update ingredient input bar.
        setSuggestion(suggestion)
        //Closes suggestion.
        setSuggestions([]);
    } 

    useEffect(() => {
        setIngredient(suggestion);
    }, [suggestion])

    const handleAddIngredient = (e) => {
        e.preventDefault();
        //Ingredient must match suggestion to fit the api.
        if (ingredient !== suggestion){
            return;
        }
        //There can't be repeat ingredients in array sent to the API
        //Would normally use a set for this, but useState doesn't allow it.
        if(ingredients.includes(ingredient)){
            //Add error here later for validation.
            console.log("Already in set!")
            return;
        }
        setIngredients([ingredient, ...ingredients])
        //Axios call.

        //Clear hashset for safety.
    }


    return (
        <div className='new-ingredient'>
            <div className='new-ingredient__content'>
                <h2> Add Ingredient </h2>
                <p> Search </p>
                <form className='new-ingredient__form' onSubmit={handleAddIngredient}>
                    <input className= 'new-ingredient__input' onChange={(e)=>setIngredient(e.target.value)} onKeyUp={getSuggestions} value={ingredient}></input>
                    <button type='Submit'>Add</button>
                </form>
                {suggestions && <SearchSuggestions suggestions={suggestions} onClickSuggestion={(suggestion)=>{suggestionSelected(suggestion)}}></SearchSuggestions>}
                <h3> Ingredients </h3>
                <section>
                    {ingredients && ingredients.map(item => {
                        return(
                        <div key={uuidv4()}> 
                            <p> {item} </p>
                        </div>)
                    })}
                </section>

                <button> Submit </button>
            </div>
        </div>
    )
}

export default NewIngredientModal;

