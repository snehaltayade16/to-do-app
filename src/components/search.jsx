function SearchItems({ onSearch }) {
  return <input aria-label="Search tasks" placeholder="Search your tasks..." onChange={event => onSearch(event.target.value)} />
}
export default SearchItems
