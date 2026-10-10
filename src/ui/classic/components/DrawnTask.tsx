import { formatTimeRange, type Task } from '../../../types'

interface Props {
  task: Task | null
  emptyMessage: string
  onDone: (id: string) => void
  onDismiss: () => void
}

export function DrawnTask({ task, emptyMessage, onDone, onDismiss }: Props) {
  if (!task) {
    return (
      <section className="card">
        <p>{emptyMessage}</p>
        <div className="actions">
          <button onClick={onDismiss}>OK</button>
        </div>
      </section>
    )
  }

  const time = formatTimeRange(task)

  return (
    <section className="card">
      <h2>{task.title}</h2>
      <div className="meta">
        {time && <span className="badge">{time}</span>}
        {task.isPersistent && <span className="badge">persistent</span>}
      </div>
      {task.isPersistent ? (
        <>
          <p className="muted">This task stays in the bag.</p>
          <div className="actions">
            <button className="primary" onClick={onDismiss}>OK</button>
          </div>
        </>
      ) : (
        <div className="actions">
          <button className="primary" onClick={() => onDone(task.id)}>Done</button>
          <button onClick={onDismiss}>Put back</button>
        </div>
      )}
    </section>
  )
}
