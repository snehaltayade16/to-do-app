import Dialog from "./Dialog"
function Table({tableData, onDelete, onEdit, onCompleted}) {
    console.log(tableData,onDelete)
    
    return(
        <>
            {
                tableData.length > 0 ?  (<table className="" border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Overdue</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((item, index) => (
                            <tr className="hover:bg-zinc-900">
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td className={item.isCompleted ? "text-green-400" : "text-red-400"}>{item.isCompleted ? 'Completed': 'Pending'}</td>
                                <td className={item.due > 1 ? "text-red-400" : "text-green-400"}>{item.due}</td>
                                <td>
                                    <button onClick={() => onDelete(item.id)}>Delete</button>
                                    <button className="ml-1.5" onClick={() => onEdit(item)}>Edit</button>
                                    <button className="ml-1.5" onClick={() => onCompleted(item.id)}>Completed</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> ) : (<p>No Data Found</p>)
            }
        </>
    )
}
export default Table