import './EditPantry.scss';

import deleteIcon from '../../../../assets/images/icons/delete.svg';
import pantryIcon from '../../../../assets/images/icons/kitchen.svg';
import axios from 'axios';
import { useState } from 'react';
import { backend } from '../../../../firebase';
import BackButton from '../../../BackButton/BackButton';
const EditPantry = (props) =>{
    const {show, pantry, handleEdit, handleDelete, onClose} = props;
    const [pantryName, setPantryName] = useState("");
    if(!show){
        return null;
    }
    
    return (<>
        <div className='pantry-edit' onClick={onClose}>
            <div className='pantry-edit__content' onClick={(e) => e.stopPropagation()}>
                <div className='pantry-edit__header'>
                    <BackButton onClose={onClose}/>
                    <h2 className='pantry-edit__title'> Edit: {pantry.pantry_name} </h2>
                    <img onClick={(e) => handleDelete(e, pantry.pantry_id)} src={deleteIcon} alt="garbage"></img>
                </div>
                <img className='pantry-edit__image' src={pantryIcon} alt="pantry icon"></img>
                <form className='pantry-edit__form' onSubmit={(e) => {handleEdit(e, pantryName)}}>
                    <p> Change Name: </p>
                    <input className='pantry-edit__input' placeholder='Pantry Name' value={pantryName} onChange={(e) => setPantryName(e.target.value)}/>
                    <button className='pantry-edit__button' > Submit </button>
                </form>
                <form className='pantry-edit__form'>
                    <p> Add Friends: </p>
                    <input className='pantry-edit__input' placeholder='Add friend'/>
                    <button className='pantry-edit__button' > Add </button>
                </form>
                <button className='pantry-edit__button pantry-edit__cancel' onClick={onClose}> Cancel </button>
            </div>
        </div>
    </>)
}


export default EditPantry;