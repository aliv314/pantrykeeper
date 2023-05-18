import './CartList.scss';
import closeIcon from '../../assets/images/icons/close.svg'
import { uuidv4 } from '@firebase/util';
const CartList = (props) =>{ 
    const {foods, onCancel} = props;
    return (<>
        <section className='cart'>
            {foods && foods.map(item => {
                return(
                <div className= 'cart__item' key={uuidv4()}> 
                    <p className='cart__name'> {item.name} </p>
                    <p className='cart__type'> {item.type} </p>
                    <img className='cart__icon' src={closeIcon} alt={"close icon"} onClick={() => onCancel(item.name)}></img>
                </div>)
            })}
        </section>
    </>)
}

export default CartList;