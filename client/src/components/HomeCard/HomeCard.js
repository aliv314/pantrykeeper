import './HomeCard.scss'

const HomeCard = (props) => {
    const {text, icon} = props;
    return (
        <>
            <div className='home-card'>
                <h3 className='home-card__text'> {text} </h3>
                <img className='home-card__icon' src={icon} alt={`Card Icon of ${text}`}/>
            </div>
        </>
    )
}

export default HomeCard;