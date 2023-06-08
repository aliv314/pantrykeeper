import './UserDetails.scss'

import editIcon from '../../../../assets/images/icons/edit.svg'
import userIcon from '../../../../assets/images/icons/face.svg'
import BackButton from '../../../BackButton/BackButton';

const UserDetails = (props) =>{
    const {show, user, onClose} = props

    if(!show){
        return null;
    }
    const handleSwitchModal = () =>{

    }

    return ( <>
        <div className='user-details' onClick={onClose}>
            <div className='user-details__contents' onClick={(e) => {e.stopPropagation()}} >
                <div className='user-details__header'>
                    <BackButton onClose={onClose}/>
                    <h2 className='user-details__title'> {user.displayName}</h2>
                    {/* <img onClick ={handleSwitchModal}className='user-details__icon' src={editIcon} alt={'Edit icon'}/> */}
                </div>

                <img src={userIcon} className='user-details__img' alt='user icon pfp'></img>
                <div className='user-details__detail'>
                    <p className='user-details__label'> User: </p>
                    <p className='user-details__info'> {user.displayName}</p>
                </div>
                <div className='user-details__detail'>
                    <p className='user-details__label'> FC: </p>
                    <p className='user-details__info'> Example FC </p>
                </div>
            </div>
        </div>
    </>)
}

export default UserDetails;