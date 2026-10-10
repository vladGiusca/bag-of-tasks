import { useEffect } from 'react'
import type { TaskDraft } from '../types'
import { TaskForm } from './TaskForm'

interface Props {
  onAdd: (draft: TaskDraft) => void
  onClose: () => void
}

export function AddTaskModal({ onAdd, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-task-title">Add a task</h2>
        <TaskForm submitLabel="Add to bag" onSubmit={onAdd} onCancel={onClose} />
      </div>
    </div>
  )
}
