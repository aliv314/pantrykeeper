import './NewFoodList.scss';
import closeIcon from '../../assets/images/icons/close.svg'
import { uuidv4 } from '@firebase/util';
const NewFoodList = (props) =>{ 
    const {foods} = props;
    return (<>
        <section className='cart'>
            {foods && foods.map(item => {
                return(
                <div className= 'cart__item' key={uuidv4()}> 
                    <p className='cart__name'> {item.name} </p>
                    <p className='cart__type'> {item.type} </p>
                    <img className='cart__icon' src={closeIcon} alt={"close icon"}></img>
                </div>)
            })}
        </section>
    </>)
}

export default NewFoodList;