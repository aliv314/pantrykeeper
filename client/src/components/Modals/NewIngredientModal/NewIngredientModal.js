import './NewIngredientModal.scss'
import { uuidv4 } from '@firebase/util';
import { useEffect, useState } from 'react'
import axios from 'axios';
import SearchSuggestions from '../../SearchSuggestions/SearchSuggestions';
import {useParams} from 'react-router-dom';

import closeIcon from '../../../assets/images/icons/close.svg'
import { backend } from '../../../firebase';
import NewIngredientList from '../../NewIngredientList/NewIngredientList';
const NewIngredientModal = (props) => {
    const {id} = useParams();
    const {show, onCloseHandler} = props;

    //Ingredient in search bar
    const [ingredient, setIngredient] = useState("");
    //Set of ingredients used to send to the api.
    const [ingredients, setIngredients] = useState([])
    //Suggestion to update input
    //Suggestion selected from autocomplete
    const [suggestion, setSuggestion] = useState("");
    //List of suggestions sent as prop to suggestion list component
    const [suggestions, setSuggestions] = useState([]);
    //Timer to delay api call.
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setIngredient(suggestion);
    }, [suggestion])

    if(!show){
        return null;
    }
    
    const ingredientsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    
    const getSuggestions = e => {
        //Timer undone
        clearTimeout(timer)
        //Create a new timer async.
        const newTimer = setTimeout(() => {
            axios.get(`${ingredientsUrl}&q=${ingredient}&limit=3`).then( res => {
                console.log(res.data)
                setSuggestions(res.data)
            }).catch(e => {
                console.log(e)
            })
        }, 500)
        //Set the timer.
        setTimer(newTimer)
    }

    const suggestionSelected = (suggestion) => {
        //Set suggestion to update ingredient input bar.
        setSuggestion(suggestion)
        //Closes suggestion.
        setSuggestions([]);
    } 

    

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
    }

    const submitList= (e) => {
        e.preventDefault();
        //Post body 
        const ingredientPost = {
            ingredients: ingredients,
        }
        //Axios call to add all ingredients. 
        axios.post(`${backend}/api/ingredients/${id}`, ingredientPost)
        .then( res => {
            //Clear array.
            setIngredients([])
            //Close modal.
            onCloseHandler();
        })
        .catch( error => {})
    }


    return (
        <div className='new-ingredient'>
            <div className='new-ingredient__content'>
                <div>
                    <h2> Add Ingredient </h2>
                    <img src={closeIcon} onClick={onCloseHandler} alt='close modal'/>
                </div>
                <p> Search </p>
                <form className='new-ingredient__form' onSubmit={handleAddIngredient}>
                    <input className= 'new-ingredient__input' onChange={(e)=>setIngredient(e.target.value)} onKeyUp={getSuggestions} value={ingredient}></input>
                    <button className= 'new-ingredient__input-button' type='Submit'>Add</button>
                </form>
                {suggestions && <SearchSuggestions suggestions={suggestions} onClickSuggestion={(suggestion)=>{suggestionSelected(suggestion)}}></SearchSuggestions>}
                <h3 className='new-ingredient__list-title'> Ingredients </h3>
                <NewIngredientList ingredients={ingredients}></NewIngredientList>
                <button className='new-ingredient__button' onClick={submitList}> Submit </button>
                <button className='new-ingredient__button' onClick={() => {onCloseHandler(); setIngredients([])}}> Cancel </button>
            </div>
        </div>
    )
}

export default NewIngredientModal;

