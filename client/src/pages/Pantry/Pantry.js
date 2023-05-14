import './Pantry.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../firebase';

import backIcon from '../../assets/images/icons/arrow_back.svg'
import ingredientsIcon from '../../assets/images/icons/nutrition.svg'
import leftoversIcon from '../../assets/images/icons/dinner_dining.svg'

const Pantry = () => {
    const {id} = useParams();
    const [pantry, setPantry] = useState({})
    
    const [ingredients, setIngredients] = useState([])
    const [leftovers, setLeftovers] = useState([])

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

    }, [])


    return (
        <div className='pantry'>
            <div className='pantry__head'>
                <div className='pantry__head-left'>
                    <img src={backIcon} ></img>
                    <h2> Pantry: {pantry.pantry_name}</h2>
                </div>
                <div className='pantry__head-right'>
                    <div>
                        <img src={ingredientsIcon}></img>
                        <p>Ingredients</p>
                    </div>
                    <div>
                        <img src={leftoversIcon}></img>
                        <p>Leftovers</p>
                    </div>
                </div>
            </div>

            <section className='ingredients'>
                <h3> {pantry.pantry_name} Ingredients </h3>
            </section>
            <section className='leftovers'>
                <h3> {pantry.pantry_name} Leftovers </h3>
            </section>
        </div>
    )
}

export default Pantry;