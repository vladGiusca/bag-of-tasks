import { useCallback, useEffect, useState } from 'react'
import './classic.css'
import { AddTaskModal } from './components/AddTaskModal'
import { DrawControls } from './components/DrawControls'
import { DrawnTask } from './components/DrawnTask'
import { TaskList } from '../../components/TaskList'
import type { Task, TaskDraft, TimeRange } from '../../types'
import { useTasks } from '../../useTasks'

type View =
  | { kind: 'home' }
  | { kind: 'drawn'; task: Task | null; filtered: boolean }
  | { kind: 'list' }

const TOAST_MS = 3000

export function ClassicApp() {
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

  function handleDraw(range: TimeRange) {
    const filtered = range.min !== undefined || range.max !== undefined
    setView({ kind: 'drawn', task: drawRandom(range), filtered })
  }

  function handleAdd(draft: TaskDraft) {
    addTask(draft)
    setAddOpen(false)
    // A fresh id restarts the dismiss timer even if the message is identical.
    setToast({ id: Date.now(), message: `Added "${draft.title}" to the bag.` })
  }

  return (
    <div className="ui-classic">
      <main className="app">
        <h1>Bag of Tasks</h1>
        <p className="muted">{tasks.length} task{tasks.length === 1 ? '' : 's'} in the bag</p>

        <nav className="main-actions">
          <button onClick={() => setAddOpen(true)}>Add a task</button>
          <button onClick={() => setView({ kind: 'list' })}>Inspect all tasks</button>
        </nav>

        <DrawControls onDraw={handleDraw} />

        {view.kind === 'drawn' && (
          <DrawnTask
            task={view.task}
            emptyMessage={
              tasks.length > 0 && view.filtered
                ? 'No task fits that time range. Try widening it.'
                : 'The bag is empty. Add some tasks first!'
            }
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
    </div>
  )
}
