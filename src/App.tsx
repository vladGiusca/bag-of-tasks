import { useCallback, useEffect, useState } from 'react'
import { AddTaskModal } from './components/AddTaskModal'
import { DrawnTask } from './components/DrawnTask'
import { TaskList } from './components/TaskList'
import type { Task, TaskDraft } from './types'
import { useTasks } from './useTasks'

type View = { kind: 'home' } | { kind: 'drawn'; task: Task | null } | { kind: 'list' }

const TOAST_MS = 3000

export default function App() {
  const { tasks, addTask, updateTask, removeTask, drawRandom } = useTasks()
  const [view, setView] = useState<View>({ kind: 'home' })
  const [addOpen, setAddOpen] = useState(false)
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const goHome = () => setView({ kind: 'home' })
  const closeAdd = useCallback(() => setAddOpen(false), [])

  function handleAdd(draft: TaskDraft) {
    addTask(draft)
    setAddOpen(false)
    // A fresh id restarts the dismiss timer even if the message is identical.
    setToast({ id: Date.now(), message: `Added "${draft.title}" to the bag.` })
  }

  return (
    <main className="app">
      <h1>Bag of Tasks</h1>
      <p className="muted">{tasks.length} task{tasks.length === 1 ? '' : 's'} in the bag</p>

      <nav className="main-actions">
        <button onClick={() => setAddOpen(true)}>Add a task</button>
        <button className="primary" onClick={() => setView({ kind: 'drawn', task: drawRandom() })}>
          Give me a task
        </button>
        <button onClick={() => setView({ kind: 'list' })}>Inspect all tasks</button>
      </nav>

      {view.kind === 'drawn' && (
        <DrawnTask
          task={view.task}
          onDone={(id) => {
            removeTask(id)
            goHome()
          }}
          onDismiss={goHome}
        />
      )}
      {view.kind === 'list' && (
        <TaskList tasks={tasks} onUpdate={updateTask} onRemove={removeTask} />
      )}

      {addOpen && <AddTaskModal onAdd={handleAdd} onClose={closeAdd} />}

      {toast && (
        <div key={toast.id} className="toast" role="status">
          {toast.message}
        </div>
      )}
    </main>
  )
}
