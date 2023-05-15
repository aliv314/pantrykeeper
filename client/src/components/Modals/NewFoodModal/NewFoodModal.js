import './NewFoodModal.scss'

import { useEffect, useState } from 'react'
import axios from 'axios';
import SearchSuggestions from '../../SearchSuggestions/SearchSuggestions';
import {useParams} from 'react-router-dom';

import closeIcon from '../../../assets/images/icons/close.svg'
import { backend } from '../../../firebase';
import NewFoodList from '../../NewFoodList/NewFoodList';
const NewFoodModal = (props) => {
    const {id} = useParams();
    const {show, onCloseHandler} = props;

    //Food in search bar
    const [food, setFood] = useState("");
    //Set of foods used to send to the api.
    const [foods, setFoods] = useState([])
    //Suggestion to update input
    //Suggestion selected from autocomplete
    const [suggestion, setSuggestion] = useState("");
    //List of suggestions sent as prop to suggestion list component
    const [suggestions, setSuggestions] = useState([]);
    //Timer to delay api call.
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setFood(suggestion);
    }, [suggestion])

    if(!show){
        return null;
    }
    
    const foodsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    
    const getSuggestions = e => {
        //Timer undone
        clearTimeout(timer)
        //Create a new timer async.
        const newTimer = setTimeout(() => {
            axios.get(`${foodsUrl}&q=${food}&limit=3`).then( res => {
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
        //Set suggestion to update food input bar.
        setSuggestion(suggestion)
        //Restarts suggestions
        setSuggestions([]);
    } 

    

    const handleAddFood = (e) => {
        e.preventDefault();
        //Food must match suggestion to fit the api.
        if (food !== suggestion){
            return;
        }
        //There can't be repeat foods in array sent to the API
        //Would normally use a set for this, but useState doesn't allow it.
        if(foods.includes(food)){
            //Add error here later for validation.
            console.log("Already in set!")
            return;
        }
        setFoods([food, ...foods])
    }

    const submitList= (e) => {
        e.preventDefault();
        //Post body 
        const foodPost = {
            foods: foods,
        }
        //Axios call to add all foods. 
        axios.post(`${backend}/api/foods/${id}`, foodPost)
        .then( res => {
            //Clear array.
            setFoods([])
            //Close modal.
            onCloseHandler();
        })
        .catch( error => {})
    }


    return (
        <div className='new-food'>
            <div className='new-food__content'>
                <div>
                    <h2> Add Food </h2>
                    <img src={closeIcon} onClick={onCloseHandler} alt='close modal'/>
                </div>
                <form className='new-food__form' onSubmit={handleAddFood}>
                    <p className='new-food__text'> Search </p>
                    <input className= 'new-food__input' onChange={(e)=>setFood(e.target.value)} onKeyUp={getSuggestions} value={food}></input>
                    {suggestions && <SearchSuggestions suggestions={suggestions} onClickSuggestion={(suggestion)=>{suggestionSelected(suggestion)}}></SearchSuggestions>}
                    <p className='new-food__text'> Type </p>
                    <div className='new-food__radio-group'>
                        <div className='new-food__radio'>
                            <input className='new-food__radio-button'  name="foodType" type={"radio"} value = "Ingredient"/>
                            <p className='new-food__radio-text'> Ingredient</p>
                        </div>
                        <div className='new-food__radio'>
                            <input className='new-food__radio-button' name="foodType" type={"radio"} value = "Dish"/>
                            <p className='new-food__radio-text'> Dish </p>
                        </div>
                    </div>
                    <button className= 'new-food__button' type='Submit'>Add</button>
                </form>
                
                <h3 className='new-food__list-title'> Foods </h3>
                <NewFoodList foods={foods}></NewFoodList>
                <button className='new-food__button' onClick={submitList}> Submit </button>
                <button className='new-food__button' onClick={() => {onCloseHandler(); setFoods([])}}> Cancel </button>
            </div>
        </div>
    )
}

export default NewFoodModal;

