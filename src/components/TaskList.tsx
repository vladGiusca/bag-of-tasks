import { useState } from 'react'
import { formatTimeRange, type Task, type TaskDraft } from '../types'
import { TaskForm } from './TaskForm'

interface Props {
  tasks: Task[]
  onUpdate: (id: string, draft: TaskDraft) => void
  onRemove: (id: string) => void
}

export function TaskList({ tasks, onUpdate, onRemove }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null)

  if (tasks.length === 0) {
    return <section className="card"><p>The bag is empty.</p></section>
  }

  return (
    <section className="card">
      <h2>All tasks ({tasks.length})</h2>
      <ul className="task-list">
        {tasks.map((task) =>
          task.id === editingId ? (
            <li key={task.id}>
              <TaskForm
                initial={task}
                onSubmit={(draft) => {
                  onUpdate(task.id, draft)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
              />
            </li>
          ) : (
            <li key={task.id} className="task-row">
              <div>
                <div className="task-title">{task.title}</div>
                <div className="meta">
                  {formatTimeRange(task) && <span className="badge">{formatTimeRange(task)}</span>}
                  {task.isPersistent && <span className="badge">persistent</span>}
                </div>
              </div>
              <div className="actions">
                <button onClick={() => setEditingId(task.id)}>Edit</button>
                <button
                  className="danger"
                  onClick={() => {
                    if (confirm(`Delete "${task.title}"?`)) onRemove(task.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
