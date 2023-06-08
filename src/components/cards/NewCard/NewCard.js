import './NewCard.scss'

import plusCircle from '../../../assets/images/icons/add_circle.svg'

const NewItemCard = (props) => {
    const {title, onClickHandler} = props;
    return (
        <div className='new-card' onClick={onClickHandler}>
            <div className='new-card__title'>
                <h4> Add {title} </h4>
            </div>
            <img className='new-card__icon' src={plusCircle} alt={`Add new item to ${title}`}></img>
         
        </div>
    )
}

export default NewItemCard;