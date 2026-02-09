import {useEffect, useRef} from 'react'
function Dialog({isOpen, onClose, editData, onSave}){
    console.log(isOpen, editData)
    const dialogFunction = useRef(null)
    const editInputData = useRef(null)
    useEffect(() => {
        if(isOpen){ 
            dialogFunction.current.showModal()
            editInputData.current.value = editData.name
        }
        else{
            dialogFunction.current.close()
            editInputData.current.value = ''
        }
    },[isOpen, editData])
    return(
        <dialog ref={dialogFunction}>
            <h3>Edit Task</h3>
            <input type="text" placeholder="Edit Task Name" ref={editInputData}></input>
            <button onClick={() => {onSave(editInputData.current.value)}}>Save</button>
            <button onClick={onClose}>Close</button>
        </dialog>
    )
}
export default Dialog