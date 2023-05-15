import './SectionButton.scss'

const SectionButton = (props) => {
    const {icon, text} = props; 
    return (<>
        <div className='section-button'>
            <img className='section-button__icon'src={icon} alt={"Button icon for foods"}></img>
            <p className='section-button__label'>{text}</p>
        </div>
    </>)
}

export default SectionButton;