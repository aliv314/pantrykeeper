import './SectionButton.scss'

const SectionButton = (props) => {
    const {icon, text} = props; 
    return (<>
        <img className='section-button__icon'src={icon} alt={"Button icon for ingredients"}></img>
        <p className='section-button__label'>{text}</p>
        </>)
}

export default SectionButton;