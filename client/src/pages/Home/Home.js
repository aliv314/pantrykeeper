import './Home.scss'
import HomeCard from '../../components/HomeCard/HomeCard';

import  myKichenIcon from '../../assets/images/icons/kitchen.svg'; 
import  friendsIcon from '../../assets/images/icons/group.svg'; 
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
const Home = () => {
    const nav = useNavigate();
    const currentUser = auth.currentUser;

    const myKitchenHandler = () =>{
        nav('/my-pantry');
    }
    const friendsHandler = () =>{
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
                nav('/')
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
                <h1>PantryKeeper</h1>
            </div>
            <section className='home-body'>
                <div className='home-body__card' onClick={myKitchenHandler}>
                    <HomeCard text = "My Kitchen" icon = {myKichenIcon} />
                </div>
                <div className='home-body__card' onClick={friendsHandler}>
                    <HomeCard text = "Friends" icon = {friendsIcon}/>
                </div>
                {/* If not Logged in or Signed up */}
                {!currentUser && <p className='home-body__user' onClick = {loginClickHandler}> Login </p>}
                {/* If not logged in or signed up */}
                {!currentUser && <p className='home-body__user' onClick= {signUpClickHandler}> SignUp</p>}
                {/* If not logged in or signed up */}
                {currentUser && <p className='home-body__user' onClick= {logOutClickHandler}> Logout </p>}
            </section>
        </>
    )
}

export default Home;