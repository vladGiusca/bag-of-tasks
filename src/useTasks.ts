import { useCallback, useEffect, useState } from 'react'
import { loadTasks, saveTasks } from './storage'
import { overlapsRange, type Task, type TaskDraft, type TimeRange } from './types'

// crypto.randomUUID only exists in secure contexts (https or localhost), so it is
// missing when the app is opened over plain http on a LAN address.
function newId(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((draft: TaskDraft) => {
    const task = { ...draft, id: newId() }
    setTasks((prev) => [...prev, task])
  }, [])

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...draft, id } : t)))
  }, [])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  /**
   * Picks a random task (without removing it) whose time range overlaps `range`;
   * returns null if no task qualifies.
   */
  const drawRandom = useCallback(
    (range: TimeRange = {}): Task | null => {
      const candidates = tasks.filter((t) => overlapsRange(t, range))
      if (candidates.length === 0) return null
      return candidates[Math.floor(Math.random() * candidates.length)]
    },
    [tasks],
  )

  return { tasks, addTask, updateTask, removeTask, drawRandom }
}
