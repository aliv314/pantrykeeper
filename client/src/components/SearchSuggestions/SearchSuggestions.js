import './SearchSuggestions.scss';
import { uuidv4 } from '@firebase/util';
const SearchSuggestions = (props) => {
    const {suggestions, onClickSuggestion} = props;
    
    return (<>
        {suggestions && suggestions.map(suggestion => {
            return (<div key={uuidv4()} onClick={() => onClickSuggestion(suggestion)}> {suggestion} </div>)
        })}
    </>)
}

export default SearchSuggestions;