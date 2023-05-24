import './Error.scss'
import errorIcon from '../../assets/images/icons/error.svg'
const Error = (props) => {
    const {error} = props;
    return (
        <div className='error'>
            <img src={errorIcon}className='error__icon'></img>
            <p className='error__text'>{error}</p>
        </div>
    )
}

export default Error;