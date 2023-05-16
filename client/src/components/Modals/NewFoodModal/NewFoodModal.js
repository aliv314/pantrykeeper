import './NewFoodModal.scss'

import axios from 'axios';
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

import closeIcon from '../../../assets/images/icons/close.svg'
import { backend } from '../../../firebase';

import Async, { useAsync } from 'react-select/async';
//Note: Pass in an array of objects.
import NewFoodList from '../../NewFoodList/NewFoodList';

const NewFoodModal = (props) => {
    const {id} = useParams();
    const {show, onCloseHandler} = props;

    //food type 
    const [foodType, setFoodType] = useState("")
    //Object with label, value for react-select
    const [inputFood, setInputFood] = useState({});
    //Set of foods used to send to the api.
    const [foods, setFoods] = useState([])
    

    const [timer, setTimer] = useState(null);

    if(!show){
        return null;
    }
    
    const foodsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`
    
    //Suggestion is the value currently within the <Async>
    //Callback is the value sent back to the callback   
    const getSuggestions = (suggestion, callback) => {
        //Timer undone
        clearTimeout(timer)
        //Create a new timer async.
        const newTimer = setTimeout(() => {
            axios.get(`${foodsUrl}&q=${suggestion}&limit=3`).then( res => {
                
                callback(res.data.map(suggestion => ({ label: suggestion, value: suggestion})))
            }).catch(e => {
                console.log(e)
            })
        }, 300)
        //Set the timer.
        setTimer(newTimer)
    }

    const handleAddFood = (e) => {
        e.preventDefault();
       
        //There can't be repeat foods in array sent to the API
        foods.forEach( foodItem =>{
            if(foodItem.label !== inputFood.label){
                return;
            }
        })
        const formattedFood = {
            name: inputFood.label,
            type: foodType,
        }
        setFoods([formattedFood, ...foods])
        setInputFood({})

        console.log(formattedFood);
        e.target.reset();
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
                    <Async value={inputFood} onChange={(value) => setInputFood(value)} loadOptions={getSuggestions}></Async>
                    <p className='new-food__text'> Type </p>
                    <div className='new-food__radio-group'>
                        <div className='new-food__radio'>
                            <input className='new-food__radio-button'  name="foodType" type={"radio"} value={"ingredient"} onChange={(e) => setFoodType(e.target.value)}/>
                            <p className='new-food__radio-text'> Ingredient</p>
                        </div>
                        <div className='new-food__radio'>
                            <input className='new-food__radio-button' name="foodType" type={"radio"}  value={"dish"} onChange={(e) => setFoodType(e.target.value)}/>
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

