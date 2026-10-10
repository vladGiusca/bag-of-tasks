export const UI_KINDS = ['classic', 'modern'] as const
export type UiKind = (typeof UI_KINDS)[number]

export const UI_LABELS: Record<UiKind, string> = {
  classic: 'Classic',
  modern: 'Modern',
}

const STORAGE_KEY = 'bag-of-tasks:ui'

export function loadUiKind(): UiKind {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return UI_KINDS.find((k) => k === value) ?? 'classic'
  } catch {
    return 'classic'
  }
}

export function saveUiKind(kind: UiKind): void {
  try {
    localStorage.setItem(STORAGE_KEY, kind)
  } catch {
    // Storage unavailable; the choice just won't survive a reload.
  }
}
