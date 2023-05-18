import './ItemCard.scss'
import detailIcon from '../../../assets/images/icons/info.svg'

const ItemCard = (props) => {
    const {itemName, icon, onClickItem, onClickDetail, secondaryIcon, onClickSecondary, additionalClass} = props;
    return (
        <>
            <div className={`item-card ${additionalClass}`}>
                <div onClick={onClickItem} className='item-card__body'>
                    <h4 className='item-card__title'> {itemName} </h4>
                    <img  className='item-card__icon'src={icon} alt="icon"></img>
                </div>
                <div className='item-card__buttons'>
                        <img  onClick={onClickDetail} className='item-card__bt' src={detailIcon} alt="icon"></img>
                        <img  onClick={onClickSecondary} className='item-card__bt' src={secondaryIcon} alt="icon"></img>
                </div>
                
            </div>
        </>
    )
}

export default ItemCard;