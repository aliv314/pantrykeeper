import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewCard from '../../components/Cards/NewCard/NewCard';
import NewPantryModal from '../../components/Modals/ModalPantries/NewPantryModal/NewPantryModal';
import './Pantries.scss'
import { useEffect, useState } from 'react';
import { backend } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ItemCard from '../../components/Cards/ItemCard/ItemCard';

const Pantries = () => {
    // const nav = useNavigate();

    const [pantries, setPantries] = useState([]);
    const [showNew, setShowNew] = useState(false);
    const [user, setUser] = useState();

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
            <h2> Pantries </h2>
        </div>
        <div className='pantries__cards'>
            {pantries && pantries.map( (pantry) => {
                return <ItemCard pantry={pantry}> </ItemCard>
            })}
            <NewCard title = {`Pantry`} onClickHandler={()=>setShowNew(true)}/>
        </div>
    </div>
    )
}

export default Pantries;