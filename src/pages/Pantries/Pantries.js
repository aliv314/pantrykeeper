import './Pantries.scss'

//Imports 
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewCard from '../../components/cards/NewCard/NewCard';
import { useEffect, useState } from 'react';
import { backend } from '../../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//cards
import ItemCard from '../../components/cards/ItemCard/ItemCard';
//modals
import NewPantry from '../../components/modals/pantries-modals/NewPantry/NewPantry';
import PantryDetails from '../../components/modals/pantries-modals/PantryDetails/PantryDetails';
import EditPantry from '../../components/modals/pantries-modals/EditPantry/EditPantry';

//Icons
import pantryIcon from '../../assets/images/icons/kitchen.svg';
import editIcon from '../../assets/images/icons/edit.svg'
import BackButton from '../../components/BackButton/BackButton';
import LoadCard from '../../components/cards/LoadCard/LoadCard';
import { async } from '@firebase/util';
import { clear } from '@testing-library/user-event/dist/clear';


const Pantries = () => {
    
    const [user, setUser] = useState({});
    const [pantries, setPantries] = useState([]);
    const [pantry, setPantry] = useState({});

    const [showNew, setShowNew] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState(false)

    const nav = useNavigate();
    
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            nav("/")
        }
        });
    }, [nav, auth])

    useEffect(() => {
        if(!user.uid) return
        let numberOfTries = 0
        let interval = 1000
        const getPantries = async () => {
            console.log(interval);
            clearInterval(intervalId);
            if (numberOfTries > 9){
                setApiError(true);
                setLoading(false);
                return
            }
            await axios.get(`${backend}/api/users/${user.uid}`)
            .then((res) => {
                setApiError(false);
                setLoading(false);
                setPantries(res.data);
            }).catch((error)=>{
            })
            
            interval *= 1.2;
            numberOfTries++;
            intervalId = setInterval(getPantries, interval);
        }

        let intervalId = setInterval(getPantries, interval);
    }, [user])
    
    //Submit for new pantry m   odal.
    const handleNew = (e, pantryName) => {
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
            const newPantry = res.data
            setPantries([newPantry, ...pantries])
        }).catch((e) => {
            console.log(e)
        })
    }
    const handleEdit = (e, pantryName) =>{
        e.preventDefault();
        if(!pantryName){
            return;
        }
        const reqBody = {
            pantry_name: pantryName,
        }
        axios.put(`${backend}/api/pantries/${pantry.pantry_id}`, reqBody)
        .then((res) => {
            setShowEdit(false);
        }).catch((e) => {   
            console.log(e);
        })
    }
    const handleDelete = (e, pantryId) => {
        axios.delete(`${backend}/api/pantries/${pantryId}`)
        .then((res)=>{
            setShowEdit(false);
            setPantries(pantries.filter(pantry => pantry.pantry_id !== pantryId))
        }).catch((e) => {
            console.log(e)
        })
    }


    return (
    <div className='pantries'>
        {/* modals */}
        {showNew && <NewPantry 
        show={showNew} 
        handleNew={(e, pantryName) => handleNew(e, pantryName)} 
        onClose={() => {setShowNew(false)}}/>}

        {showDetails && pantry && <PantryDetails 
        show={showDetails} 
        pantry={pantry} 
        onClose={() => {setShowDetails(false)}} />}

        {showEdit && pantry && <EditPantry 
        show={showEdit}
        pantry={pantry} 
        onClose={() => {setShowEdit(false)}}
        handleEdit = {(e, pantryName) => handleEdit(e, pantryName)}
        handleDelete = {(e, pantryId) => handleDelete(e, pantryId)}/>}
        {/* End modals */}

        <div className='pantries__header'>
            <BackButton onClose={ () => nav(-1)}/>
            <h2 className='pantries__title'> Pantries </h2>
        </div>
        
        <ul className='pantries__cards'>
            {loading && <li className='pantries__card'>
                <LoadCard/>
            </li>}
            {apiError && <li>
              "Api Error! Try Later. Sorry about that x(
                </li>}
            {pantries && pantries.map( (pantry) => {
                return (
                    <li className='pantries__card' key= {pantry && pantry.pantry_id}>
                        <ItemCard 
                        itemName = {pantry.pantry_name} 
                        icon={pantryIcon} 
                        onClickItem={() => nav(`/my-pantry/${pantry.pantry_id}`)} 
                        onClickDetail = {() => {
                            setPantry(pantry); 
                            setShowDetails(true); 
                        }} 
                        secondaryIcon = {editIcon}
                        onClickSecondary= { () => {
                            setPantry(pantry); 
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