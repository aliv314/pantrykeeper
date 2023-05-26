import './Home.scss'
import HomeCard from '../../components/cards/HomeCard/HomeCard';
import Error from '../../components/Error/Error';

import myKichenIcon from '../../assets/images/icons/kitchen.svg'; 
import friendsIcon from '../../assets/images/icons/group.svg'; 
import userIcon from '../../assets/images/icons/face.svg'

import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from 'react';
import UserDetails from '../../components/modals/user-modals/UserDetails/UserDetails';

const Home = () => {
    const nav = useNavigate();  
    const [user, setUser] = useState();
    const [signedInError , setSignedInError] = useState(false);
    const auth = getAuth()
    useState(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user){
                setUser(user);
                //Just in case the server is slow again.
                setSignedInError(false);
            } else{
                setUser(false);
            }
        
        })
    }, [auth])

    const myKitchenHandler = () =>{
        if(!user) {
            setSignedInError(true)
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

    const userProfielHandler = () => {
        if(!user){
            setSignedInError(true);
            return
        }

    }

    const logOutClickHandler = () => {
        try{
            signOut(auth).then(() => {
                window.location.reload();
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
                {signedInError && <Error error={"User must be signed in!"}/>}
                {<UserDetails show={true}></UserDetails>}
                <div className='home-body__cards'>
                    <div className='home-body__card' onClick={myKitchenHandler}>
                        <HomeCard text = "My Kitchen" icon = {myKichenIcon} />
                    </div>
                    {/* Couldn't get it working in time :sob: */}
                    {/* <div className='home-body__card' onClick={friendsHandler}>
                        <HomeCard text = "Friends" icon = {friendsIcon}/>
                    </div> */}
                    <div className='home-body__card' onClick={userProfielHandler}>
                        <HomeCard text = {user && user.displayName} icon = {userIcon} />
                    </div>
                </div>
                {/* If not logged in or signed up */}
                {user && <p className='home-body__user' onClick= {logOutClickHandler}> Logout </p>}
            </section>
        </>
    )
}

export default Home;