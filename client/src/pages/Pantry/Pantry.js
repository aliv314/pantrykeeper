import './Pantry.scss'
import { backend } from '../../firebase';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import backIcon from '../../assets/images/icons/arrow_back.svg'
import ingredientIcon from '../../assets/images/icons/nutrition.svg'
import dishIcon from '../../assets/images/icons/dinner_dining.svg'

import FoodsList from '../../components/FoodsList/FoodsList';
import SectionButton from '../../components/SectionButton/SectionButton';

const Pantry = () => {
    const {id} = useParams();

    const [pantry, setPantry] = useState({})

    const [foods, setFoods] = useState([])
    const [displayFood,  setDisplay] = useState([])
    const [filterI, setFilterI] = useState(false)
    const [filterD, setFilterD] = useState(false)

    const nav = useNavigate();

    useEffect(() => {
        axios.get(`${backend}/api/pantries/${id}`)
        .then((res) => {
            setPantry(res.data);
            console.log(res.data);  
        }).catch((e) => {
            console.log(e);
        })
        axios.get(`${backend}/api/foods/${id}`)
        .then((res) => {
            setFoods(res.data);
            setDisplay(res.data);
            console.log(res.data);  
        }).catch((e) => {
            console.log(e);
        })
    }, [id])

    useEffect(() => {
        console.log("Changed a filter");
        if (filterI && !filterD){
            setDisplay(foods.filter(food => food.food_type === "ingredient"))
        }else if (filterD && !filterI){
            setDisplay(foods.filter(food => food.food_type === "dish"))
        }else{
            setFilterD(false);
            setFilterI(false);
        }
    }, [filterI, filterD])

    return (
        <div className='pantry'>
            <div className='pantry__head'>
                {/* Title and Back Arrow */}
                <div className='pantry__header'>
                    <img className='pantry__icon' src={backIcon} alt="Back arrow icon" onClick={() => nav(-1)}/>
                    <h2 className='pantry__title'> {pantry.pantry_name}</h2>
                </div>
                <div className='pantry__buttons'>
                    <SectionButton text={"Ingredients"} icon={ingredientIcon} onClickHandler={() => setFilterI(!filterI)}></SectionButton>
                    <SectionButton text={"Dishes"} icon={dishIcon} onClickHandler={() => setFilterD(!filterD)}></SectionButton>
                </div>  
            </div>

            <FoodsList pantryId = {id} foods = {displayFood}></FoodsList>
        </div>
    )
}

export default Pantry;