import { UI_KINDS, UI_LABELS, type UiKind } from './uiPreference'

interface Props {
  value: UiKind
  onChange: (kind: UiKind) => void
}

export function UiSwitch({ value, onChange }: Props) {
  return (
    <div className="ui-switch" role="group" aria-label="Interface style">
      {UI_KINDS.map((kind) => (
        <button
          key={kind}
          type="button"
          aria-pressed={kind === value}
          onClick={() => onChange(kind)}
        >
          {UI_LABELS[kind]}
        </button>
      ))}
    </div>
  )
}
