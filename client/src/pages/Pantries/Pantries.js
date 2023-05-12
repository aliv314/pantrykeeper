import NewCard from '../../components/NewCard/NewCard';
import './Pantries.scss'

const Pantries = () => {
    return (
    <div className='pantries'>
        <div className='pantries__title'>
            <h2> Pantries </h2>
        </div>
        <div className='pantries__cards'>
            <NewCard title = {`Pantry`}/>
        </div>
    </div>
    )
}

export default Pantries;