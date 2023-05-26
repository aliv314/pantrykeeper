import './NewFood.scss'

import axios from 'axios';
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

import Async, { useAsync } from 'react-select/async';
//Note: Pass in an array of objects.
import CartList from '../../../CartList/CartList'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import BackButton from '../../../BackButton/BackButton';

const NewFood = (props) => {
    const {id} = useParams();
    const {show, handleNew, onClose} = props;

    const [foodType, setFoodType] = useState("")
    const [inputFood, setInputFood] = useState({});
    const [foods, setFoods] = useState([])
    const [user, setUser] = useState({})

    const [timer, setTimer] = useState(null);

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            console.warn("User not logged in")
        }
        });
    }, [auth])

    if(!show){
        return null;
    }
    
    const foodsUrl = `https://api.edamam.com/auto-complete?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_APP_KEY}`

    //Gets suggestions from the EDAMAM API
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

    //Submit list to the foods
    const handleCartSubmit = (e) => {
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
            user: user.displayName
        }
        setFoods([formattedFood, ...foods])
        setInputFood({})
        e.target.reset();
    }

    const handleCartCancel = (foodName) => {
        setFoods(foods.filter(food => food.name !== foodName))
    }


    return (
        <div className='new-food' onClick={onClose}>
            <div className='new-food__content' onClick={(e) => e.stopPropagation()}>
                <div className='new-food__header'>
                    <BackButton onClose ={onClose}/>
                    <h2> Add Food </h2>
                </div>
                <form className='new-food__form' onSubmit={handleCartSubmit}>
                    <p className='new-food__prompt'> Search </p>
                    <Async className = 'new-food__input' value={inputFood} onChange={(value) => setInputFood(value)} loadOptions={getSuggestions}></Async>
                    <p className='new-food__prompt'> Type </p>
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
                    <button className= 'new-food__button' type='Submit'>Add Foods to Cart</button>
                </form>
                <section className='cart-section'>
                    <h3 className='cart-section__title'> Cart </h3>
                    <CartList foods={foods} onCancel={(foodName) => handleCartCancel(foodName)}/>
                    {!foods.length && <p className='new-food__text'> Nothing in cart </p>}
                    <button className='cart-section__button' onClick={(e) => handleNew(e, foods)}> Submit </button>
                    <button className='cart-section__button' onClick={() => {onClose(); setFoods([])}}> Cancel </button>
                </section>
            </div>
        </div>
    )
}

export default NewFood;

