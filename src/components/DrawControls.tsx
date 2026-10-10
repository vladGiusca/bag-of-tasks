import { useState, type FormEvent } from 'react'
import type { TimeRange } from '../types'

interface Props {
  onDraw: (range: TimeRange) => void
}

const fromInput = (s: string) => (s.trim() === '' ? undefined : Number(s))

export function DrawControls({ onDraw }: Props) {
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const range: TimeRange = { min: fromInput(min), max: fromInput(max) }
    if (range.min !== undefined && range.max !== undefined && range.min > range.max) {
      setError('Minimum time cannot exceed maximum time.')
      return
    }
    setError(null)
    onDraw(range)
  }

  return (
    <form className="card draw-controls" onSubmit={handleSubmit}>
      <p className="muted">How much time do you have? (optional, in minutes)</p>
      <div className="time-row">
        <label>
          Min
          <input type="number" min={0} step={1} value={min} onChange={(e) => setMin(e.target.value)} />
        </label>
        <label>
          Max
          <input type="number" min={0} step={1} value={max} onChange={(e) => setMax(e.target.value)} />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="primary">Give me a task</button>
    </form>
  )
}
