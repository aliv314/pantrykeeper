import './Pantry.scss'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { backend } from '../../firebase';

import backIcon from '../../assets/images/icons/arrow_back.svg'
import FoodsList from '../../components/FoodsList/FoodsList';

const Pantry = () => {
    const {id} = useParams();
    const [pantry, setPantry] = useState({})
    const [foods, setFoods] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`${backend}/api/pantries/${id}`)
        .then((res) => {
            setPantry(res.data);
        }).catch((e) => {
            console.log(e);
        })
        axios.get(`${backend}/api/foods/${id}`)
        .then((res) => {
            setFoods(res.data);
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

            <FoodsList foods = {foods}></FoodsList>
        </div>
    )
}

export default Pantry;