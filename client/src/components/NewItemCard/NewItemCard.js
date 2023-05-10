import './NewItemCard.scss'

import plusCircle from '../../assets/images/icons/add_circle.svg'

const NewItemCard = (props) => {
    const {title} = props;
    return (
        <div>
            <div>
                <h4> New {title} </h4>
            </div>
            <div>
                <img src={plusCircle} alt={`Add new item to ${title}`}></img>
            </div>
        </div>
    )
}

export default NewItemCard;