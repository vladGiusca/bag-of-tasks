import { useCallback, useEffect, useState } from 'react'
import { loadTasks, saveTasks } from './storage'
import type { Task, TaskDraft } from './types'

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

  /** Picks a random task without removing it; returns null if the bag is empty. */
  const drawRandom = useCallback((): Task | null => {
    if (tasks.length === 0) return null
    return tasks[Math.floor(Math.random() * tasks.length)]
  }, [tasks])

  return { tasks, addTask, updateTask, removeTask, drawRandom }
}
