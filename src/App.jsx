import './App.css'
import './index.css'
import { useMemo, useState } from 'react'
import SearchInput from './components/search.jsx'
import Table from './components/Table.jsx'
import AddNewTask from './components/AddNewTask.jsx'
import Dialog from './components/Dialog.jsx'

const initialTasks = [
  { id: 1, name: 'Review project proposal', date: '2026-10-21', isCompleted: false },
  { id: 2, name: 'Prepare weekly report', date: '2026-10-22', isCompleted: false },
  { id: 3, name: 'Update design system', date: '2026-10-18', isCompleted: true },
  { id: 4, name: 'Send meeting notes', date: '2026-10-20', isCompleted: false },
]

function App() {
  const [data, setData] = useState(initialTasks)
  const [query, setQuery] = useState('')
  const [open, setIsOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState(null)
  const today = new Date().toISOString().slice(0, 10)
  const filteredData = useMemo(() => data.filter(item => item.name.toLowerCase().includes(query.toLowerCase())), [data, query])
  const completedCount = data.filter(item => item.isCompleted).length
  const pendingCount = data.length - completedCount
  const overdueCount = data.filter(item => !item.isCompleted && item.date < today).length

  function addNewTask(taskName, date) {
    if (!taskName.trim() || !date) return
    setData(prev => [...prev, { id: Date.now(), name: taskName.trim(), date, isCompleted: false }])
  }
  function deleteTask(id) { setData(prev => prev.filter(item => item.id !== id)) }
  function editTask(item) { setSelectedItems(item); setIsOpen(true) }
  function saveEditedData(name) {
    if (name.trim()) setData(prev => prev.map(item => item.id === selectedItems.id ? { ...item, name: name.trim() } : item))
    setIsOpen(false)
  }
  function completeTask(id) {
    setData(prev => prev.map(item => item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">✓</span><span>Daymark</span></div>
      <div className="side-label">WORKSPACE</div>
      <div className="nav-item active"><span>▦</span> My tasks <span className="nav-count">{data.length}</span></div>
      <div className="side-note"><span className="note-icon">✦</span><div><strong>Make today count.</strong><p>Small steps add up to big things.</p></div></div>
      <div className="sidebar-bottom"><span className="avatar">S</span><div><strong>Your workspace</strong><p>Personal plan</p></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><span className="breadcrumb">Workspace <span>/</span> My tasks</span><span className="today-label">✦ &nbsp; A little progress every day</span></header>
      <section className="page-content">
        <div className="page-heading"><div><div className="eyebrow">YOUR PRODUCTIVITY SPACE</div><h1>My tasks<span className="title-dot">.</span></h1><p className="subtitle">Keep your day clear and your priorities closer.</p></div><div className="date-chip"><span>◷</span><div><small>TODAY</small><strong>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></div></div></div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Total tasks</span><span className="stat-icon violet">▦</span></div><strong>{data.length.toString().padStart(2, '0')}</strong><small>Across your list</small></div>
          <div className="stat-card"><div className="stat-top"><span>Completed</span><span className="stat-icon green">✓</span></div><strong>{completedCount.toString().padStart(2, '0')}</strong><small>Nicely done</small></div>
          <div className="stat-card"><div className="stat-top"><span>In progress</span><span className="stat-icon amber">◷</span></div><strong>{pendingCount.toString().padStart(2, '0')}</strong><small>One step at a time</small></div>
          <div className="stat-card"><div className="stat-top"><span>Overdue</span><span className="stat-icon rose">!</span></div><strong>{overdueCount.toString().padStart(2, '0')}</strong><small>Ready for a refresh</small></div>
        </div>
        <section className="tasks-panel">
          <div className="panel-heading"><div><h2>Task overview</h2><p>Everything you want to get done.</p></div><span className="task-total">{filteredData.length} tasks</span></div>
          <AddNewTask onAddTask={addNewTask}/>
          <div className="toolbar"><div className="search-wrap"><span>⌕</span><SearchInput onSearch={setQuery}/></div><span className="list-label">ALL TASKS <span>•</span></span></div>
          <Table tableData={filteredData} onDelete={deleteTask} onEdit={editTask} onCompleted={completeTask}/>
        </section>
        <footer className="page-footer"><span>© 2026 Daymark</span><span>Made for a more focused you <span className="footer-heart">♥</span></span></footer>
      </section>
    </main>
    <Dialog isOpen={open} onClose={() => setIsOpen(false)} editData={selectedItems} onSave={saveEditedData}/>
  </div>
}
export default App
