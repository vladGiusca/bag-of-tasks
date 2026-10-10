import type { Task } from './types'

const STORAGE_KEY = 'bag-of-tasks:v1'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const t = value as Record<string, unknown>
  const optionalNumber = (v: unknown) => v === undefined || typeof v === 'number'
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    typeof t.isPersistent === 'boolean' &&
    optionalNumber(t.timeMin) &&
    optionalNumber(t.timeMax)
  )
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Storage may be unavailable (private mode, quota); keep working in memory.
  }
}
