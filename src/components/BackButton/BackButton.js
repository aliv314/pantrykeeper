import './BackButton.scss'
import backIcon from '../../assets/images/icons/arrow_back.svg'

const BackButton = (props) => {
    const {onClose} = props;
    return (
        <>  
            <img className='back' src={backIcon} alt="Back arrow icon" onClick={onClose}/>
        </>
    )

}

export default BackButton;