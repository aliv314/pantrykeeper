import './ErrorCard.scss'

const ErrorCard = (props) => {
    const {errorMsg} = props;
    return ( <>
    <div className={'error-card'}>
        <p> {errorMsg} </p>
    </div>
    </>)
}

export default ErrorCard