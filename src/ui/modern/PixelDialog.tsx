import { useEffect, type ReactNode } from 'react'

interface Props {
  title: string
  onClose: () => void
  children: ReactNode
}

export function PixelDialog({ title, onClose, children }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="pixel-backdrop" onClick={onClose}>
      <div
        className="pixel-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="pixel-dialog-bar">
          <h2>{title}</h2>
          <button type="button" className="pixel-close" aria-label="Close" onClick={onClose}>
            X
          </button>
        </header>
        <div className="pixel-dialog-body">{children}</div>
      </div>
    </div>
  )
}
