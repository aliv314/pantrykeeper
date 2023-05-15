import './Pantries.scss'

//Imports 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewCard from '../../components/Cards/NewCard/NewCard';
import { useEffect, useState } from 'react';
import { backend } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Components
import ItemCard from '../../components/Cards/ItemCard/ItemCard';
import NewPantryModal from '../../components/Modals/PantriesModals/NewPantryModal/NewPantryModal';

//Icons
import backIcon from '../../assets/images/icons/arrow_back.svg'
import pantryIcon from '../../assets/images/icons/kitchen.svg';

const Pantries = () => {
    const [pantries, setPantries] = useState([]);
    const [showNew, setShowNew] = useState(false);
    const [user, setUser] = useState();

    const navigator = useNavigate();

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
            console.log(pantries);
        }).catch((e) => {
            console.log(e);
        })
    }, [user])

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
        {showNew && <NewPantryModal show={showNew} onSubmit={(e, pantryName) => handleNewSubmit(e, pantryName)} onClose={() => {setShowNew(false)}}></NewPantryModal>}

        <div className='pantries__title'>
            <img src={backIcon} alt={"back icon"}></img>
            <h2> Pantries </h2>
        </div>
        <ul className='pantries__cards'>
            {pantries && pantries.map( (pantry) => {
                return (
                    <li className='pantries__card' key={pantry && pantry.pantry_id}>
                        <ItemCard itemName = {pantry.pantry_name} icon={pantryIcon} onClickItem={() => navigator(`/my-pantry/${pantry.pantry_id}`)}/>
                    </li>
                )
            })}
            <li className='pantries__card'>
                <NewCard title = {`Pantry`} onClickHandler={()=>setShowNew(true)}/>
            </li>
        </ul>
    </div>
    )
}

export default Pantries;