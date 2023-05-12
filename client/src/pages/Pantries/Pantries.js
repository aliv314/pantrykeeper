import { useNavigate } from 'react-router-dom';
import NewCard from '../../components/Cards/NewCard/NewCard';
import NewPantryModal from '../../components/Modals/ModalPantries/NewPantryModal/NewPantryModal';
import './Pantries.scss'

const Pantries = () => {
    const nav = useNavigate();
    const newPantryHandler = () => {
        
    }
    return (
    <div className='pantries'>
        <NewPantryModal show={true}></NewPantryModal>
        <div className='pantries__title'>
            <h2> Pantries </h2>
        </div>
        <div className='pantries__cards'>
            <NewCard title = {`Pantry`} onClick = {newPantryHandler}/>
        </div>
    </div>
    )
}

export default Pantries;