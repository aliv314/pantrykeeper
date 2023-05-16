import './EditPantry.scss';

import backIcon from '../../../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../../../assets/images/icons/kitchen.svg';
import axios from 'axios';
import { useState } from 'react';
import { backend } from '../../../../firebase';
const EditPantry = (props) =>{
    const {show, pantry, onClose} = props;
    const [pantryName, setPantryName] = useState("");
    if(!show){
        return null;
    }
    const onSubmitName = (e) =>{
        e.preventDefault();
        if(!pantryName){
            return;
        }
        const reqBody = {
            pantry_name: pantryName,
        }
        axios.put(`${backend}/api/pantries/${pantry.pantry_id}`, reqBody)
        .then((res) => {
            console.log(res);
        }).catch((e) => {   
            console.log(e);
        })
    }
    return (<>
        <div className='pantry-edit'>
            <div className='pantry-edit__content'>
                <div className='pantry-edit__header'>
                    <img className='pantry-edit__icon' src={backIcon} alt="Back arrow icon" onClick={onClose}/>
                    <h2 className='pantry-edit__title'> {pantry.pantry_name}</h2>
                </div>
                <img className='pantry-edit__img' src={pantryIcon} alt="pantry icon"></img>
                <form className='pantry-edit__form' onSubmit={onSubmitName}>
                    <input placeholder='Pantry Name' value={pantryName} onChange={(e) => setPantryName(e.target.value)}/>
                    <button> Submit </button>
                </form>
                <form className='pantry-edit__form'>
                    <input placeholder='Add friend'/>
                    <button> Add </button>
                </form>
                <button onClick={onClose}> Cancel </button>
            </div>
        </div>
    </>)
}


export default EditPantry;