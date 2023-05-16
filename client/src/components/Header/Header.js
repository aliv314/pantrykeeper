import './Header.scss'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {useEffect, useState} from 'react'

import profileIcon from '../../assets/images/icons/face.svg'
const Header = () => {

    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [profileImg, setProfileImg] = useState("");
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user != null){
                setUsername(user.displayName);
                setProfileImg(user.photoURL);
            }
        })
    }, [auth])

    return (
    <>
        <div className='header'>
            <h3 className='header__title'> PantryKeeper </h3>
            <div className='header__user'>
                <h4 className='header__username'> {username}</h4>
                <img className = 'header__user-icon' src={profileIcon} alt={`${username}'s profile icon`}/>
            </div>
        </div>
    </>
    )
}

export default Header;