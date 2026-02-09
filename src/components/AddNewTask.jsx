import { useRef } from "react"

function AddNewTask({onAddTask}){
    const inputValue = useRef(null)
    const dateValue = useRef(null)
        return(
        <>
            <input type="text" placeholder="Add New Task" className="mr-1.5 p-1 rounded-md"  ref={inputValue} ></input>
            <input type="date" ref={dateValue} className="mr-1.5 p-1 rounded-md"></input>
            <button type="submit" className="bg" onClick={() => onAddTask(inputValue.current.value, dateValue.current.value)}>Add Task</button>
        </>
    )
}
export default AddNewTask