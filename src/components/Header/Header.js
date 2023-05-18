import './Header.scss'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {useEffect, useState} from 'react'

import profileIcon from '../../assets/images/icons/face.svg'
import logo from '../../assets/images/logo/pantrykeeperlogo.png'
import { useNavigate } from 'react-router-dom'
const Header = () => {

    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [profileImg, setProfileImg] = useState("");
    
    const navigate = useNavigate();

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
            <img src={logo} className='header__title' alt="logo"  onClick={ () => {navigate('/')}} ></img>
            <div className='header__user'>
                <p className='header__username'> {username? username : "Please Login/Signup"} </p>
                <img className = 'header__user-icon' src={profileIcon} alt={`${username}'s profile icon`}/>
            </div>
        </div>
    </>
    )
}

export default Header;