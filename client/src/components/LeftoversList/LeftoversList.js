import './LeftoversList.scss'
import NewItemCard from '../Cards/NewCard/NewCard'
const LeftoversList = (props) => {
    const {leftovers} = props;
    return (
        <section className='leftovers'>
            <h3> Leftovers </h3>
            <ul>
                <li>
                    <NewItemCard title={'Leftover'}></NewItemCard>
                </li>
            </ul>
        </section>
    )
}

export default LeftoversList;