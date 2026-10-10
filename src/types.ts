export interface Task {
  id: string
  title: string
  /** If true, the task goes back into the bag after being drawn. */
  isPersistent: boolean
  /** Minimum time to spend on the task, in minutes. */
  timeMin?: number
  /** Maximum time to spend on the task, in minutes. */
  timeMax?: number
}

export type TaskDraft = Omit<Task, 'id'>

/** Returns an error message, or null if the draft is valid. */
export function validateTask(draft: TaskDraft): string | null {
  if (!draft.title.trim()) return 'Title is required.'
  for (const t of [draft.timeMin, draft.timeMax]) {
    if (t !== undefined && (!Number.isInteger(t) || t < 0)) {
      return 'Times must be whole, non-negative numbers of minutes.'
    }
  }
  if (draft.timeMin !== undefined && draft.timeMax !== undefined && draft.timeMin > draft.timeMax) {
    return 'Minimum time cannot exceed maximum time.'
  }
  return null
}

export interface TimeRange {
  min?: number
  max?: number
}

/**
 * True if the task's time range overlaps the query range. Missing bounds are
 * open-ended (min defaults to 0, max to infinity), so a task with no times
 * matches any query.
 */
export function overlapsRange(task: Pick<Task, 'timeMin' | 'timeMax'>, range: TimeRange): boolean {
  const taskLo = task.timeMin ?? 0
  const taskHi = task.timeMax ?? Infinity
  const queryLo = range.min ?? 0
  const queryHi = range.max ?? Infinity
  return taskLo <= queryHi && queryLo <= taskHi
}

export function formatTimeRange(task: Pick<Task, 'timeMin' | 'timeMax'>): string | null {
  const { timeMin, timeMax } = task
  if (timeMin !== undefined && timeMax !== undefined) {
    return timeMin === timeMax ? `${timeMin} min` : `${timeMin}–${timeMax} min`
  }
  if (timeMin !== undefined) return `≥ ${timeMin} min`
  if (timeMax !== undefined) return `≤ ${timeMax} min`
  return null
}
