import '@fontsource/press-start-2p'
import './modern.css'
import { useCallback, useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { TaskForm } from '../../components/TaskForm'
import { TaskList } from '../../components/TaskList'
import { formatTimeRange, type TaskDraft, type TimeRange } from '../../types'
import { useTasks } from '../../useTasks'
import { Coin } from './Coin'
import { PixelDialog } from './PixelDialog'
import { SPRITES } from './sprites'

type Dialog = 'add' | 'list' | 'task' | null
type Alert = { id: number; message: string; tone: 'error' | 'success' }

const ALERT_MS = 1800

const fromInput = (s: string) => (s.trim() === '' ? undefined : Number(s))

// Tiled sprites are used as CSS backgrounds, so hand their URLs to the stylesheet.
const spriteVars = {
  '--grass-img': `url("${SPRITES.grass.url}")`,
  '--dirt-img': `url("${SPRITES.dirt.url}")`,
} as CSSProperties

export function ModernApp() {
  const { tasks, addTask, updateTask, removeTask, drawRandom } = useTasks()
  const [dialog, setDialog] = useState<Dialog>(null)
  const [coin, setCoin] = useState<{ taskId: string; key: number } | null>(null)
  const [alert, setAlert] = useState<Alert | null>(null)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  // Look the task up live so edits show in the popup and deleting it removes the coin.
  const coinTask = coin ? tasks.find((t) => t.id === coin.taskId) ?? null : null

  useEffect(() => {
    if (!alert) return
    const timer = setTimeout(() => setAlert(null), ALERT_MS)
    return () => clearTimeout(timer)
  }, [alert])

  const showAlert = (message: string, tone: Alert['tone'] = 'error') =>
    setAlert({ id: Date.now(), message, tone })

  const closeDialog = useCallback(() => setDialog(null), [])

  function handleDraw(e: FormEvent) {
    e.preventDefault()
    if (coinTask) {
      showAlert('A coin is already out!')
      return
    }
    const range: TimeRange = { min: fromInput(min), max: fromInput(max) }
    if (range.min !== undefined && range.max !== undefined && range.min > range.max) {
      showAlert('Min time is over max!')
      return
    }
    const task = drawRandom(range)
    if (!task) {
      const filtered = range.min !== undefined || range.max !== undefined
      showAlert(tasks.length > 0 && filtered ? 'No task fits that time!' : 'The bag is empty!')
      return
    }
    setCoin({ taskId: task.id, key: Date.now() })
  }

  function handleAdd(draft: TaskDraft) {
    addTask(draft)
    setDialog(null)
    showAlert(`+1 task: ${draft.title}`, 'success')
  }

  function finishCoin(markDone: boolean) {
    if (markDone && coinTask) removeTask(coinTask.id)
    setCoin(null)
    setDialog(null)
  }

  const coinTime = coinTask ? formatTimeRange(coinTask) : null

  return (
    <div className="ui-modern" style={spriteVars}>
      <div className="sky" aria-hidden="true">
        <img className="cloud cloud-1" src={SPRITES.cloud.url} alt="" />
        <img className="cloud cloud-2" src={SPRITES.cloud.url} alt="" />
        <img className="cloud cloud-3" src={SPRITES.cloud.url} alt="" />
      </div>

      <main className="stage">
        <section className="panel">
          <h1 className="game-title">Bag of Tasks</h1>
          <p className="hud">
            <img src={SPRITES.coin.url} alt="" />
            <span>x {tasks.length}</span>
            <span className="sr-only"> tasks in the bag</span>
          </p>

          <button type="button" className="pixel-btn" onClick={() => setDialog('add')}>
            Add a task
          </button>

          <form className="draw-form" onSubmit={handleDraw}>
            <p className="hint">Time in minutes (optional)</p>
            <div className="time-inputs">
              <label>
                Min
                <input type="number" min={0} step={1} value={min} onChange={(e) => setMin(e.target.value)} />
              </label>
              <label>
                Max
                <input type="number" min={0} step={1} value={max} onChange={(e) => setMax(e.target.value)} />
              </label>
            </div>
            <button type="submit" className="pixel-btn">Give me a task</button>
          </form>

          <button type="button" className="pixel-btn" onClick={() => setDialog('list')}>
            Inspect all tasks
          </button>
        </section>

        <section className="bag-area" aria-label="The bag">
          <img
            key={`bag-${coin?.key ?? 0}`}
            className={coin ? 'bag shoot' : 'bag'}
            src={SPRITES.bag.url}
            alt="A bag full of tasks"
            draggable={false}
          />
          {coin && coinTask && <Coin key={`coin-${coin.key}`} onClick={() => setDialog('task')} />}
        </section>
      </main>

      <div className="ground" aria-hidden="true">
        <div className="grass" />
        <div className="dirt" />
      </div>

      {alert && (
        <div key={alert.id} className={`pixel-alert pixel-alert-${alert.tone}`} role="alert">
          {alert.message}
        </div>
      )}

      {dialog === 'add' && (
        <PixelDialog title="Add a task" onClose={closeDialog}>
          <TaskForm submitLabel="Add to bag" onSubmit={handleAdd} onCancel={closeDialog} />
        </PixelDialog>
      )}

      {dialog === 'list' && (
        <PixelDialog title="Inspect tasks" onClose={closeDialog}>
          <TaskList tasks={tasks} onUpdate={updateTask} onRemove={removeTask} />
        </PixelDialog>
      )}

      {dialog === 'task' && coinTask && (
        <PixelDialog title="Your task" onClose={closeDialog}>
          <div className="task-reveal">
            <img className="task-reveal-coin" src={SPRITES.coin.url} alt="" />
            <p className="task-reveal-title">{coinTask.title}</p>
            <div className="meta">
              {coinTime && <span className="badge">{coinTime}</span>}
              {coinTask.isPersistent && <span className="badge">persistent</span>}
            </div>
            {coinTask.isPersistent ? (
              <>
                <p className="hint">This task stays in the bag.</p>
                <div className="actions">
                  <button type="button" className="primary" onClick={() => finishCoin(false)}>OK</button>
                </div>
              </>
            ) : (
              <div className="actions">
                <button type="button" className="primary" onClick={() => finishCoin(true)}>Done</button>
                <button type="button" onClick={() => finishCoin(false)}>Put back</button>
              </div>
            )}
          </div>
        </PixelDialog>
      )}
    </div>
  )
}
