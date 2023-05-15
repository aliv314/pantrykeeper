import './NewIngredientList.scss';
import closeIcon from '../../assets/images/icons/close.svg'
import { uuidv4 } from '@firebase/util';
const NewIngredientList = (props) =>{ 
    const {ingredients} = props;
    return (<>
        <section className='ni-list'>
            {ingredients && ingredients.map(item => {
                return(
                <div className= 'new-ingredient__list-item' key={uuidv4()}> 
                    <p> {item} </p>
                    <img src={closeIcon} alt={"close icon"}></img>
                </div>)
            })}
        </section>
    </>)
}

export default NewIngredientList;