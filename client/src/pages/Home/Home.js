import './Home.scss'
import HomeCard from '../../components/HomeCard/HomeCard';

import ingredientsIcon from "../../assets/images/icons/nutrition.svg"
import dishesIcon from '../../assets/images/icons/dinner_dining.svg'

const Home = () => {
    return (
        <>
            <section className='hero'>
                <h1>PantryKeeper</h1>
            </section>

            <section className='home-body'>
                <HomeCard text = "Ingredients" icon = {ingredientsIcon}/>
                <HomeCard text = "Dishes" icon = {dishesIcon}/>
            </section>
        </>
    )
}

export default Home;