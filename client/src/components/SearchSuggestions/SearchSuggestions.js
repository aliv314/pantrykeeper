import './SearchSuggestions.scss';
import { uuidv4 } from '@firebase/util';
const SearchSuggestions = (props) => {
    const {suggestions, onClickSuggestion} = props;
    
    return (<>
        <div className='suggestions'>
            <select>
                {suggestions && suggestions.map(suggestion => {
                    return (<option className='suggestions__item' key={uuidv4()} onClick={() => onClickSuggestion(suggestion)}> {suggestion} </option>)
                })}
            </select>
        </div>
    </>)
}

export default SearchSuggestions;