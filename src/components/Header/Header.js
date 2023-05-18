import './Header.scss'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import {useEffect, useState} from 'react'

import profileIcon from '../../assets/images/icons/face.svg'
import logo from '../../assets/images/logo/pantrykeeperlogo.png'
import { useNavigate } from 'react-router-dom'
const Header = () => {

    const auth = getAuth();
    const [user, setUser] = useState(false)
    const [username, setUsername] = useState("");
    const [profileImg, setProfileImg] = useState("");
    
    const nav = useNavigate();
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if(user != null){
                setUser(user);
                setUsername(user.displayName);
                setProfileImg(user.photoURL);
            }else{
                setUser(false)
            }
        })
        //Will check auth state change after auth loads, or after the window refreshes.
    }, [auth, window.location.href])

    const loginClickHandler = () => {
        nav('/login')
    }
    const signUpClickHandler = () => {
        nav('/register')
    }
    return (
    <>
        <div className='header'>
            <img src={logo} className='header__title' alt="logo"  onClick={ () => {nav('/')}} ></img>  
            {user ? 
            <div className='header__user'>
                <p className='header__username'> {username} </p>
                <img className = 'header__user-icon' src={profileIcon} alt={`${username}'s profile icon`}/>
            </div> :
            <div className='header__auth'>
                <p className='header__login' onClick = {loginClickHandler}> LogIn </p>
                <p className='header__signup' onClick = {signUpClickHandler}> SignUp </p>
            </div>}
        </div>
    </>
    )
}

export default Header;