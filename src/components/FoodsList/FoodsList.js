import './FoodsList.scss';
import { uuidv4 } from '@firebase/util';
import { useEffect, useState } from 'react';

//Cards
import ItemCard from '../Cards/ItemCard/ItemCard';
import NewItemCard from '../Cards/NewCard/NewCard';

//Modals
import NewFood from '../Modals/FoodsModals/NewFood/NewFood';
import FoodDetails from '../Modals/FoodsModals/FoodDetails/FoodDetails';

//Icons
import foodIcon from '../../assets/images/icons/nutrition.svg'
import deleteIcon from '../../assets/images/icons/delete.svg'
import axios from 'axios';
import { backend } from '../../firebase';
import { useParams } from 'react-router-dom';

const FoodsList = (props) => {
    const {pantryId} = props
    const [food, setFood] = useState({});
    const [foods, setFoods] = useState([]);
    const [showNew, setShowNew] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(`${backend}/api/foods/${id}`)
        .then((res) => {
            setFoods(res.data);
        }).catch((e) => {
            console.log(e);
        })
    }, [id])

    //To the database.
    const handleNew = (e, addedFoods) => {
        e.preventDefault();
        //Post body 
        const foodPost = {
            foods: addedFoods,
        }
        //Axios call to add all foods. 
        axios.post(`${backend}/api/foods/${id}`, foodPost)
        .then( res => {
            //Close modal.
            setShowNew(false);
            setFoods([...res.data, ...foods])
            console.log(res.data)
        })
        .catch( error => {})
    }
    
    const handleDelete = (e, foodId) => {
        e.preventDefault();
        axios.delete(`${backend}/api/foods/${pantryId}/${foodId}`)
        .then(res => {console.log(res)})
        .catch(err => console.log(err));    
    }

    return (
        <>  
            {showNew && <NewFood 
            show={showNew} 
            onClose = {() => setShowNew(false)}
            handleNew = {(e, addedFoods) => handleNew(e, addedFoods)}/>}
            {showDetails && food && <FoodDetails 
            show={showDetails} 
            food={food} 
            onClose={() => setShowDetails(false)}/>}

            <section className='foods'>
                <ul className='foods__list'>
                    {foods && foods.map((food, i) => {
                        return ( 
                        <li key={uuidv4()}className='foods__list-item'>
                            <ItemCard 
                            key={uuidv4()} 
                            itemName={food.food_name} 
                            icon ={foodIcon}
                            onClickDetail = {() => {
                                setFood(foods[i]);
                                setShowDetails(true);   
                            }}
                            secondaryIcon = {deleteIcon}
                            onClickSecondary = {(e) => handleDelete(e, food.food_id)} 
                            />
                        </li>
                        )
                    })}
                    <li className='foods__list-item'>
                        <NewItemCard title={'Food'} onClickHandler = {() => setShowNew(true)}></NewItemCard>
                    </li>
                </ul>
            </section>
        </>
        
    )
}

export default FoodsList;