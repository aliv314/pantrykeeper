import BackButton from '../../../BackButton/BackButton';
import './UserDetails.scss'

const UserDetails = (props) =>{
    const {show, user} = props
    if(!show){
        return null;
    }
    return ( <>
        <div className='user-details'>
            <div className='user-details__contents'>
                <div className='user-details__header'>
                    <BackButton></BackButton>
                    <h2> Profile: {user && user.displayName}</h2>
                </div>

                <img src={''} className='user-details__img' alt='user icon pfp'></img>
                <div className='user-details__detail'>
                    <p className='user-details__label'> User: </p>
                    <p className='user-details__info'> {user && user.displayName}</p>
                </div>
                <div className='user-details__detail'>
                    <p className='user-details__label'> FC: </p>
                    <p className='user-details__info'>  {}</p>
                </div>
            </div>
        </div>
    </>)
}

export default UserDetails;