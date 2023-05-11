import './NewCard.scss'

import plusCircle from '../../assets/images/icons/add_circle.svg'

const NewItemCard = (props) => {
    const {title} = props;
    return (
        <div className='new-card'>
            <div className='new-card__title'>
                <h4> New {title} </h4>
            </div>
            <div className='new-card__icon'>
                <img src={plusCircle} alt={`Add new item to ${title}`}></img>
            </div>
        </div>
    )
}

export default NewItemCard;