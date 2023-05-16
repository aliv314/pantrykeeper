import './PantryDetails.scss';

const PantryDetails = (props) =>{
    const {show, pantry} = props;

    if(!show){
        return null;
    }
    return (<>
        <div className='details'>
            <div className='details__content'>
                <h1>Wow</h1>
            </div>
        </div>
    </>)
}

export default PantryDetails;