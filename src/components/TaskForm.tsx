import { useState, type FormEvent } from 'react'
import { validateTask, type TaskDraft } from '../types'

interface Props {
  initial?: TaskDraft
  submitLabel?: string
  onSubmit: (draft: TaskDraft) => void
  onCancel: () => void
}

const toInput = (n: number | undefined) => (n === undefined ? '' : String(n))
const fromInput = (s: string) => (s.trim() === '' ? undefined : Number(s))

export function TaskForm({ initial, submitLabel = 'Save', onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [isPersistent, setIsPersistent] = useState(initial?.isPersistent ?? false)
  const [timeMin, setTimeMin] = useState(toInput(initial?.timeMin))
  const [timeMax, setTimeMax] = useState(toInput(initial?.timeMax))
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const draft: TaskDraft = {
      title: title.trim(),
      isPersistent,
      timeMin: fromInput(timeMin),
      timeMax: fromInput(timeMax),
    }
    const err = validateTask(draft)
    if (err) {
      setError(err)
      return
    }
    onSubmit(draft)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isPersistent}
          onChange={(e) => setIsPersistent(e.target.checked)}
        />
        Persistent (goes back into the bag after drawing)
      </label>
      <div className="time-row">
        <label>
          Min time (min)
          <input type="number" min={0} step={1} value={timeMin} onChange={(e) => setTimeMin(e.target.value)} />
        </label>
        <label>
          Max time (min)
          <input type="number" min={0} step={1} value={timeMax} onChange={(e) => setTimeMax(e.target.value)} />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="actions">
        <button type="submit" className="primary">{submitLabel}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
