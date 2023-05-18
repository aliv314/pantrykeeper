import './Home.scss'
import HomeCard from '../../components/Cards/HomeCard/HomeCard';

import  myKichenIcon from '../../assets/images/icons/kitchen.svg'; 
import  friendsIcon from '../../assets/images/icons/group.svg'; 
import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
const Home = () => {
    const nav = useNavigate();  
    const [user, setUser] = useState();

    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
        if (user){
            setUser(user);
        } else{
            setUser(false);
        }
    
    })

    const myKitchenHandler = () =>{
        if(!user) {
            alert("User must be signed in.");
            return;
        }
        nav('/my-pantry');
    }
    const friendsHandler = () =>{
        if(!user) {
            alert("User must be signed in.");
            return;
        }
        nav('/friend-pantry')
    }
    const loginClickHandler = () => {
        nav('/login')
    }
    const signUpClickHandler = () => {
        nav('/register')
    }
    const logOutClickHandler = () => {
        try{
            signOut(auth).then(() => {
                console.log("Signed out!")
            }).catch((error) => {
                console.log(error);
            });
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div className='hero'>
                <h1 className='hero__title' >PantryKeeper</h1>
            </div>
            <section className='home-body'>
                <div className='home-body__cards'>
                    <div className='home-body__card' onClick={myKitchenHandler}>
                        <HomeCard text = "My Kitchen" icon = {myKichenIcon} />
                    </div>
                    <div className='home-body__card' onClick={friendsHandler}>
                        <HomeCard text = "Friends" icon = {friendsIcon}/>
                    </div>
                </div>
                {/* If not Logged in or Signed up */}
                {!user && <p className='home-body__user' onClick = {loginClickHandler}> Login </p>}
                {/* If not logged in or signed up */}
                {!user && <p className='home-body__user' onClick= {signUpClickHandler}> SignUp</p>}
                {/* If not logged in or signed up */}
                {user && <p className='home-body__user' onClick= {logOutClickHandler}> Logout </p>}
            </section>
        </>
    )
}

export default Home;