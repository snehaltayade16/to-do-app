function Table({ tableData, onDelete, onEdit, onCompleted }) {
  const today = new Date().toISOString().slice(0, 10)
  const formatDate = date => date ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
  const overdue = date => date < today ? Math.floor((new Date(today) - new Date(date)) / 86400000) : 0
  return tableData.length ? <div className="table-scroll"><table className="task-table">
    <thead><tr><th>#</th><th>TASK NAME</th><th>DUE DATE</th><th>STATUS</th><th>OVERDUE</th><th>ACTIONS</th></tr></thead>
    <tbody>{tableData.map((item, index) => {
      const late = !item.isCompleted && overdue(item.date) > 0
      return <tr key={item.id}>
        <td>{String(index + 1).padStart(2, '0')}</td>
        <td className={`task-name ${item.isCompleted ? 'completed-name' : ''}`}>{item.name}</td>
        <td>{formatDate(item.date)}</td>
        <td><span className={`status-pill ${item.isCompleted ? 'done' : 'pending'}`}>{item.isCompleted ? '✓ Completed' : '◷ Pending'}</span></td>
        <td className={late ? 'due-over' : 'due-ok'}>{item.isCompleted ? '—' : late ? `${overdue(item.date)}d late` : 'On track'}</td>
        <td><div className="action-buttons">
          <button className="action-btn" onClick={() => onEdit(item)}>Edit</button>
          <button className="action-btn" onClick={() => onCompleted(item.id)}>{item.isCompleted ? 'Reopen' : 'Done'}</button>
          <button className="action-btn delete" onClick={() => onDelete(item.id)}>Delete</button>
        </div></td>
      </tr>
    })}</tbody>
  </table></div> : <div className="empty-state"><strong>No tasks found</strong>Try another search or add a task to get started.</div>
}
export default Table
