import './Error.scss'

const Error = (props) => {
    const {error} = props;
    return (
        <div className='error'>
            <img className='error__icon'></img>
            <p className='error__text'>{error}</p>
        </div>
    )
}

export default Error;