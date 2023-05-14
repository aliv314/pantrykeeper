import './Pantry.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../firebase';

import backIcon from '../../assets/images/icons/arrow_back.svg'
import ingredientsIcon from '../../assets/images/icons/nutrition.svg'
import leftoversIcon from '../../assets/images/icons/dinner_dining.svg'
import LeftoversList from '../../components/LeftoversList/LeftoversList';
import IngredientsList from '../../components/IngredientsList/IngredientsList';
import SectionButton from '../../components/SectionButton/SectionButton';

const Pantry = () => {
    const {id} = useParams();
    const [pantry, setPantry] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [leftovers, setLeftovers] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`${backend}/api/pantries/${id}`)
        .then((res) => {
            setPantry(res.data);
        }).catch((e) => {
            console.log(e);
        })
        axios.get(`${backend}/api/ingredients/${id}`)
        .then((res) => {
            setIngredients(res.data);
        }).catch((e) => {
            console.log(e);
        })

        axios.get(`${backend}/api/leftovers/${id}`)
        .then((res) => {
            setLeftovers(res.data);
        }).catch((e) => {
            console.log(e);
        })

    }, [id])


    return (
        <div className='pantry'>
            <div className='pantry__head'>
                <div className='pantry__head-left'>
                    <img className='pantry__icon' src={backIcon} alt="Back arrow icon" onClick={() => nav(-1)}/>
                    <h2> Pantry: {pantry.pantry_name}</h2>
                </div>
                <div className='pantry__head-right'>
                    <div className='pantry__button'>
                        <SectionButton icon={ingredientsIcon} text={`Ingredients`}></SectionButton>
                    </div>
                    <div className='pantry__button'>
                        <SectionButton icon={leftoversIcon} text={`Leftovers`}></SectionButton>
                    </div>
                </div>
            </div>
            <IngredientsList ingredients = {ingredients}></IngredientsList>
            <LeftoversList  leftovers = {leftovers} ></LeftoversList>
        </div>
    )
}

export default Pantry;