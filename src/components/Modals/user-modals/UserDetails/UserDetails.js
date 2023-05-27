import './UserDetails.scss'

import BackButton from '../../../BackButton/BackButton';
import editIcon from '../../../../assets/images/icons/edit.svg'

const UserDetails = (props) =>{
    const {show, user, onClose} = props
        
    if(!show){
        return null;
    }
    return ( <>
        <div className='user-details' onClick={onClose}>
            <div className='user-details__contents' onClick={(e) => {e.stopPropagation()}} >
                <div className='user-details__header'>
                    <BackButton onClose={onClose}/>
                    <h2> Profile: {user && user.displayName}</h2>
                    <img src={editIcon} alt={'Edit icon'}></img>
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