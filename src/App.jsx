
import './App.css'
import './index.css'
import { useState } from 'react'
import SearchInput from './components/search.jsx'
import Table from './components/Table.jsx'
import AddNewTask from './components/AddNewTask.jsx'
import Dialog from './components/Dialog.jsx'

function App() {

    const OriginalData = [
      {id:1,name:"apple", date:"2024-01-01", isCompleted:false, },   
      {id:2,name:"banana", date:"2024-01-02", isCompleted:false, },
      {id:3,name:"grapes", date:"2024-01-03", isCompleted:false, },
      {id:4,name:"mango", date:"2024-01-04", isCompleted:false, },
      {id:5,name:"orange", date:"2024-01-05", isCompleted:false, },
      {id:6,name:"peach", date:"2024-01-06", isCompleted:false, },
      {id:7,name:"pear", date:"2024-01-07", isCompleted:false, },
      {id:8,name:"pineapple", date:"2024-01-08", isCompleted:false, },
      {id:9,name:"strawberry", date:"2024-01-09", isCompleted:false, },
      {id:10,name:"watermelon", date:"2024-01-10", isCompleted:false, },
      {id:10,name:"peru", date:"2024-01-10", isCompleted:false, },   
     ]

    const [data, setData] = useState(OriginalData)
    const [open, setIsOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState(null)

    function getDateDiff (date){
        const diff = new Date() - new Date(date)
        return  Math.floor(diff / (1000 * 60 * 60 * 24))
    }

  // Search
  function searchForQuery(query){
    let searchTerm =  query.trim()
    if(searchTerm.length > 3){
      console.log('searching for',searchTerm)
      const filtered =  OriginalData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setData(filtered)
    }else{
      alert('Please Enter at least 3 characters')
      setData(OriginalData)
    }
  }

  // Add New Task
  function addNewTask(taskName, date){
    console.log('add new Task')
    console.log(taskName)
    setData(prev => [...prev, {id:prev.length + 1, name:taskName, date:date, isCompleted:false, due:getDateDiff(date)}])
    
  }

  // Delete Item
  function handelDeleteItem(id){
    setData(prev => prev.filter(item => item.id !== id))
  }

  // Edit Item
  function handelEditItems(items){
    setIsOpen(true)
    setSelectedItems(items)
    console.log('open value', open)
  }

  //  Save Edited Data
  function saveEditedData(Edata){
    setData(prev => prev.map((item) => item.id === selectedItems.id ? {...item, name: Edata} : item))
    setIsOpen(false)
  }

  function handelCompleteTask(completedId){
    console.log('complete task', completedId)
    setData(prev => prev.map((item) => item.id == completedId ? {...item, isCompleted:true} : item))
  }
  return (
    <>
    <section className='h-full'>
      <header className='flex align-items-start h-14 border p-1.5'>
        <AddNewTask onAddTask={addNewTask}/>
      </header>
      <main className='border h-full'>
            <header className='flex align-items-center justify-center h-14 border-b p-1.5'>
                <SearchInput onSearch={searchForQuery}/>
            </header>
            <main className='flex flex-col bg-grey-100'>
                <Table tableData={data} onDelete={handelDeleteItem} onEdit={handelEditItems} onCompleted={handelCompleteTask}/>
            </main>
      </main>
      <footer>

      </footer>
    </section>
     
     
      {/* {
        data.map(items => ( 
          <p key={items.id}>{items.name}</p>
        ))
      } */}
     
      <Dialog isOpen={open} onClose={() => setIsOpen(false)} editData={selectedItems} onSave={saveEditedData}/>
    </>
  )
}

export default App
