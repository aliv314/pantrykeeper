import './Pantries.scss'

//Imports 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewCard from '../../components/Cards/NewCard/NewCard';
import { useEffect, useState } from 'react';
import { backend } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Cards
import ItemCard from '../../components/Cards/ItemCard/ItemCard';
//Modals
import NewPantry from '../../components/Modals/PantriesModals/NewPantry/NewPantry';
import PantryDetails from '../../components/Modals/PantriesModals/PantryDetails/PantryDetails';
import EditPantry from '../../components/Modals/PantriesModals/EditPantry/EditPantry';

//Icons
import backIcon from '../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../assets/images/icons/kitchen.svg';
import editIcon from '../../assets/images/icons/edit.svg'


const Pantries = () => {
    
    const [user, setUser] = useState();
    const [pantries, setPantries] = useState([]);
    const [pantry, setPantry] = useState({});

    const [showNew, setShowNew] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const nav = useNavigate();
    
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
    
    useEffect(() => {
        if(!user) return
        axios.get(`${backend}/api/users/${user.uid}`)
        .then((res) => {
            setPantries(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [user])

    //Submit for new pantry modal.
    const handleNewSubmit = (e, pantryName) => {
        e.preventDefault();
        if (!user) return;
        const newPantryObj = {
            ownerId: user.uid,
            ownerName: user.displayName,
            pantryName: pantryName,
        }
    
        axios.post(`${backend}/api/pantries`, newPantryObj)
        .then((res)=>{
            setShowNew(false);
        }).catch((e) => {
            console.log(e)
        })
    }
    return (
    <div className='pantries'>
        {showNew && <NewPantry show={showNew} onSubmit={(e, pantryName) => handleNewSubmit(e, pantryName)} onClose={() => {setShowNew(false)}}/>}
        {showDetails && pantry && <PantryDetails show={showDetails} pantry={pantry} onClose={() => {setShowDetails(false)}}/>}
        {showEdit && pantry && <EditPantry show={showEdit} pantry={pantry} onClose={() => {setShowEdit(false)}}></EditPantry>}
        <div className='pantries__header'>
            <img className = 'pantries__icon' src={backIcon} onClick={()=> nav(-1)} alt={"back icon"}></img>
            <h2 className='pantries__title'> Pantries </h2>
        </div>
        
        <ul className='pantries__cards'>
            {pantries && pantries.map( (pantry, i) => {
                return (
                    <li className='pantries__card' key={pantry && pantry.pantry_id}>
                        <ItemCard 
                        itemName = {pantry.pantry_name} 
                        icon={pantryIcon} 
                        onClickItem={() => nav(`/my-pantry/${pantry.pantry_id}`)} 
                        onClickDetail = {() => {
                            setPantry(pantries[i]); 
                            setShowDetails(true); 
                        }} 
                        secondaryIcon = {editIcon}
                        onClickSecondary= { () => {
                            setPantry(pantries[i]); 
                            setShowEdit(true);
                        }}/>
                    </li>
                )
            })}
            <li className='pantries__card'>
                <NewCard title = {`Pantry`} onClickHandler={()=>setShowNew(true)} />
            </li>
        </ul>
    </div>
    )
}

export default Pantries;