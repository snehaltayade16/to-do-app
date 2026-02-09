
import {useRef} from 'react'
function SearchItems(props) {
    const timer = useRef(null)
    function searchItems(event){
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            props.onSearch(event.target.value)
        },1000)
    }
    return(
        <input placeholder="Search Task..." className="p-1 rounded-md" onChange={searchItems}></input>
    )
    }

export default SearchItems;