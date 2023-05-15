import './NewFoodList.scss';
import closeIcon from '../../assets/images/icons/close.svg'
import { uuidv4 } from '@firebase/util';
const NewFoodList = (props) =>{ 
    const {foods} = props;
    return (<>
        <section className='ni-list'>
            {foods && foods.map(item => {
                return(
                <div className= 'new-food__list-item' key={uuidv4()}> 
                    <p> {item} </p>
                    <img src={closeIcon} alt={"close icon"}></img>
                </div>)
            })}
        </section>
    </>)
}

export default NewFoodList;