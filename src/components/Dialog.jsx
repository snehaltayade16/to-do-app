import { useEffect, useRef } from 'react'
function Dialog({ isOpen, onClose, editData, onSave }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && editData) {
      if (!dialog.open) dialog.showModal()
      if (inputRef.current) inputRef.current.value = editData.name
    } else if (dialog.open) dialog.close()
  }, [isOpen, editData])
  function submit(event) {
    event.preventDefault()
    onSave(inputRef.current.value)
  }
  return <dialog ref={dialogRef} onCancel={onClose}>
    <form onSubmit={submit}>
      <h3>Edit task</h3>
      <input aria-label="Edit task name" type="text" placeholder="Task name" ref={inputRef} required />
      <div className="dialog-actions"><button type="button" className="secondary-btn" onClick={onClose}>Cancel</button><button type="submit" className="primary-btn">Save changes</button></div>
    </form>
  </dialog>
}
export default Dialog
