import { useRef } from "react"
function AddNewTask({ onAddTask }) {
  const inputValue = useRef(null)
  const dateValue = useRef(null)
  function submit(event) {
    event.preventDefault()
    if (!inputValue.current.value.trim() || !dateValue.current.value) return
    onAddTask(inputValue.current.value, dateValue.current.value)
    inputValue.current.value = ''
    dateValue.current.value = ''
  }
  return <form className="add-task-form" onSubmit={submit}>
    <input aria-label="Task name" type="text" placeholder="What needs to get done?" ref={inputValue} required />
    <input aria-label="Due date" type="date" ref={dateValue} required />
    <button className="primary-btn" type="submit">＋ Add task</button>
  </form>
}
export default AddNewTask
