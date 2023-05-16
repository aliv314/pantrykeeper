import './ItemCard.scss'
import detailIcon from '../../../assets/images/icons/info.svg'
import deleteIcon from '../../../assets/images/icons/delete.svg'

const ItemCard = (props) => {
    const {itemName, icon, onClickItem, onClickDetail, onClickDelete} = props;
    return (
        <>
            <div className='item-card'>
                <div onClick={onClickItem} className='item-card__body'>
                    <h4 className='item-card__title'> {itemName} </h4>
                    <img  className='item-card__icon'src={icon} alt="icon"></img>
                </div>
                <div className='item-card__buttons'>
                    <div onClick={onClickDetail} className='item-card__button item-card__button--left'>
                        <img  className='item-card__bt-icon' src={detailIcon} alt="icon"></img>
                    </div>
                    <div onClick={onClickDelete} className='item-card__button'>
                        <img  className='item-card__bt-icon' src={deleteIcon} alt="icon"></img>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ItemCard;