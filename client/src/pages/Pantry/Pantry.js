import './Pantry.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../firebase';

import backIcon from '../../assets/images/icons/arrow_back.svg'
import ingredientsIcon from '../../assets/images/icons/nutrition.svg'
import leftoversIcon from '../../assets/images/icons/dinner_dining.svg'
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
                {/* Title and Back Arrow */}
                <div className='pantry__header'>
                    <img className='pantry__icon' src={backIcon} alt="Back arrow icon" onClick={() => nav(-1)}/>
                    <h2 className='pantry__title'> {pantry.pantry_name}</h2>
                </div>
            </div>

            <IngredientsList ingredients = {ingredients}></IngredientsList>
        </div>
    )
}

export default Pantry;