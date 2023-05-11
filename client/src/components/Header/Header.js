import './Header.scss'
import menu from '../../assets/images/icons/menu.svg'

const Header = () => {
    return (
    <>
        <div className='header'>
            <img className='header__icon' src={menu} alt='Menu icon header.'/>
            <h3 className='header__title'> PantryKeeper </h3>
        </div>
    </>
    )
}

export default Header;