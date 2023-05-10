import './Home.scss'
import HomeCard from '../../components/HomeCard/HomeCard';

import  myKichenIcon from '../../assets/images/icons/kitchen.svg'; 
import  friendsIcon from '../../assets/images/icons/group.svg'; 

const Home = () => {
    return (
        <>
            <div className='hero'>
                <h1>PantryKeeper</h1>
            </div>
            <section className='home-body'>
                <div className='home-body__card'>
                    <HomeCard text = "My Kitchen" icon = {myKichenIcon}/>
                </div>
                <div className='home-body__card'>
                    <HomeCard text = "Friends" icon = {friendsIcon}/>
                </div>
                <p className='home-body__user'> Login </p>
                <p className='home-body__user'> SignUp</p>
                <p className='home-body__user'> Logout </p>
            </section>
        </>
    )
}

export default Home;