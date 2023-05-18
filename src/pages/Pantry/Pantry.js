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
        }).catch((e) => {
            console.log(e);
        })
    }, [id])

    useEffect(() => {
        if (filterI && !filterD){
            setDisplay(foods.filter(food => food.food_type === "ingredient"))
        }else if (filterD && !filterI){
            setDisplay(foods.filter(food => food.food_type === "dish"))
        }else{
            setDisplay(foods)
        }
    }, [filterI, filterD])

    
    return (
        <div className='pantry'>
            <div className='pantry__head'>
                <div className='pantry__header'>
                    <img className='pantry__icon' src={backIcon} alt="Back arrow icon" onClick={() => nav(-1)}/>
                    <h2 className='pantry__title'> {pantry.pantry_name}</h2>
                </div>
                <div className='pantry__buttons'>
                    <SectionButton active={filterI} text={"Ingredients"} icon={ingredientIcon} onClickHandler={() => setFilterI(!filterI)}></SectionButton>
                    <SectionButton active={filterD} text={"Dishes"} icon={dishIcon} onClickHandler={() => setFilterD(!filterD)}></SectionButton>
                </div>  
            </div>
            <FoodsList/>
        </div>
    )
}

export default Pantry;