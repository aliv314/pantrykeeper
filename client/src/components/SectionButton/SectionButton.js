import './SectionButton.scss'

const SectionButton = (props) => {
    const {active, icon, text, onClickHandler} = props; 
    return (<>
        <div className={`section-button ${active ?  "section-button--active": ""}`} onClick={onClickHandler}>
            <img className={`section-button__icon `} src={icon} alt={"Button icon for foods"}></img>
            <p className='section-button__label'>{text}</p>
        </div>
    </>)
}

export default SectionButton;